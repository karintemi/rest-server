const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/generar-jwt');
const {googleVerify} = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const {correo, password} = req.body;

    try {
      usuario = await Usuario.findOne({correo});
      // Verificar existencia del correo
      if(!usuario)
        return res.status(400).json({
          msg:'Usuario/Contraseña incorrectos'
        })
      // Verificar si usuario está activo
      if(!usuario.estado )
        return res.status(400).json({
          msg:'El Usuario está desactivado'
        })

      // Validar contraseña
      const validPassword = bcryptjs.compareSync(password, usuario.password)
      if (!validPassword) {
        return res.status(400).json({
          msg:'Usuario/Contraseña incorrectos'
        })

      }
      // Generar JWT
      const token = await generarJWT(usuario.id);

      res.json({
        usuario,
        token
      })
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        msg: 'Hable con el administrador'
      });
    }
}

const googleSignin = async (req, res=response) =>{

  const {id_token} = req.body;
  try {
    const {correo, nombre, img} = await googleVerify(id_token);
    let usuario = Usuario.findOne({correo});
    if (!usuario) {
      // Tengo que creearlo
      const data = {
        nombre, correo,
        password: ':P',
        img,
        google: true
      }
      usuario = new Usuario(data);
      await usuario.save();
    }

    // Si el usuario esta en la BD
    if (!usuario.estado) {
      return res.status(401).json({msg: 'Hable con el Administrador, usuario bloqueado'});
    }
    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    })

  } catch (e) {
    res.status(400).json({
      msg:'Token de Google no es válido'
    })
  }
}

module.exports = {login, googleSignin
};
