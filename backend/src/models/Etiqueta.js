const { Schema, model } = require('mongoose');

const etiquetaSchema = new Schema({
  Nombre: {
    type: String,
    required: true,
    maxlength: 20,
    trim: true
  },
  Descripcion: {
    type: String,
    required: false,
    trim: true,
    maxlength: 50
  }
}, {
  timestamps: true
});

module.exports = model('Etiqueta', etiquetaSchema);
