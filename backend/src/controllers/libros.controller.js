const Libro = require('../models/Libro');
const libroCtrl = {};
const { createRegistro } = require('./bitacora.controller');

libroCtrl.getLibros = async (req, res) => {
  try {
    const libros = await Libro.find()
      .populate('IDAutor')
      .populate('IDEtiquetas');

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: 'Lectura de listado de libros.'
    });

    res.status(200).json(libros);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

libroCtrl.createLibro = async (req, res) => {
  try {
    const { IDAutor, Titulo, Sinopsis, Año, ISBN, Editorial, IDEtiquetas } = req.body;
    const nuevoLibro = new Libro({
      IDAutor,
      Titulo,
      Sinopsis,
      Año,
      ISBN,
      Editorial,
      IDEtiquetas
    });
    await nuevoLibro.save();

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Adición de libro: ${Titulo}, ${ISBN}.`
    });

    res.status(201).json({ message: 'Libro ingresado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al registrar el libro.' });
  }
};

libroCtrl.getLibro = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id)
      .populate('IDAutor')
      .populate('IDEtiquetas');

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Lectura de libro: ${libro.Titulo}, ${libro.IDAutor.Nombre}.`
    });

    res.status(200).json(libro);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

libroCtrl.updateLibro = async (req, res) => {
  try {
    const { IDAutor, Titulo, Sinopsis, Año, ISBN, Editorial, IDEtiquetas } = req.body;
    const libro = await Libro.findOneAndUpdate(
      { _id: req.params.id },
      {
        IDAutor,
        Titulo,
        Sinopsis,
        Año,
        ISBN,
        Editorial,
        IDEtiquetas
      }
    );

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Actualización de libro: ${libro.Titulo}, ${libro.IDAutor.Nombre}.`
    });

    res.status(200).json({ message: 'Libro actualizado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al actualizar el libro.' });
  }
};

libroCtrl.deleteLibro = async (req, res) => {
  try {
    const libro = await Libro.findOneAndDelete({ _id: req.params.id });

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Eliminación de libro: ${libro.Titulo}, ${libro.IDAutor.Nombre}.`
    });

    res.status(200).json({ message: 'Libro eliminado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al eliminar el libro.' });
  }
};

module.exports = libroCtrl;
