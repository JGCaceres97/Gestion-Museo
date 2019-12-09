const Etiqueta = require('../models/Etiqueta');
const etiquetaCtrl = {};
const { createRegistro } = require('./bitacora.controller');

etiquetaCtrl.getEtiquetas = async (req, res) => {
  try {
    const etiquetas = await Etiqueta.find();

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: 'Lectura de listado de etiquetas para libros.'
    });

    res.status(200).json(etiquetas);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

etiquetaCtrl.createEtiqueta = async (req, res) => {
  try {
    const { Nombre, Descripcion } = req.body;
    const nuevaEtiqueta = new Etiqueta({
      Nombre,
      Descripcion
    });
    await nuevaEtiqueta.save();

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Adición de etiqueta para libros: ${Nombre}.`
    });

    res.status(201).json({ message: 'Etiqueta ingresada.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al registrar la etiqueta.' });
  }
};

etiquetaCtrl.getEtiqueta = async (req, res) => {
  try {
    const etiqueta = await Etiqueta.findById(req.params.id);

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Lectura de etiqueta para libros: ${etiqueta.Nombre}.`
    });

    res.status(200).json(etiqueta);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

etiquetaCtrl.updateEtiqueta = async (req, res) => {
  try {
    const { Nombre, Descripcion } = req.body;
    const etiqueta = await Etiqueta.findOneAndUpdate(
      { _id: req.params.id },
      {
        Nombre,
        Descripcion
      }
    );

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Actualización de etiqueta para libros: ${etiqueta.Nombre}.`
    });

    res.status(200).json({ message: 'Etiqueta actualizada.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al actualizar la etiqueta.' });
  }
};

etiquetaCtrl.deleteEtiqueta = async (req, res) => {
  try {
    const etiqueta = await Etiqueta.findOneAndDelete({ _id: req.params.id });

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Eliminación de etiqueta para libros: ${etiqueta.Nombre}.`
    });

    res.status(200).json({ message: 'Etiqueta eliminada.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al eliminar la etiqueta.' });
  }
};

module.exports = etiquetaCtrl;
