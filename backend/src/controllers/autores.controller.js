const Autor = require('../models/Autor');
const autorCtrl = {};
const { createRegistro } = require('./bitacora.controller');

autorCtrl.getAutores = async (req, res) => {
  try {
    const autores = await Autor.find();

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: 'Lectura de listado de autores.'
    });

    res.status(200).json(autores);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

autorCtrl.createAutor = async (req, res) => {
  try {
    const { Nombre, Nacionalidad, GenerosLiterarios, FechaNacimiento } = req.body;
    const nuevoAutor = new Autor({
      Nombre,
      Nacionalidad,
      GenerosLiterarios,
      FechaNacimiento
    });
    await nuevoAutor.save();

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Adición de autor: ${Nombre}.`
    });

    res.status(201).json({ message: 'Autor ingresado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al registrar el autor.' });
  }
};

autorCtrl.getAutor = async (req, res) => {
  try {
    const autor = await Autor.findById(req.params.id);

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Lectura de datos de autor: ${autor.Nombre}.`
    });

    res.status(200).json(autor);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

autorCtrl.updateAutor = async (req, res) => {
  try {
    const { Nombre, Nacionalidad, GenerosLiterarios, FechaNacimiento } = req.body;
    const autor = await Autor.findOneAndUpdate(
      { _id: req.params.id },
      { Nombre, Nacionalidad, GenerosLiterarios, FechaNacimiento }
    );

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Actualización de autor: ${autor.Nombre}.`
    });

    res.status(200).json({ message: 'Autor actualizado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al actualizar el autor.' });
  }
};

autorCtrl.deleteAutor = async (req, res) => {
  try {
    const autor = await Autor.findOneAndDelete({ _id: req.params.id });

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Dada de baja de autor: ${autor.Nombre}.`
    });

    res.status(200).json({ message: 'Autor dado de baja.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al dar de baja el autor.' });
  }
};

module.exports = autorCtrl;
