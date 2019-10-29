const Horario = require('../models/Horario');
const horarioCtrl = {};

horarioCtrl.getHorarios = async (req, res) => {
  const horarios = await Horario.find();
  res.json(horarios);
};

horarioCtrl.createHorario = async (req, res) => {
  const {
    Hora
  } = req.body;
  const nuevoHorario = new Horario({
    Hora
  });
  await nuevoHorario.save();
  res.json({ message: 'Horario agregado.' });
};

horarioCtrl.getHorario = async (req, res) => {
  const horario = await Horario.findById(req.params.id);
  res.json(horario);
};

horarioCtrl.updateHorario = async (req, res) => {
  const {
    Hora
  } = req.body;
  await Horario.findOneAndUpdate({ _id: req.params.id }, {
    Hora
  });
  res.json({ message: 'Horario actualizado.' });
};

horarioCtrl.deleteHorario = async (req, res) => {
  await Horario.findOneAndDelete({ _id: req.params.id });
  res.json({ message: 'Horario eliminado.' });
};

module.exports = horarioCtrl;
