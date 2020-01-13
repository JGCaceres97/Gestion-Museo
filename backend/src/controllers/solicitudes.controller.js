const Solicitud = require('../models/Solicitud');
const solicitudCtrl = {};
const { createRegistro } = require('./bitacora.controller');
const moment = require('moment');

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
