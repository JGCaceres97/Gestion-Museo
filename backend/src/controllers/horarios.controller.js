const Horario = require('../models/Horario');
const horarioCtrl = {};
const { createRegistro } = require('./bitacora.controller');

horarioCtrl.getHorarios = async (req, res) => {
  try {
    const horarios = await Horario.find();
    res.status(200).json(horarios);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

horarioCtrl.createHorario = async (req, res) => {
  try {
    const { Hora } = req.body;
    const nuevoHorario = new Horario({
      Hora
    });
    await nuevoHorario.save();

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Adición de horario disponible: ${Hora}.`
    });

    res.status(200).json({ message: 'Horario agregado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al registrar el horario.' });
  }
};

horarioCtrl.getHorario = async (req, res) => {
  try {
    const horario = await Horario.findById(req.params.id);

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Lectura de horario: ${horario.Hora}.`
    });

    res.status(200).json(horario);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

horarioCtrl.updateHorario = async (req, res) => {
  try {
    const { Hora } = req.body;
    const horario = await Horario.findOneAndUpdate(
      { _id: req.params.id },
      {
        Hora
      }
    );

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Actualización de horario disponible: ${horario.Hora} --> ${Hora}.`
    });

    res.status(200).json({ message: 'Horario actualizado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al actualizar el horario.' });
  }
};

horarioCtrl.deleteHorario = async (req, res) => {
  try {
    const horario = await Horario.findOneAndDelete({ _id: req.params.id });

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Eliminación de horario disponible: ${horario.Hora}.`
    });

    res.status(200).json({ message: 'Horario eliminado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al eliminar el horario.' });
  }
};

module.exports = horarioCtrl;
