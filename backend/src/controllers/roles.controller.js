const Rol = require('../models/Rol');
const rolCtrl = {};
const { createRegistro } = require('./bitacora.controller');

rolCtrl.getRoles = async (req, res) => {
  try {
    const roles = await Rol.find();

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: 'Lectura de listado de roles.'
    });

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

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Adición de rol: ${Nombre}.`
    });

    res.status(201).json({ message: 'Rol ingresado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al registrar el rol.' });
  }
};

rolCtrl.getRol = async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id);

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Lectura de rol: ${rol.Nombre}.`
    });

    res.status(200).json(rol);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

rolCtrl.updateRol = async (req, res) => {
  try {
    const { Nombre, Permisos, Descripcion } = req.body;
    const rol = await Rol.findOneAndUpdate(
      { _id: req.params.id },
      {
        Nombre,
        Permisos,
        Descripcion
      }
    );

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Actualización de rol: ${rol.Nombre}.`
    });

    res.status(200).json({ message: 'Rol actualizado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al actualizar el rol.' });
  }
};

rolCtrl.deleteRol = async (req, res) => {
  try {
    const rol = await Rol.findOneAndDelete({ _id: req.params.id });

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Eliminación de rol: ${rol.Nombre}.`
    });

    res.status(200).json({ message: 'Rol eliminado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al eliminar el rol.' });
  }
};

module.exports = rolCtrl;
