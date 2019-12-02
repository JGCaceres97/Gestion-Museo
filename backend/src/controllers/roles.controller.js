const Rol = require('../models/Rol');
const rolCtrl = {};

rolCtrl.getRoles = async (req, res) => {
  try {
    const roles = await Rol.find();
    res.status(200).json(roles);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

rolCtrl.createRol = async (req, res) => {
  try {
    const { Nombre, Permisos, Descripcion } = req.body;
    const nuevoRol = new Rol({
      Nombre,
      Permisos,
      Descripcion
    });
    await nuevoRol.save();
    res.status(201).json({ message: 'Rol ingresado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al registrar el rol.' });
  }
};

rolCtrl.getRol = async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id);
    res.status(200).json(rol);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

rolCtrl.updateRol = async (req, res) => {
  try {
    const { Nombre, Permisos, Descripcion } = req.body;
    await Rol.findOneAndUpdate(
      { _id: req.params.id },
      {
        Nombre,
        Permisos,
        Descripcion
      }
    );
    res.status(200).json({ message: 'Rol actualizado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al actualizar el rol.' });
  }
};

rolCtrl.deleteRol = async (req, res) => {
  try {
    await Rol.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: 'Rol eliminado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al eliminar el rol.' });
  }
};

module.exports = rolCtrl;
