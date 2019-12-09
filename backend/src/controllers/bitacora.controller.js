const Bitacora = require('../models/Bitacora');
const bitacoraCtrl = {};

bitacoraCtrl.getRegistros = async (req, res) => {
  try {
    await bitacoraCtrl.createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: 'Lectura de bitácora.'
    });

    const registros = await Bitacora.find();
    res.status(200).json(registros);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ha ocurrido un error al realizar la consulta.' });
  }
};

bitacoraCtrl.createRegistro = async req => {
  try {
    const { IDUsuario, Email, IP, Accion } = req;

    const nuevoRegistro = new Bitacora({
      IDUsuario,
      Email,
      IP,
      Accion,
      MarcaDeTiempo: Date.now()
    });
    await nuevoRegistro.save();
  } catch (e) {
    console.error('Ha ocurrido un error al ingresar el registro en bitácora: ', e);
  }
};

module.exports = bitacoraCtrl;
