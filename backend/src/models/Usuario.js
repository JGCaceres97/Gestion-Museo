const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new Schema({
  Nombre: {
    type: String,
    required: true
  },
  Apellido: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
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
