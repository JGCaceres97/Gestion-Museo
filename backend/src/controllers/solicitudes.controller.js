const Solicitud = require('../models/Solicitud');
const solicitudCtrl = {};

solicitudCtrl.getSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find().populate('IDHorario').populate('IDEstado');
    res.json(solicitudes);
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

solicitudCtrl.createSolicitud = async (req, res) => {
  try {
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
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al registrar la solicitud.' });
  }
};

solicitudCtrl.getSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id).populate('IDHorario').populate('IDEstado');
    res.json(solicitud);
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al realizar la consulta.' });
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
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al actualizar la solicitud.' });
  }
};

solicitudCtrl.deleteSolicitud = async (req, res) => {
  try {
    await Solicitud.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'Solicitud eliminada.' });
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al eliminar la solicitud.' });
  }
};

module.exports = solicitudCtrl;
