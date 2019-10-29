const Rol = require('../models/Rol');
const rolCtrl = {};

rolCtrl.getRoles = async (req, res) => {
  const roles = await Rol.find();
  res.json(roles);
};

rolCtrl.createRol = async (req, res) => {
  const {
    Nombre,
    Permisos,
    Descripcion
  } = req.body;
  const nuevoRol = new Rol({
    Nombre,
    Permisos,
    Descripcion
  });
  await nuevoRol.save();
  res.json({ message: 'Rol ingresado.' });
};

rolCtrl.getRol = async (req, res) => {
  const rol = await Rol.findById(req.params.id);
  res.json(rol);
};

rolCtrl.updateRol = async (req, res) => {
  const {
    Nombre,
    Permisos,
    Descripcion
  } = req.body;
  await Rol.findOneAndUpdate({ _id: req.params.id }, {
    Nombre,
    Permisos,
    Descripcion
  });
  res.json({ message: 'Rol actualizado.' });
};

rolCtrl.deleteRol = async (req, res) => {
  await Rol.findOneAndDelete({ _id: req.params.id });
  res.json({ message: 'Rol eliminado.' });
};

module.exports = rolCtrl;
