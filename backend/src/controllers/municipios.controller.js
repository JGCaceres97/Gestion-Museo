const Municipio = require('../models/Municipio');
const municipioCtrl = {};

municipioCtrl.getMunicipios = async (req, res) => {
  try {
    const municipios = await Municipio.find();
    res.status(200).json(municipios);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

municipioCtrl.createMunicipio = async (req, res) => {
  try {
    const { Nombre } = req.body;
    const nuevoMunicipio = new Municipio({
      Nombre
    });
    await nuevoMunicipio.save();
    res.status(201).json({ message: 'Municipio ingresado.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al ingresar el municipio.' });
  }
};

municipioCtrl.getMunicipio = async (req, res) => {
  try {
    const municipio = await Municipio.findById(req.params.id);
    res.status(200).json(Municipio);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

municipioCtrl.updateMunicipio = async (req, res) => {
  try {
    const { Nombre } = req.body;
    await Municipio.findOneAndUpdate({ _id: req.params.id }, { Nombre });
    res.status(200).json({ message: 'Municipio actualizado.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al actualizar el municipio.' });
  }
};

municipioCtrl.deleteMunicipio = async (req, res) => {
  try {
    await Municipio.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: 'Municipio eliminado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al eliminar el municipio.' });
  }
};

module.exports = municipioCtrl;
