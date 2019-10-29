const { Schema, model } = require('mongoose');

const rolSchema = new Schema({
  Nombre: {
    type: String,
    required: true,
    maxlength: 20,
    trim: true
  },
  Permisos: {
    Bitacora: {
      type: Boolean,
      required: true,
      default: false
    },
    Reporteria: {
      type: Boolean,
      required: true,
      default: true
    },
    Usuarios: {
      type: Boolean,
      required: true,
      default: false
    },
    Backup: {
      type: Boolean,
      required: true,
      default: false
    }
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

module.exports = model('Rol', rolSchema);
