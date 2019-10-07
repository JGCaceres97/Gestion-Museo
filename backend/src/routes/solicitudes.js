const { Router } = require('express');
const router = Router();

const {
  getSolicitudes,
  createSolicitud,
  getSolicitud,
  updateSolicitud,
  deleteSolicitud
} = require('../controllers/solicitudes.controller');

router.route('/api/solicitudes')
  .get(getSolicitudes)
  .post(createSolicitud);

router.route('/api/solicitudes/:id')
  .get(getSolicitud)
  .put(updateSolicitud)
  .delete(deleteSolicitud);

module.exports = router;
