const Libro = require('../models/Libro');
const libroCtrl = {};

libroCtrl.getLibros = async (req, res) => {
  const libros = await Libro.find();
  res.json(libros);
};

libroCtrl.createLibro = async (req, res) => {
  const {
    ID,
    Nombre,
    Autor,
    Año,
    Editorial,
    ISBN
  } = req.body;
  const nuevoLibro = new Libro({
    ID,
    Nombre,
    Autor,
    Año,
    Editorial,
    ISBN
  });
  await nuevoLibro.save();
  res.json({ message: 'Libro ingresado' });
};

libroCtrl.getLibro = async (req, res) => {
  const libro = await Libro.findById(req.params.id);
  res.json(libro);
};

libroCtrl.updateLibro = async (req, res) => {
  const {
    ID,
    Nombre,
    Autor,
    Año,
    Editorial,
    ISBN
  } = req.body;
  await Libro.findOneAndUpdate({ _id: req.params.id }, {
    ID,
    Nombre,
    Autor,
    Año,
    Editorial,
    ISBN
  });
  res.json({ message: 'Libro actualizado' });
};

libroCtrl.deleteLibro = async (req, res) => {
  await Libro.findOneAndDelete({ _id: req.params.id });
  res.json({ message: 'Libro eliminado' })
}

module.exports = libroCtrl;
