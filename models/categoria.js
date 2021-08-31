const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  },
  usuario:{
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
})

// saco del usuario la __v y password para que no sean visibles a nadie
CategoriaSchema.methods.toJSON = function() {
  const {__v, estado, ...data} = this.toObject();
  return data;
}


module.exports = model('Categoria', CategoriaSchema);
