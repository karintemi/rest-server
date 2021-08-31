const Role = require('../models/role');
const {Usuario, Categoria, Producto} = require('../models');

const esRoleValido = async(rol = '') => {
  if (!await Role.findOne({rol})) {
    throw new Error(`El rol ${rol} no está registrado en la BD`)
  }
}
const emailExiste = async(correo = '') => {
  if (await Usuario.findOne({correo})) {
    throw new Error(`El correo: ${correo} ya está registrado en la BD`)
  };ssssssssssssss
}

const existeUsuarioPorId = async(id) => {
  if (!await Usuario.findById(id)) {
    throw new Error(`El ID: ${id} no existe en la BD`)
  };
}

const existeCategoriaPorId = async(id) => {
  if (!await Categoria.findById(id)) {
    throw new Error(`El ID: ${id} no existe en la BD`)
  };
}
const existeProductoPorId = async(id) => {
  if (!await Producto.findById(id)) {
    throw new Error(`El ID: ${id} no existe en la BD`)
  };
}

module.exports = {esRoleValido, emailExiste, existeUsuarioPorId, existeCategoriaPorId, existeProductoPorId};
