const solicitudCtrl = {};

const Solicitud = require('../models/Solicitud');

solicitudCtrl.getSolicitudes = async (req, res) => {
  const solicitudes = await Solicitud.find();
  res.json(solicitudes);
};

solicitudCtrl.createSolicitud = async (req, res) => {
  const {
    ID,
    NumIdentidad,
    Nombre,
    Apellido,
    Telefono,
    Correo,
    Institucion,
    Procedencia,
    CantPersonas,
    FechaVisita,
    Charla,
    Tema
  } = req.body;
  const nuevaSolicitud = new Solicitud({
    ID,
    NumIdentidad,
    Nombre: Nombre + " " + Apellido,
    Telefono,
    Correo,
    Institucion,
    Procedencia,
    CantPersonas,
    FechaVisita,
    Charla,
    Tema
  });
  await nuevaSolicitud.save();
  res.json({ message: 'Solicitud enviada' });
};

solicitudCtrl.getSolicitud = async (req, res) => {
  const solicitud = await Solicitud.findById(req.params.id);
  res.json(solicitud);
};

solicitudCtrl.updateSolicitud = async (req, res) => {
  const {
    NumIdentidad,
    Nombre,
    Apellido,
    Telefono,
    Correo,
    Institucion,
    Procedencia,
    CantPersonas,
    FechaVisita,
    Charla,
    Tema
  } = req.body;
  await Solicitud.findOneAndUpdate({ _id: req.params.id }, {
    NumIdentidad,
    Nombre: Nombre + " " + Apellido,
    Telefono,
    Correo,
    Institucion,
    Procedencia,
    CantPersonas,
    FechaVisita,
    Charla,
    Tema
  });
  res.json({ message: 'Solicitud updated' });
};

solicitudCtrl.deleteSolicitud = async (req, res) => {
  await Solicitud.findOneAndDelete({ _id: req.params.id });
  res.json({ message: 'Solicitud eliminada' });
};

module.exports = solicitudCtrl;