const { Schema, model } = require('mongoose');

const etiquetaSchema = new Schema(
  {
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
      maxlength: 100
    }
  },
  {
    timestamps: true,
    collection: 'Etiquetas'
  }
);

module.exports = model('Etiqueta', etiquetaSchema);
