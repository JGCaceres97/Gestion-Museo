const { Schema, model } = require('mongoose');

const libroSchema = new Schema(
  {
    IDAutor: {
      type: Schema.Types.ObjectId,
      ref: 'Autor',
      required: true
    },
    Titulo: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 1,
      trim: true
    },
    Sinopsis: {
      type: String,
      required: true,
      maxlength: 150,
      minlength: 1,
      trim: true
    },
    Año: {
      type: String,
      required: true,
      match: /\d{4}/
    },
    ISBN: {
      type: String,
      required: false,
      maxlength: 13,
      minlength: 10
    },
    Editorial: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true
    },
    IDEtiquetas: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Etiqueta'
      }
    ]
  },
  {
    timestamps: true,
    collection: 'Libros'
  }
);

module.exports = model('Libro', libroSchema);
