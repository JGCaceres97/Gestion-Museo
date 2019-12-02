const { Schema, model } = require('mongoose');

const bitacoraSchema = new Schema(
  {
    IDUsuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    },
    IDSolicitud: {
      type: Schema.Types.ObjectId,
      ref: 'Solicitud',
      required: false
    },
    IDLibro: {
      type: Schema.Types.ObjectId,
      ref: 'Libro',
      required: false
    },
    IP: {
      type: String,
      required: true,
      match: /(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/
    },
    Accion: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    MarcaDeTiempo: {
      type: Date,
      default: Date.now,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'Bitacora'
  }
);

module.exports = model('Bitacora', bitacoraSchema);
