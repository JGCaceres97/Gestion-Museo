const Etiqueta = require('../models/Etiqueta');
const etiquetaCtrl = {};

etiquetaCtrl.getEtiquetas = async (req, res) => {
  try {
    const etiquetas = await Etiqueta.find();
    res.json(etiquetas);
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

etiquetaCtrl.createEtiqueta = async (req, res) => {
  try {
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
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al registrar la etiqueta.' });
  }
};

etiquetaCtrl.getEtiqueta = async (req, res) => {
  try {
    const etiqueta = await Etiqueta.findById(req.params.id);
    res.json(etiqueta);
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

etiquetaCtrl.updateEtiqueta = async (req, res) => {
  try {
    const {
      Nombre,
      Descripcion
    } = req.body;
    await Etiqueta.findOneAndUpdate({ _id: req.params.id }, {
      Nombre,
      Descripcion
    });
    res.json({ message: 'Etiqueta actualizada.' });
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al actualizar la etiqueta.' });
  }
};

etiquetaCtrl.deleteEtiqueta = async (req, res) => {
  try {
    await Etiqueta.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'Etiqueta eliminada.' });
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al eliminar la etiqueta.' });
  }
};

module.exports = etiquetaCtrl;
