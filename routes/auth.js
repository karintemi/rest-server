const {Router} = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');
const router = Router();
// const {usuariosGet,
//     usuariosPut,
//     usuariosPost,
//     usuariosDelete,
//     usuariosPatch
//   } = require('../controllers/usuarios');
// const {esRoleValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');

router.post('/login',
  check('correo', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(), 
  validarCampos, login);

// router.put('/:id', usuariosPut, [
//
//   check('id').custom(existeUsuarioPorId),
//   check('rol').custom(esRoleValido),
//
// ],
// usuariosPut);
//
// router.post('/',
// [
//   check('correo', 'El nombre es obligatorio').not().isEmpty(),
//   check('password', 'El password debe tener al menos 6 caracteres').isLength({min: 6}),
//   check('correo', 'El correo no es válido').isEmail(),
//   check('correo').custom(emailExiste),
//   check('rol').custom(esRoleValido),
//   validarCampos
// ],
// usuariosPost);
//
//
// router.delete('/:id', [
//   check('id', 'No es un ID válido').isMongoId(),
//   check('id').custom(existeUsuarioPorId),
//   validarCampos
// ],
// usuariosDelete);
//
// router.patch('/', usuariosPatch);


module.exports = router;
