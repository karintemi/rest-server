const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/generar-jwt');
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
      if(!usuario.activo)
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

module.exports = {login};
