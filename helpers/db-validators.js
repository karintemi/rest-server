const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
  if (!await Role.findOne({rol})) {
    throw new Error(`El rol ${rol} no está registrado en la BD`)
  }
}
const emailExiste = async(correo = '') => {
  if (await Usuario.findOne({correo})) {
    throw new Error(`El correo: ${correo} ya está registrado en la BD`)
  };
}

const existeUsuarioPorId = async(id) => {
  if (!await Usuario.findById(id)) {
    throw new Error(`El ID: ${id} no existe en la BD`)
  };
}

module.exports = {esRoleValido, emailExiste, existeUsuarioPorId};
