const {Router} = require('express');
const { check } = require('express-validator');

const {validarCampos, validarJWT, esAdminRole} = require('../middlewares');
const router = Router();
// const {usuariosGet,
const {crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto} = require('../controllers/productos');
const {existeCategoriaPorId, existeProductoPorId} = require('../helpers/db-validators');
// Obtiene todas las Productos
router.get('/', obtenerProductos);

// Obtiene un Producto por id
router.get('/:id', [
  check('id', 'No es un Id de Mongo válido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos,
], obtenerProducto);

// Crear un Producto
router.post('/',[
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('categoria', 'No es un Id de Mongo válido').isMongoId(),
  check('categoria').custom(existeCategoriaPorId),
], crearProducto);

// Actualizar un Producto
router.put('/:id', [
  validarJWT,
  check('categoria', 'No es un Id de Mongo válido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos,
], actualizarProducto);

// Borrar un Producto - Admin
router.delete('/:id', [
  validarJWT,
  esAdminRole,
  check('id', 'No es un Id de Mongo válido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos,
], borrarProducto);

module.exports = router;
