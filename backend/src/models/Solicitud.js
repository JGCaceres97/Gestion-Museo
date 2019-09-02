const { Schema, model } = require('mongoose');

const solicitudSchema = new Schema({
  ID: {
    type: number,
    required: true
  },
  NumIdentidad: {
    type: String,
    required: true
  },
  Nombre: {
    type: String,
    required: true
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
    required: true
  },
  Procedencia: {
    type: String,
    required: true
  },
  CantPersonas: {
    type: number,
    required: true
  },
  FechaSolicitud: {
    type: String,
    required: true
  },
  FechaVisita: {
    type: String,
    required: true
  },
  Charla: {
    type: String,
    required: true
  },
  TemaCharla: String,
  Estado: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

model('Solicitud', solicitudSchema);