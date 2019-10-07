const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const auth = {};

auth.signUp = async (req, res) => {
  const {
    Nombre,
    Apellido,
    Password,
    Email
  } = req.body;

  // Guardando un nuevo usuario
  const usuario = new Usuario({
    Nombre,
    Apellido,
    Password,
    Email
  });
  usuario.Password = await usuario.encryptPassword(usuario.Password);
  const usuarioGuardado = await usuario.save();

  // Token
  const token = jwt.sign({ _id: usuarioGuardado._id }, process.env.TOKEN_SECRET || 'FraseSecreta');

  res.header('auth-token', token).json(usuarioGuardado);
};

auth.signIn = async (req, res) => {
  const {
    Email,
    Password
  } = req.body;

  // Buscando usuario
  const usuario = await Usuario.findOne({ Email });
  if (!usuario) return res.status(400).json('El usuario no existe en la base de datos.');

  // Verificando contraseña
  const correctPassword = await usuario.decryptPassword(Password);
  if (!correctPassword) return res.status(400).json('Contraseña incorrecta.');

  // Token
  const token = jwt.sign({ _id: usuario._id }, process.env.TOKEN_SECRET || 'FraseSecreta', {
    expiresIn: 60 * 60 * 24
  });

  res.header('auth-token', token).json(usuario);
};

auth.profile = async (req, res) => {
  const {
    usuarioId
  } = req;

  const usuario = await Usuario.findById(usuarioId, { Password: 0, createdAt: 0, updatedAt: 0 });
  if (!usuario) return res.status(404).json('Usuario no encontrado.');
  res.json(usuario);
};

module.exports = auth;
