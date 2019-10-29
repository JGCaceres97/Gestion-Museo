const Libro = require('../models/Libro');
const libroCtrl = {};

libroCtrl.getLibros = async (req, res) => {
  const libros = await Libro.find().populate('Etiquetas');
  res.json(libros);
};

libroCtrl.createLibro = async (req, res) => {
  const {
    Autor,
    Titulo,
    Descripcion,
    Año,
    ISBN,
    Editorial,
    Etiquetas
  } = req.body;
  const nuevoLibro = new Libro({
    Autor,
    Titulo,
    Descripcion,
    Año,
    ISBN,
    Editorial,
    Etiquetas
  });
  await nuevoLibro.save();
  res.json({ message: 'Libro ingresado.' });
};

libroCtrl.getLibro = async (req, res) => {
  const libro = await Libro.findById(req.params.id).populate('Etiquetas');
  res.json(libro);
};

libroCtrl.updateLibro = async (req, res) => {
  const {
    Autor,
    Titulo,
    Descripcion,
    Año,
    ISBN,
    Editorial,
    Etiquetas
  } = req.body;
  await Libro.findOneAndUpdate({ _id: req.params.id }, {
    Autor,
    Titulo,
    Descripcion,
    Año,
    ISBN,
    Editorial,
    Etiquetas
  });
  res.json({ message: 'Libro actualizado.' });
};

libroCtrl.deleteLibro = async (req, res) => {
  await Libro.findOneAndDelete({ _id: req.params.id });
  res.json({ message: 'Libro eliminado.' });
};

module.exports = libroCtrl;
