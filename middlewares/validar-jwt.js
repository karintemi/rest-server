const {response, request} = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

  const token = req.header('x-token');
  if (!token) {
    return res.sendStatus(401).json({
      msg: 'No hay token en la petición'
    });
  }

  try {

    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return res.send(401).json({
        msg: 'Token inválido - Usuario no existente'
      });
    }

    // Verificar que el estado del ussuario sea true
    if (!usuario.estado) {
      return res.send(401).json({
        msg: 'Token inválido - Usuario con estado no válido'
      });

    }
    req.usuario = usuario;
    next();
  } catch (e) {
    console.log(e);
    res.send(401).json({
      msg: 'Token no válido'
    })
  }

  console.log(token);

  next();
}


module.exports = {validarJWT};
