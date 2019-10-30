const Libro = require('../models/Libro');
const libroCtrl = {};

libroCtrl.getLibros = async (req, res) => {
  try {
    const libros = await Libro.find().populate('Etiquetas');
    res.json(libros);
  } catch (e) {
    console.error(e);
  } finally {
    res.json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

libroCtrl.createLibro = async (req, res) => {
  try {
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
  } catch (e) {
    console.error(e);
  } finally {
    res.json({ message: 'Ha ocurrido un error al registrar el libro.' });
  }
};

libroCtrl.getLibro = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id).populate('Etiquetas');
    res.json(libro);
  } catch (e) {
    console.error(e);
  } finally {
    res.json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

libroCtrl.updateLibro = async (req, res) => {
  try {
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
  } catch (e) {
    console.error(e);
  } finally {
    res.json({ message: 'Ha ocurrido un error al actualizar el libro.' });
  }
};

libroCtrl.deleteLibro = async (req, res) => {
  try {
    await Libro.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'Libro eliminado.' });
  } catch (e) {
    console.error(e);
  } finally {
    res.json({ message: 'Ha ocurrido un error al eliminar el libro.' });
  }
};

module.exports = libroCtrl;
