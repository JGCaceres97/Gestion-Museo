const Bitacora = require('../models/Bitacora');
const bitacoraCtrl = {};

bitacoraCtrl.getRegistros = async (req, res) => {
  const registros = await Bitacora.find().populate('IDUsuario').populate('IDSolicitud').populate('IDLibro');
  res.json(registros);
};

bitacoraCtrl.createRegistro = async (req, res) => {
  const {
    IDUsuario,
    IDSolicitud,
    IDLibro,
    IP,
    Accion
  } = req.body;
  const nuevoRegistro = new Bitacora({
    IDUsuario,
    IDSolicitud,
    IDLibro,
    IP,
    Accion,
    MarcaDeTiempo: Date.now()
  });
  await nuevoRegistro.save();
  res.json({ message: 'Registro ingresado.' });
};

module.exports = bitacoraCtrl;
