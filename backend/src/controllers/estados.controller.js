const Estado = require('../models/Estados');
const estadoCtrl = {};

estadoCtrl.getEstados = async (req, res) => {
  const estados = await Estado.find();
  res.json(estados);
};

estadoCtrl.createEstado = async (req, res) => {
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
};

estadoCtrl.getEstado = async (req, res) => {
  const estado = await Estado.findById(req.params.id);
  res.json(estado);
};

estadoCtrl.updateEstado = async (req, res) => {
  const {
    Nombre,
    Descripcion
  } = req.body;
  await Estado.findOneAndUpdate({ _id: req.params.id }, {
    Nombre,
    Descripcion
  });
  res.json({ message: 'Estado actualizado.' });
};

estadoCtrl.deleteEstado = async (req, res) => {
  await Estado.findOneAndDelete({ _id: req.params.id });
  res.json({ message: 'Estado eliminado.' });
};

module.exports = estadoCtrl;
