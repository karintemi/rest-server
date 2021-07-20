const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async(req, res = response) => {
  const {limite = 5, desde = 0} = req.query;

// realizo las consultas en forma paralela de cantidad de usuarios y usuarios
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({estado: true}),
    Usuario.find({estado: true})
     .skip(Number(desde))
     .limit(Number(limite))
   ])
  res.json({
    total, usuarios
  })
};
const usuariosPut = async(req, res = response) => {
  const id = req.params.id;
  const {_id, paswword, google, correo, ...resto} = req.body

  if (password) {
    resto.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto)

  res.json(usuario)
};
const usuariosPost = async (req, res = response) => {
  const {nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({nombre, correo, password, rol});

  // Encriptar contraseña
  usuario.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());
  // Guardar en BD
  await usuario.save();
  res.status(201).json({
    msg: 'post API - controlador',
    usuario
  })
};
const usuariosDelete = async (req, res = response) => {
  const {id} = req.params
  // Borrado físico (no recomendado por Int Ref)
  // const usuario = await Usuario.findByIdAndDelete(id)

  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
  res.json(usuario)
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - controlador'
  })
};

module.exports = {
usuariosGet,
usuariosPut,
usuariosPost,
usuariosDelete,
usuariosPatch
};
