const Libro = require('../models/Libro');
const libroCtrl = {};
const {} = require('./bitacora.controller');

libroCtrl.getLibros = async (req, res) => {
  try {
    const libros = await Libro.find().populate('Etiquetas');

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
    const { Autor, Titulo, Descripcion, Año, ISBN, Editorial, Etiquetas } = req.body;
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

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Adición de libro: ${Titulo}, ${Autor}.`
    });

    res.status(201).json({ message: 'Libro ingresado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al registrar el libro.' });
  }
};

libroCtrl.getLibro = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id).populate('Etiquetas');

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Lectura de libro: ${libro.Titulo}, ${libro.Autor}.`
    });

    res.status(200).json(libro);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

libroCtrl.updateLibro = async (req, res) => {
  try {
    const { Autor, Titulo, Descripcion, Año, ISBN, Editorial, Etiquetas } = req.body;
    const libro = await Libro.findOneAndUpdate(
      { _id: req.params.id },
      {
        Autor,
        Titulo,
        Descripcion,
        Año,
        ISBN,
        Editorial,
        Etiquetas
      }
    );

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Actualización de libro: ${libro.Titulo}, ${libro.Autor}.`
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
      Accion: `Eliminación de libro: ${libro.Titulo}, ${libro.Autor}.`
    });

    res.status(200).json({ message: 'Libro eliminado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al eliminar el libro.' });
  }
};

module.exports = libroCtrl;
