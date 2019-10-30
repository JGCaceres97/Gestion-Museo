const Horario = require('../models/Horario');
const horarioCtrl = {};

horarioCtrl.getHorarios = async (req, res) => {
  try {
    const horarios = await Horario.find();
    res.json(horarios);
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

horarioCtrl.createHorario = async (req, res) => {
  try {
    const {
      Hora
    } = req.body;
    const nuevoHorario = new Horario({
      Hora
    });
    await nuevoHorario.save();
    res.json({ message: 'Horario agregado.' });
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al registrar el horario.' });
  }
};

horarioCtrl.getHorario = async (req, res) => {
  try {
    const horario = await Horario.findById(req.params.id);
    res.json(horario);
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

horarioCtrl.updateHorario = async (req, res) => {
  try {
    const {
      Hora
    } = req.body;
    await Horario.findOneAndUpdate({ _id: req.params.id }, {
      Hora
    });
    res.json({ message: 'Horario actualizado.' });
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al actualizar el horario.' });
  }
};

horarioCtrl.deleteHorario = async (req, res) => {
  try {
    await Horario.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'Horario eliminado.' });
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al eliminar el horario.' });
  }
};

module.exports = horarioCtrl;
