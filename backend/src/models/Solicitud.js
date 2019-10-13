const { Schema, model } = require('mongoose');

const solicitudSchema = new Schema({
  NumIdentidad: {
    type: String,
    required: true
  },
  Nombre: {
    type: String,
    required: true,
    trim: true
  },
  Telefono: {
    type: String,
    required: true
  },
  Correo: {
    type: String,
    required: true
  },
  Institucion: {
    type: String,
    required: true,
    trim: true
  },
  Procedencia: {
    type: String,
    required: true,
    trim: true
  },
  CantPersonas: {
    type: Number,
    required: true
  },
  FechaSolicitud: {
    type: Date,
    default: Date.now,
    required: true
  },
  FechaVisita: {
    type: Date,
    required: true
  },
  Charla: {
    type: Boolean,
    required: true
  },
  TemaCharla: {
    type: String,
    trim: true
  },
  Estado: {
    type: String,
    default: 'En proceso',
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = model('Solicitud', solicitudSchema);
