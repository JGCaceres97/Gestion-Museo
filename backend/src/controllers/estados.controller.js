const Estado = require('../models/Estados');
const estadoCtrl = {};

estadoCtrl.getEstados = async (req, res) => {
  try {
    const estados = await Estado.find();
    res.json(estados);
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

estadoCtrl.createEstado = async (req, res) => {
  try {
    const {
      Nombre,
      Descripcion
    } = req.body;
    const nuevoEstado = new Estado({
      Nombre,
      Descripcion
    });
    await nuevoEstado.save();
    res.json({ message: 'Estado ingresado.' });
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al registrar el estado.' });
  }
};

estadoCtrl.getEstado = async (req, res) => {
  try {
    const estado = await Estado.findOne({
      Nombre: req.params.id
    });
    res.json(estado);
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

estadoCtrl.updateEstado = async (req, res) => {
  try {
    const {
      Nombre,
      Descripcion
    } = req.body;
    await Estado.findOneAndUpdate({ _id: req.params.id }, {
      Nombre,
      Descripcion
    });
    res.json({ message: 'Estado actualizado.' });
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al actualizar el estado.' });
  }
};

estadoCtrl.deleteEstado = async (req, res) => {
  try {
    await Estado.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'Estado eliminado.' });
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al eliminar el estado.' });
  }
};

module.exports = estadoCtrl;
