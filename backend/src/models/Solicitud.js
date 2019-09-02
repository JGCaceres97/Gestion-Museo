const { Schema, model } = require('mongoose');

const solicitudSchema = new Schema({
  ID: {
    type: Number,
    required: true,
    unique: true
  },
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
    type: String,
    required: true
  },
  TemaCharla: String,
  Estado: {
    type: String,
    default: 'Proceso',
    required: true,
    trim: true
  }
}, {
    timestamps: true
  });

module.exports = model('Solicitud', solicitudSchema);