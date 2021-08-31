const {Router} = require('express');
const { check } = require('express-validator');

const {validarCampos, validarJWT, esAdminRole, tieneRol} = require('../middlewares');
const router = Router();
const {usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
  } = require('../controllers/usuarios');
const {esRoleValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');

router.get('/', usuariosGet);

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRoleValido),
  validarCampos
],
usuariosPut);

router.post('/',
[
  check('correo', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe tener al menos 6 caracteres').isLength({min: 6}),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(emailExiste),
  check('rol').custom(esRoleValido),
  validarCampos
],
usuariosPost);


router.delete('/:id', [
  validarJWT,
  // esAdminRole,
  tieneRol('ADMIN_ROLE', 'SUPER_ROLE'),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
],
usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;
