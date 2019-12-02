const Departamento = require('../models/Departamento');
const departamentoCtrl = {};

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
    res.status(201).json({ message: 'Departamento ingresado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al ingresar el departamento.' });
  }
};

departamentoCtrl.getDepto = async (req, res) => {
  try {
    const departamento = await Departamento.findById(req.params.id);
    res.status(200).json(departamento);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

departamentoCtrl.updateDepto = async (req, res) => {
  try {
    const { Nombre } = req.body;
    await Departamento.findOneAndUpdate({ _id: req.params.id }, { Nombre });
    res.status(200).json({ message: 'Departamento actualizado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al actualizar el departamento.' });
  }
};

departamentoCtrl.deleteDepto = async (req, res) => {
  try {
    await Departamento.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: 'Departamento eliminado.' });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Ha ocurrido un error al eliminar el departamento.' });
  }
};

module.exports = departamentoCtrl;
