const Horario = require('../models/Horario');
const horarioCtrl = {};

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
    res.status(200).json({ message: 'Horario agregado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al registrar el horario.' });
  }
};

horarioCtrl.getHorario = async (req, res) => {
  try {
    const horario = await Horario.findById(req.params.id);
    res.status(200).json(horario);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

horarioCtrl.updateHorario = async (req, res) => {
  try {
    const { Hora } = req.body;
    await Horario.findOneAndUpdate(
      { _id: req.params.id },
      {
        Hora
      }
    );
    res.status(200).json({ message: 'Horario actualizado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al actualizar el horario.' });
  }
};

horarioCtrl.deleteHorario = async (req, res) => {
  try {
    await Horario.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: 'Horario eliminado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al eliminar el horario.' });
  }
};

module.exports = horarioCtrl;
