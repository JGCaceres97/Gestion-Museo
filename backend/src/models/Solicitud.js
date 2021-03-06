const { Schema, model } = require('mongoose');

const solicitudSchema = new Schema(
  {
    Identidad: {
      type: String,
      required: true,
      maxlength: 15,
      match: /^\d{4}-\d{4}-\d{5}$/
    },
    Nombres: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    Apellidos: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    Telefono: {
      type: String,
      required: true,
      maxlength: 9,
      match: /^\d{4}-\d{4}$/
    },
    Email: {
      type: String,
      required: true,
      maxlength: 50,
      lowercase: true,
      match: /^\w+([.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,4})+$/
    },
    Institucion: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    IDDepto: {
      type: Schema.Types.ObjectId,
      ref: 'Departamento',
      required: true
    },
    IDMunicipio: {
      type: Schema.Types.ObjectId,
      ref: 'Municipio',
      required: true
    },
    Direccion: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    CantPersonas: {
      type: Number,
      required: true,
      min: 1,
      max: 100
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
    IDHorario: {
      type: Schema.Types.ObjectId,
      ref: 'Horario',
      required: true
    },
    Charla: {
      type: Boolean,
      required: true
    },
    TemaCharla: {
      type: String,
      trim: true,
      required: false,
      maxlength: 20,
      default: 'N/A'
    },
    IDEstado: {
      type: Schema.Types.ObjectId,
      ref: 'Estado',
      required: true
    },
    Adjuntos: [
      {
        Nombre: {
          type: String,
          default: ''
        },
        Path: {
          type: String,
          default: ''
        }
      }
    ]
  },
  {
    timestamps: true,
    collection: 'Solicitudes'
  }
);

module.exports = model('Solicitud', solicitudSchema);
