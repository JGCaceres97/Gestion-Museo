const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new Schema({
  IDRol: {
    type: Schema.Types.ObjectId,
    ref: 'Rol'
  },
  Nombres: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 1,
    trim: true
  },
  Apellidos: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 1,
    trim: true
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
    lowercase: true,
    match: /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}/
  },
  Password: {
    type: String,
    required: true
  },
  ÚltimaConexion: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

usuarioSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

usuarioSchema.methods.decryptPassword = async function (password) {
  return await bcrypt.compare(password, this.Password);
}

module.exports = model('Usuario', usuarioSchema);
