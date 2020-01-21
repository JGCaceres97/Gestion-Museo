const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { emailAddress, emailPassword } = require('../../config');
const { address, defaultUserPass, secretKey } = require('../../config');
const usuarioCtrl = {};
const { createRegistro } = require('./bitacora.controller');

usuarioCtrl.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select(['-Password']);

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: 'Lectura de listado de usuarios.'
    });

    res.status(200).json(usuarios);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

usuarioCtrl.signUp = async (req, res) => {
  try {
    const { IDRol, Nombres, Apellidos, Email } = req.body;
    const token = crypto.randomBytes(20).toString('hex');

    const usuario = new Usuario({
      IDRol,
      Nombres,
      Apellidos,
      Email,
      Password: defaultUserPass,
      ResetToken: token,
      ResetExpires: Date.now() + 3600000 * 24
    });

    usuario.Password = await usuario.encryptPassword(usuario.Password);
    await usuario.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${emailAddress}`,
        pass: `${emailPassword}`
      }
    });

    const mailOptions = {
      from: 'No-reply BCH <no-reply@bch.hn>',
      to: `${usuario.Email}`,
      subject: 'Creación de cuenta',
      text:
        `Buen día ${usuario.Nombres},\n\n` +
        'Está recibiendo este corro debido a que se ha creado una nueva cuenta en el Sistema de Gestión de Centros Culturales con su dirección de correo electrónico.\n\n' +
        'Haga clic en el siguiente enlace, o copie y pegue el mismo en su navegador web para completar el proceso de creación y asignación de una nueva contraseña a la cuenta en un plazo de 24 horas desde que se recibio este correo.\n\n' +
        `http://${address}/reset/${token}\n\n` +
        'Si usted no hizo solicitud de cuenta, por favor comuníquelo al personal administrativo de los Centros Culturales para proceder a dar de baja la misma.\n'
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.error('Ha ocurrido un error: ', err);
    });

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Adición de usuario: ${usuario.Email}.`
    });

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

    const Token = jwt.sign(
      { _usuario: { ID: usuario._id, Email: usuario.Email }, _permisos: usuario.IDRol.Permisos },
      secretKey,
      {
        expiresIn: 60 * 60 * 12
      }
    );

    await createRegistro({
      IDUsuario: usuario._id,
      Email: usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Inicio de sesión: ${usuario.Email}.`
    });

    res.status(200).json({
      Token,
      Usuario: usuario.Nombres,
      Permisos: usuario.IDRol.Permisos
    });
  } catch (e) {
    console.error(e);
    res.status(400).json('Ha ocurrido un error al realizar la consulta.');
  }
};

usuarioCtrl.signOut = async (req, res) => {
  try {
    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Cierre de sesión: ${req.usuario.Email}.`
    });

    res.status(200).json({ message: 'Evento registrado.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al registrar el evento.' });
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

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Lectura de usuario: ${usuario.Email}.`
    });

    res.status(200).json(usuario);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

usuarioCtrl.updateUsuario = async (req, res) => {
  try {
    const { Nombres, Apellidos } = req.body;
    const usuario = await Usuario.findOneAndUpdate({ _id: req.params.id }, { Nombres, Apellidos });

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Actualización de usuario: ${usuario.Email}.`
    });

    res.status(200).json({ message: 'Usuario actualizado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al actualizar el usuario.' });
  }
};

usuarioCtrl.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findOneAndDelete({ _id: req.params.id });

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Dada de baja de usuario: ${usuario.Email}.`
    });

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
        user: `${emailAddress}`,
        pass: `${emailPassword}`
      }
    });

    const mailOptions = {
      from: 'No-reply BCH <no-reply@bch.hn>',
      to: `${usuario.Email}`,
      subject: 'Restablecimiento de contraseña',
      text:
        `Buen día ${usuario.Nombres},\n\n` +
        'Está recibiendo esto debido a que usted (o alguien más) ha solicitado el restablecimiento de la contraseña para su cuenta en el Sistema de Gestión de los Centros Culturales.\n\n' +
        'Haga clic en el siguiente enlace, o copie y pegue el mismo en su navegador web para completar el proceso en el plazo de una hora desde que se recibio este correo.\n\n' +
        `http://${address}/reset/${token}\n\n` +
        'Si usted no hizo esta solicitud, por favor ignore este correo.\n'
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.error('Ha ocurrido un error: ', err);
      res.status(200).json('Correo de restablecimiento enviado.');
    });

    await createRegistro({
      IDUsuario: usuario._id,
      Email: usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Solicitud de restablecimiento de contraseña: ${usuario.Email}.`
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

    await createRegistro({
      IDUsuario: usuario._id,
      Email: usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Validación de token de actualización de contraseña: ${usuario.Email}.`
    });

    res.status(200).json({
      Email: usuario.Email,
      message: 'Token válido.'
    });
  } catch (e) {
    console.error(e);
    res.status(500).json('Error actualizando la contraseña.');
  }
};

usuarioCtrl.updatePassword = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const usuario = await Usuario.findOne({ Email });

    if (!usuario) return res.status(404).json('El usuario no existe. No se puede actualizar.');

    const encryptedPass = await usuario.encryptPassword(Password);
    await usuario.updateOne({
      Password: encryptedPass,
      ResetToken: '',
      ResetExpires: ''
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${emailAddress}`,
        pass: `${emailPassword}`
      }
    });

    const mailOptions = {
      from: 'No-reply BCH <no-reply@bch.hn>',
      to: `${usuario.Email}`,
      subject: 'Actualización de contraseña',
      text:
        `Buen día ${usuario.Nombres},\n\n` +
        'Está recibiendo este correo de notificación debido a que usted (o alguien más) ha realizado una actualización de contraseña para su cuenta en el Sistema de Gestión de los Centros Culturales.\n\n' +
        'Si usted no realizó esta actualización, por favor comuníquelo al personal administrativo de los Centros Culturales para que se le pueda ayudar con la recuperación de la cuenta, en caso contrario ignore este mensaje.\n'
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.error('Ha ocurrido un error: ', err);
    });

    await createRegistro({
      IDUsuario: usuario._id,
      Email: usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Actualización de contraseña: ${usuario.Email}.`
    });

    res.status(200).json('Contraseña actualizada.');
  } catch (e) {
    console.error(e);
    res.status(500).json('Error actualizando la contraseña.');
  }
};

module.exports = usuarioCtrl;
