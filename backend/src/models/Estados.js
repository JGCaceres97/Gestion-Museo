const { Schema, model } = require('mongoose');

const estadoSchema = new Schema({
  Nombre: {
    type: String,
    required: true,
    trim: true,
    maxlength: 15,
    unique: true
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

module.exports = model('Estado', estadoSchema);
