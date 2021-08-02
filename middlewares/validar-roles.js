const { response } = require('express')

const esAdminRole = (req, res, next) => {

  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin validar el token primero'
    });
  }
  const {rol, nombre} = req.usuario;
  if (rol !=='ADMIN_ROLE') {
    return req.status(401).json({
      msg: `${nombre} no es admministrador`
    });
  }
  next();
}

const tieneRol = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se quiere verificar el rol sin validar el token primero'
      });
    }
    if (!roles.includes(req.usuario.rol)) {
      return req.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`
      });

    }
    next();
  };
}

module.exports = {esAdminRole, tieneRol};
