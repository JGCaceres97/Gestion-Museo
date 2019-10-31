const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const auth = {};

auth.signUp = async (req, res) => {
  try {
    const {
      IDRol,
      Nombres,
      Apellidos,
      Email,
      Password
    } = req.body;

    // Guardando un nuevo usuario
    const usuario = new Usuario({
      IDRol,
      Nombres,
      Apellidos,
      Email,
      Password
    });

    usuario.Password = await usuario.encryptPassword(usuario.Password);
    const usuarioGuardado = await usuario.save();

    // Token
    const token = jwt.sign({
      _id: usuarioGuardado._id,
      _rol: usuarioGuardado.IDRol
    }, process.env.TOKEN_SECRET || 'FraseSecreta', {
      expiresIn: 60 * 60 * 24
    });

    res.header('auth-token', token).json(usuarioGuardado);
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al registrar el usuario.' });
  }
};

auth.signIn = async (req, res) => {
  try {
    const {
      Email,
      Password
    } = req.body;

    // Buscando usuario
    const usuario = await Usuario.findOne({ Email });
    if (!usuario) return res.status(400).json({ message: 'El usuario no existe en la base de datos.' });

    // Verificando contraseña
    const correctPassword = await usuario.decryptPassword(Password);
    if (!correctPassword) return res.status(400).json({ message: 'La contraseña es incorrecta.' });

    // Asignando última conexión
    await Usuario.findOneAndUpdate({ Email }, {
      UltimaConexion: Date.now()
    });

    // Token
    const token = jwt.sign({
      _id: usuario._id,
      _rol: usuario.IDRol
    }, process.env.TOKEN_SECRET || 'FraseSecreta', {
      expiresIn: 60 * 60 * 24
    });

    res.header('auth-token', token).json({
      auth: true,
      message: 'Inicio de sesión satisfactorio.'
    });
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

auth.profile = async (req, res) => {
  try {
    const {
      usuarioId
    } = req;

    const usuario = await Usuario.findById(usuarioId, { Password: 0, createdAt: 0, updatedAt: 0 });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.json(usuario);
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

module.exports = auth;
