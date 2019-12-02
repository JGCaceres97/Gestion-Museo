const Solicitud = require('../models/Solicitud');
const solicitudCtrl = {};

solicitudCtrl.getSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find()
      .populate('IDHorario')
      .populate('IDEstado');
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
      .populate('IDHorario')
      .populate('IDEstado');
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
      Direccion,
      CantPersonas,
      FechaVisita,
      IDHorario,
      Charla,
      TemaCharla,
      IDEstado
    } = req.body;
    await Solicitud.findOneAndUpdate(
      { _id: req.params.id },
      {
        Identidad,
        Nombres,
        Apellidos,
        Telefono,
        Email,
        Institucion,
        Direccion,
        CantPersonas,
        FechaVisita,
        IDHorario,
        Charla,
        TemaCharla,
        IDEstado
      }
    );
    res.status(200).json({ message: 'Solicitud actualizada.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al actualizar la solicitud.' });
  }
};

solicitudCtrl.deleteSolicitud = async (req, res) => {
  try {
    await Solicitud.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: 'Solicitud eliminada.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al eliminar la solicitud.' });
  }
};

module.exports = solicitudCtrl;
