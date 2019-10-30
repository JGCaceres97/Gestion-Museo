const { Router } = require('express');
const router = Router();

const {
  getHorarios,
  getHorario,
  createHorario,
  updateHorario,
  deleteHorario
} = require('../controllers/horarios.controller');

router.route('/api/horarios')
  .get(getHorarios)
  .post(createHorario);

router.route('/api/horarios/:id')
  .get(getHorario)
  .put(updateHorario)
  .delete(deleteHorario);

module.exports = router;
