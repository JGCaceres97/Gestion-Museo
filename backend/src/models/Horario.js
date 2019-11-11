const { Schema, model } = require('mongoose');

const horarioSchema = new Schema({
  Hora: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    maxlength: 10
  }
}, {
  timestamps: true
});

module.exports = model('Horario', horarioSchema);
