const express = require('express')
const cors = require('cors');

const {dbConnection} = require('../database/config');
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: '/api/auth',
      usuarios: '/api/usuarios',
      categorias: '/api/categorias',
      productos: '/api/productos',
      buscar: '/api/buscar'
    }
    this.usuariosPath =
    this.authPath =

    // Conectar a la Base de Datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de la aplicación
    this.routes();
  }

  async conectarDB(){
    await dbConnection();
  }
  middlewares() {
    // CORS
    this.app.use(cors());
    // Parseo y lectura del body
    this.app.use(express.json());
    // Directorio público
    this.app.use(express.static('public'))

  }
  routes() {

    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.buscar, require('../routes/buscar'));
    this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    this.app.use(this.paths.categorias, require('../routes/categorias'));
    this.app.use(this.paths.productos, require('../routes/productos'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`);
    })
  }
}


module.exports = Server;;
