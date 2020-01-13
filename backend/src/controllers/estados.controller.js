const Estado = require('../models/Estado');
const estadoCtrl = {};
const { createRegistro } = require('./bitacora.controller');

estadoCtrl.getEstados = async (req, res) => {
  try {
    const estados = await Estado.find();

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: 'Lectura de listado de estados para solicitudes.'
    });

    res.status(200).json(estados);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

estadoCtrl.createEstado = async (req, res) => {
  try {
    const { Nombre, Descripcion } = req.body;
    const nuevoEstado = new Estado({
      Nombre,
      Descripcion
    });
    await nuevoEstado.save();

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Adición de estado para solicitudes: ${Nombre}.`
    });

    res.status(201).json({ message: 'Estado ingresado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al registrar el estado.' });
  }
};

estadoCtrl.getEstado = async (req, res) => {
  try {
    const estado = await Estado.findOne({
      Nombre: req.params.id
    });

    res.status(200).json(estado);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

estadoCtrl.updateEstado = async (req, res) => {
  try {
    const { Nombre, Descripcion } = req.body;
    const estado = await Estado.findOneAndUpdate(
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
      Accion: `Actualización de estado para solicitudes: ${estado.Nombre}.`
    });

    res.status(200).json({ message: 'Estado actualizado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al actualizar el estado.' });
  }
};

estadoCtrl.deleteEstado = async (req, res) => {
  try {
    const estado = await Estado.findOneAndDelete({ _id: req.params.id });

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Eliminación de estado para solicitudes: ${estado.Nombre}.`
    });

    res.status(200).json({ message: 'Estado eliminado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al eliminar el estado.' });
  }
};

module.exports = estadoCtrl;
