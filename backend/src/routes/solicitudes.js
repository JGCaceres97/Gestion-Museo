const { Router } = require('express');
const router = Router();
const verifyToken = require('../controllers/verifyToken');

const {
  getSolicitudes,
  createSolicitud,
  getSolicitud,
  updateSolicitud,
  deleteSolicitud
} = require('../controllers/solicitudes.controller');

router.route('/api/solicitudes')
  .get(verifyToken, getSolicitudes)
  .post(createSolicitud);

router.route('/api/solicitudes/:id')
  .get(verifyToken, getSolicitud)
  .put(verifyToken, updateSolicitud)
  .delete(verifyToken, deleteSolicitud);

module.exports = router;
