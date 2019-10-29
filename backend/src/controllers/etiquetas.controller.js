const Etiqueta = require('../models/Etiqueta');
const etiquetaCtrl = {};

etiquetaCtrl.getEtiquetas = async (req, res) => {
  const etiquetas = await Etiqueta.find();
  res.json(etiquetas);
};

etiquetaCtrl.createEtiqueta = async (req, res) => {
  const {
    Nombre,
    Descripcion
  } = req.body;
  const nuevaEtiqueta = new Etiqueta({
    Nombre,
    Descripcion
  });
  await nuevaEtiqueta.save();
  res.json({ message: 'Etiqueta ingresada.' });
};

etiquetaCtrl.getEtiqueta = async (req, res) => {
  const etiqueta = await Etiqueta.findById(req.params.id);
  res.json(etiqueta);
};

etiquetaCtrl.updateEtiqueta = async (req, res) => {
  const {
    Nombre,
    Descripcion
  } = req.body;
  await Etiqueta.findOneAndUpdate({ _id: req.params.id }, {
    Nombre,
    Descripcion
  });
  res.json({ message: 'Etiqueta actualizada.' });
};

etiquetaCtrl.deleteEtiqueta = async (req, res) => {
  await Etiqueta.findOneAndDelete({ _id: req.params.id });
  res.json({ message: 'Etiqueta eliminada.' });
};

module.exports = etiquetaCtrl;
