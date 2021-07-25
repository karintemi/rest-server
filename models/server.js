const express = require('express')
const cors = require('cors');

const {dbConnection} = require('../database/config');
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    this.authPath = '/api/auth';

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

    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`);
    })
  }
}


module.exports = Server;;
