const { Router } = require('express');
const router = Router();

const {
  getSolicitudes,
  createSolicitud,
  getSolicitud,
  updateSolicitud,
  deleteSolicitud
} = require('../controllers/solicitud.controller');

router.route('/')
  .get(getSolicitudes)
  .post(createSolicitud);

router.route('/:id')
  .get(getSolicitud)
  .put(updateSolicitud)
  .delete(deleteSolicitud);

module.exports = router;
