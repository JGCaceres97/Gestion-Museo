const Bitacora = require('../models/Bitacora');
const bitacoraCtrl = {};

bitacoraCtrl.getRegistros = async (req, res) => {
  try {
    const registros = await Bitacora.find().populate('IDUsuario').populate('IDSolicitud').populate('IDLibro');
    res.json(registros);
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

bitacoraCtrl.createRegistro = async (req, res) => {
  try {
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
  } catch (e) {
    console.error(e);
    res.json({ message: 'Ha ocurrido un error al ingresar el registro.' });
  }
};

module.exports = bitacoraCtrl;
