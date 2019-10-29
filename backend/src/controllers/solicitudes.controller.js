const Solicitud = require('../models/Solicitud');
const solicitudCtrl = {};

solicitudCtrl.getSolicitudes = async (req, res) => {
  const solicitudes = await Solicitud.find().populate('IDHorario').populate('IDEstado');
  res.json(solicitudes);
};

solicitudCtrl.createSolicitud = async (req, res) => {
  const {
    Identidad,
    Nombres,
    Apellidos,
    Telefono,
    Email,
    Institucion,
    Procedencia,
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
    Procedencia,
    CantPersonas,
    FechaVisita,
    IDHorario,
    Charla,
    TemaCharla,
    IDEstado
  });
  await nuevaSolicitud.save();
  res.json({ message: 'Solicitud enviada.' });
};

solicitudCtrl.getSolicitud = async (req, res) => {
  const solicitud = await Solicitud.findById(req.params.id).populate('IDHorario').populate('IDEstado');
  res.json(solicitud);
};

solicitudCtrl.updateSolicitud = async (req, res) => {
  const {
    Identidad,
    Nombres,
    Apellidos,
    Telefono,
    Email,
    Institucion,
    Procedencia,
    CantPersonas,
    FechaVisita,
    IDHorario,
    Charla,
    TemaCharla,
    IDEstado
  } = req.body;
  await Solicitud.findOneAndUpdate({ _id: req.params.id }, {
    Identidad,
    Nombres,
    Apellidos,
    Telefono,
    Email,
    Institucion,
    Procedencia,
    CantPersonas,
    FechaVisita,
    IDHorario,
    Charla,
    TemaCharla,
    IDEstado
  });
  res.json({ message: 'Solicitud actualizada.' });
};

solicitudCtrl.deleteSolicitud = async (req, res) => {
  await Solicitud.findOneAndDelete({ _id: req.params.id });
  res.json({ message: 'Solicitud eliminada.' });
};

module.exports = solicitudCtrl;
