const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { emailUser, emailPassword } = require('../../config');
const { address, secretKey } = require('../../config');
const usuarioCtrl = {};

usuarioCtrl.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate('IDRol');
    res.status(200).json(usuarios);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

usuarioCtrl.signUp = async (req, res) => {
  try {
    const { IDRol, Nombres, Apellidos, Email, Password } = req.body;

    const usuario = new Usuario({
      IDRol,
      Nombres,
      Apellidos,
      Email,
      Password
    });

    usuario.Password = await usuario.encryptPassword(usuario.Password);
    await usuario.save();

    res.status(201).json({ message: 'Usuario ingresado' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al ingresar el usuario.' });
  }
};

usuarioCtrl.signIn = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const usuario = await Usuario.findOne({ Email }).populate('IDRol');
    if (!usuario) return res.status(400).json('El usuario no existe. Intente de nuevo.');

    const correctPassword = await usuario.decryptPassword(Password);
    if (!correctPassword) return res.status(400).json('Contraseña incorrecta. Intente de nuevo.');

    await Usuario.findOneAndUpdate({ Email }, { UltimaConexion: Date.now() });

    const token = jwt.sign({ _id: usuario._id, _rol: usuario.IDRol }, secretKey, {
      expiresIn: 60 * 60 * 12
    });

    res.status(200).json({ token, userId: usuario._id, rolId: usuario.IDRol });
  } catch (e) {
    console.error(e);
    res.status(400).json('Ha ocurrido un error al realizar la consulta.');
  }
};

usuarioCtrl.profile = async (req, res) => {
  try {
    const { _id } = req.body;
    const usuario = await Usuario.findById(_id, {
      Password: 0,
      createdAt: 0,
      updatedAt: 0
    });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.status(200).json(usuario);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

usuarioCtrl.updateUsuario = async (req, res) => {
  try {
    const { Nombres, Apellidos } = req.body;
    await Usuario.findOneAndUpdate({ _id: req.params.id }, { Nombres, Apellidos });
    res.status(200).json({ message: 'Usuario actualizado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al actualizar el usuario.' });
  }
};

usuarioCtrl.deleteUsuario = async (req, res) => {
  try {
    await Usuario.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: 'Usuario dado de baja.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al dar de baja el usuario.' });
  }
};

usuarioCtrl.forgotPassword = async (req, res) => {
  try {
    const { Email } = req.body;
    if (Email === '') return res.status(400).json('El correo es requerido.');

    const usuario = await Usuario.findOne({ Email });
    if (!usuario) return res.status(200).json('Correo no registrado.');

    const token = crypto.randomBytes(20).toString('hex');
    await usuario.updateOne({
      ResetToken: token,
      ResetExpires: Date.now() + 3600000
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${emailUser}`,
        pass: `${emailPassword}`
      }
    });

    const mailOptions = {
      from: 'No-reply BCH <no-reply@bch.hn>',
      to: `${usuario.Email}`,
      subject: 'Restablecimiento de contraseña',
      text:
        'Está recibiendo esto debido a que usted (o alguien más) ha solicitado el restablecimiento de la contraseña para su cuenta.\n\n' +
        'Haga clic en el siguiente enlace, o copie y pegue el mismo en su navegador web para completar el proceso en el plazo de una hora desde que se recibio:\n\n' +
        `http://${address}/reset/${token}\n\n` +
        'Si usted no hizo esta solicitud, por favor ignore este correo y su contraseña seguira igual.\n'
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.error('Ha ocurrido un error: ', err);
      res.status(200).json('Correo de restablecimiento enviado.');
    });
  } catch (e) {
    console.error(e);
    res.status(500).json('Error al solicitar restablecimiento de contraseña.');
  }
};

usuarioCtrl.reset = async (req, res) => {
  try {
    const { ResetToken } = req.body;
    const usuario = await Usuario.findOne({
      ResetToken,
      ResetExpires: { $gt: Date.now() }
    });

    if (!usuario) return res.status(200).json({ message: 'El enlace es inválido o ha expirado.' });

    res.status(200).json({
      Email: usuario.Email,
      message: 'Token válido.'
    });
  } catch (e) {
    console.error(e);
    res.status(500).json('Error restableciendo la contraseña.');
  }
};

usuarioCtrl.updatePassword = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    console.log(Email, Password);
    const usuario = await Usuario.findOne({ Email });

    if (!usuario) return res.status(404).json('El usuario no existe. No se puede actualizar.');

    const encryptedPass = await usuario.encryptPassword(Password);
    await usuario.updateOne({
      Password: encryptedPass,
      ResetToken: '',
      ResetExpires: ''
    });

    res.status(200).json('Contraseña actualizada.');
  } catch (e) {
    console.error(e);
    res.status(500).json('Error actualizando la contraseña.');
  }
};

module.exports = usuarioCtrl;
