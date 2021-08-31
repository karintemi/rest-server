const {Router} = require('express');
const { check } = require('express-validator');

const {validarCampos, validarJWT, esAdminRole, tieneRol} = require('../middlewares');
const router = Router();
// const {usuariosGet,
const {crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria} = require('../controllers/categorias');
const {existeCategoriaPorId} = require('../helpers/db-validators');
// Obtiene todas las categorias
router.get('/', obtenerCategorias);

// Obtiene una categoria por id
router.get('/:id', [
  check('id', 'No es un Id de Mongo válido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos,
], obtenerCategoria);

// Crear una categoria
router.post('/',[
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty()
], crearCategoria);

// Actualizar una categoria
router.put('/:id', [
  validarJWT,
  check('id', 'No es un Id de Mongo válido').isMongoId(),
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('id').custom(existeCategoriaPorId),
  validarCampos,
], actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id', [
  validarJWT,
  esAdminRole,
  check('id', 'No es un Id de Mongo válido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos,
], borrarCategoria);

module.exports = router;
