const {response} = require('express');
const {Producto} = require('../models');
// const bcryptjs = require('bcryptjs');

const obtenerProductos = async(req, res = response) => {
  const {limite = 5, desde = 0} = req.query;
  const query = { estado: true };

// realizo las consultas en forma paralela de cantidad de usuarios y usuarios
  const [total, productos] = await Promise.all([
    Producto.countDocuments({query}),
    Producto.find(query)
      .populate('usuario', 'nombre')
      .populate('categoria', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite))
    ]);
  res.json({
    total, productos
  })
};

const obtenerProducto = async(req, res = response) => {
  const {id } = req.params;
  const producto = await Producto.findById(id)
  .populate('usuario', 'nombre')
  .populate('categoria', 'nombre');

  res.json(producto);
}

const crearProducto = async(req, res = response) => {
  const {estado, usuario, ...body} = req.body;
  const productoDB = await Producto.findOne({nombre: body.nombre});
  const {_id, paswword, google, correo, ...resto} = req.body

  if (productoDB) {
    resto.res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe!`
    });
  }
  // Generar datos a guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id
  }
  const producto = new Producto(data);
  await producto.save();

  res.status(201).json(Producto);
};

const actualizarProducto = async (req, res = response) => {
  const {id} = req.params;
  const {estado, usuario, ...data} = req.body;

  if(data.nombre)
    data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;
  // Guardar en BD
  const Producto = await Producto.findByIdAndUpdate(id, data, {new: true});
  res.json(Producto)
};

const borrarProducto = async (req, res = response) => {
  const {id} = req.params
  // Borrado físico (no recomendado por Int Ref)
  // const usuario = await Usuario.findByIdAndDelete(id)

  const producto = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true})
  res.json(producto)
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - controlador'
  })
};

module.exports = {
obtenerProductos,
crearProducto,
obtenerProducto,
borrarProducto,
actualizarProducto
};
