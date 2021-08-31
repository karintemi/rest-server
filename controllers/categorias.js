const {response} = require('express');
const {Categoria} = require('../models');
// const bcryptjs = require('bcryptjs');

const obtenerCategorias = async(req, res = response) => {
  const {limite = 5, desde = 0} = req.query;
  const query = { estado: true };

// realizo las consultas en forma paralela de cantidad de usuarios y usuarios
  const [total, categorias] = await Promise.all([
    Categoria.countDocuments({query}),
    Categoria.find(query)
      .populate('usuario', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite))
    ]);
  res.json({
    total, categorias
  })
};

const obtenerCategoria = async(req, res = response) => {
  const {id } = req.params;
  const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

  res.json(categoria);
}
const crearCategoria = async(req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({nombre});
  const {_id, paswword, google, correo, ...resto} = req.body

  if (categoriaDB) {
    resto.res.status(400).json({
      msg: `La categoría ${categoriaDB.nombre} ya existe!`
    });
  }
  // Generar datos a guardar
  const data = {
    nombre,
    usuario: req.usuario._id
  }
  const categoria = new Categoria(data);
  await categoria.save();

  res.status(201).json(categoria);
};

const actualizarCategoria = async (req, res = response) => {
  const {id} = req.params;
  const {estado, usuario, ...data} = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;
  // Guardar en BD
  const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});
  res.json(categoria)
};
const borrarCategoria = async (req, res = response) => {
  const {id} = req.params
  // Borrado físico (no recomendado por Int Ref)
  // const usuario = await Usuario.findByIdAndDelete(id)

  const categoria = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true})
  res.json(categoria)
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - controlador'
  })
};

module.exports = {
obtenerCategorias,
crearCategoria,
obtenerCategoria,
borrarCategoria,
actualizarCategoria
};
