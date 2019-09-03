const { Schema, model } = require('mongoose');

const libroSchema = new Schema({
  ID: {
    type: Number,
    required: true,
    unique: true
  },
  Nombre: {
    type: String,
    required: true,
    trim: true
  },
  Autor: {
    type: String,
    required: true,
    trim: true
  },
  Año: {
    type: String,
    required: true
  },
  Editorial: {
    type: String,
    required: true,
    trim: true
  },
  ISBN: {
    type: String,
    required: false
  }
}, {
    timestamps: true
  });

module.exports = model('Libro', libroSchema);