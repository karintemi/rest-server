const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('Base de datos lista y conectada!');
  } catch (e) {
    console.log(e);
    throw new Error('Error en inicializar la DDBB')
  } finally {

  }
}

module.exports = {dbConnection};
