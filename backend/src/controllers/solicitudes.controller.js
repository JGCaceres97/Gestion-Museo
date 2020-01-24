const Solicitud = require('../models/Solicitud');
const solicitudCtrl = {};
const Estado = require('../models/Estado');
const { createRegistro } = require('./bitacora.controller');
const nodemailer = require('nodemailer');
const moment = require('moment');
const { emailAddress, emailPassword } = require('../../config');

solicitudCtrl.getSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find()
      .populate('IDDepto')
      .populate('IDMunicipio')
      .populate('IDHorario')
      .populate('IDEstado');

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: 'Lectura de listado de solicitudes.'
    });

    res.status(200).json(solicitudes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

solicitudCtrl.createSolicitud = async (req, res) => {
  const URL = req.protocol + '://' + req.get('host') + '/';
  try {
    const {
      Identidad,
      Nombres,
      Apellidos,
      Telefono,
      Email,
      Institucion,
      IDDepto,
      IDMunicipio,
      Direccion,
      CantPersonas,
      FechaVisita,
      IDHorario,
      Charla,
      TemaCharla,
      IDEstado
    } = req.body;

    const nuevaSolicitud = new Solicitud({
      Identidad,
      Nombres,
      Apellidos,
      Telefono,
      Email,
      Institucion,
      IDDepto,
      IDMunicipio,
      Direccion,
      CantPersonas,
      FechaVisita,
      IDHorario,
      Charla,
      TemaCharla,
      IDEstado,
      Adjuntos: req.files.map(file => ({
        Nombre: file.originalname,
        Path: URL + file.path
      }))
    });
    await nuevaSolicitud.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailAddress,
        pass: emailPassword
      }
    });

    const mailOptions = {
      from: 'No-reply BCH <no-reply@bch.hn>',
      to: Email,
      subject: 'Solicitud de visita',
      text:
        `Buen día ${Nombres},\n\n` +
        'Su solicitud de visita a los Centros Culturales del BCH fue recibida y está siendo procesada por el personal asignado, se le estará notificando en caso de que cambie el estado de la misma.\n'
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.error('Ha ocurrido un error: ', err);
    });

    res.status(201).json({ message: 'Solicitud enviada.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al registrar la solicitud.' });
  }
};

solicitudCtrl.getSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id)
      .populate('IDDepto')
      .populate('IDMunicipio')
      .populate('IDHorario')
      .populate('IDEstado');

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Lectura de solicitud: ${solicitud.Institucion}, ${moment(solicitud.FechaVisita)
        .utcOffset(-6)
        .format('DD/MM/YYYY h:mm A')}.`
    });

    res.status(200).json(solicitud);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

solicitudCtrl.updateSolicitud = async (req, res) => {
  try {
    const {
      Identidad,
      Nombres,
      Apellidos,
      Telefono,
      Email,
      Institucion,
      IDDepto,
      IDMunicipio,
      Direccion,
      CantPersonas,
      FechaVisita,
      IDHorario,
      Charla,
      TemaCharla,
      IDEstado
    } = req.body;
    const solicitud = await Solicitud.findOneAndUpdate(
      { _id: req.params.id },
      {
        Identidad,
        Nombres,
        Apellidos,
        Telefono,
        Email,
        Institucion,
        IDDepto,
        IDMunicipio,
        Direccion,
        CantPersonas,
        FechaVisita,
        IDHorario,
        Charla,
        TemaCharla,
        IDEstado
      }
    );

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Actualización de solicitud: ${solicitud.Institucion}, ${moment(solicitud.FechaVisita)
        .utcOffset(-6)
        .format('DD/MM/YYYY h:mm A')}.`
    });

    const estado = await Estado.findById(IDEstado);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailAddress,
        pass: emailPassword
      }
    });

    const mailOptions = {
      from: 'No-reply BCH <no-reply@bch.hn>',
      to: Email,
      subject: 'Cambio de estado en solicitud de visita',
      text:
        `Buen día ${Nombres},\n\n` +
        `Su solicitud de visita a los Centros Culturales del BCH por parte de el/la ${Institucion} para el ${moment(
          FechaVisita
        )
          .utcOffset(-6)
          .format('DD/MM/YYYY h:mm A')}, cambio de estado a: ${estado.Nombre}.\n\n` +
        'Para más información puede comunicarse al correo electrónico centrosculturales@bch.hn o llamando al teléfono 2262-3702 ext 10112.\n'
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.error('Ha ocurrido un error: ', err);
    });

    res.status(200).json({ message: 'Solicitud actualizada.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al actualizar la solicitud.' });
  }
};

solicitudCtrl.deleteSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.findOneAndDelete({ _id: req.params.id });

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Eliminación de solicitud: ${solicitud.Institucion}, ${moment(solicitud.FechaVisita)
        .utcOffset(-6)
        .format('DD/MM/YYYY h:mm A')}.`
    });

    res.status(200).json({ message: 'Solicitud eliminada.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al eliminar la solicitud.' });
  }
};

module.exports = solicitudCtrl;
