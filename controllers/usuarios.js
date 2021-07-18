const {response} = require('express');

const usuariosGet = (req, res = response) => {
  const {id, edad='Indefnida', direccion='Sin dirección'} = req.query;
  res.json({
    msg: 'get API - controlador',
    id,
    edad,
    direccion
  })
};
const usuariosPut = (req, res = response) => {
  const id = req.params.id
  res.json({
    msg: 'put API',
    id
  })
};
const usuariosPost = (req, res = response) => {
  const {nombre, apellido} = req.body;
  res.status(201).json({
    msg: 'post API - controlador',
    nombre,
    apellido
  })
};
const usuariosDelete = (req, res = response) => {
  res.json({
    msg: 'delete API - controlador'
  })
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
