
const validarRoles = require('../middlewares/validar-roles');
const validarJWT = require('../middlewares/validar-jwt');
const validarCampos = require('../middlewares/validar-campos');


module.exports = {
  ...validarRoles, ...validarJWT, ...validarCampos
};
