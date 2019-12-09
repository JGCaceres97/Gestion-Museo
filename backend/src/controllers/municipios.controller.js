const Municipio = require('../models/Municipio');
const municipioCtrl = {};
const { createRegistro } = require('./bitacora.controller');

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
    const { IDDepartamento, Nombre } = req.body;
    const nuevoMunicipio = new Municipio({
      IDDepartamento,
      Nombre
    });
    await nuevoMunicipio.save();

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Adición de municipio: ${Nombre}.`
    });

    res.status(201).json({ message: 'Municipio ingresado.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al ingresar el municipio.' });
  }
};

municipioCtrl.getMunicipio = async (req, res) => {
  try {
    const municipio = await Municipio.findById(req.params.id).populate('IDDepartamento');

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Lectura de municipio: ${municipio.Nombre}.`
    });

    res.status(200).json(municipio);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

municipioCtrl.updateMunicipio = async (req, res) => {
  try {
    const { IDDepartamento, Nombre } = req.body;
    const municipio = await Municipio.findOneAndUpdate(
      { _id: req.params.id },
      { IDDepartamento, Nombre }
    );

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Actualización de municipio: ${municipio.Nombre}.`
    });

    res.status(200).json({ message: 'Municipio actualizado.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al actualizar el municipio.' });
  }
};

municipioCtrl.deleteMunicipio = async (req, res) => {
  try {
    const municipio = await Municipio.findOneAndDelete({ _id: req.params.id });

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Eliminación de municipio: ${municipio.Nombre}.`
    });

    res.status(200).json({ message: 'Municipio eliminado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al eliminar el municipio.' });
  }
};

module.exports = municipioCtrl;
