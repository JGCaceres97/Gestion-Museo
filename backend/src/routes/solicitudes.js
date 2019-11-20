const { Router } = require('express');
const router = Router();
const fileHandler = require('../middlewares/fileHandler');
const verifyToken = require('../middlewares/verifyToken');

const {
  getSolicitudes,
  createSolicitud,
  getSolicitud,
  updateSolicitud,
  deleteSolicitud
} = require('../controllers/solicitudes.controller');

router.route('/api/solicitudes')
  .get(verifyToken, getSolicitudes)
  .post(fileHandler.array('Adjuntos', 2), createSolicitud);

router.route('/api/solicitudes/:id')
  .get(verifyToken, getSolicitud)
  .put(verifyToken, updateSolicitud)
  .delete(verifyToken, deleteSolicitud);

module.exports = router;
