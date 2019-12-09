const Departamento = require('../models/Departamento');
const departamentoCtrl = {};
const { createRegistro } = require('./bitacora.controller');

departamentoCtrl.getDeptos = async (req, res) => {
  try {
    const departamentos = await Departamento.find();
    res.status(200).json(departamentos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

departamentoCtrl.createDepto = async (req, res) => {
  try {
    const { Nombre } = req.body;
    const nuevoDepartamento = new Departamento({
      Nombre
    });
    await nuevoDepartamento.save();

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Adición de departamento: ${Nombre}.`
    });

    res.status(201).json({ message: 'Departamento ingresado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al ingresar el departamento.' });
  }
};

departamentoCtrl.getDepto = async (req, res) => {
  try {
    const departamento = await Departamento.findById(req.params.id);

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Lectura de departamento: ${departamento.Nombre}.`
    });

    res.status(200).json(departamento);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

departamentoCtrl.updateDepto = async (req, res) => {
  try {
    const { Nombre } = req.body;
    const departamento = await Departamento.findOneAndUpdate({ _id: req.params.id }, { Nombre });

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Actualización de departamento: ${departamento.Nombre} a ${Nombre}.`
    });

    res.status(200).json({ message: 'Departamento actualizado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al actualizar el departamento.' });
  }
};

departamentoCtrl.deleteDepto = async (req, res) => {
  try {
    const departamento = await Departamento.findOneAndDelete({ _id: req.params.id });

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: `Eliminación de departamento: ${departamento.Nombre}.`
    });

    res.status(200).json({ message: 'Departamento eliminado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al eliminar el departamento.' });
  }
};

module.exports = departamentoCtrl;
