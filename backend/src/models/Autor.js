const { Schema, model } = require('mongoose');

const autorSchema = new Schema(
  {
    Nombre: {
      type: String,
      maxlength: 50,
      required: true,
      trim: true
    },
    Nacionalidad: {
      type: String,
      maxlength: 30,
      required: true,
      trim: true
    },
    GenerosLiterarios: {
      type: String,
      maxlength: 100,
      required: true,
      trim: true
    },
    FechaNacimiento: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'Autores'
  }
);

module.exports = model('Autor', autorSchema);
