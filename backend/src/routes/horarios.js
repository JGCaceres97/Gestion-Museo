const { Router } = require('express');
const router = Router();
const verifyToken = require('../controllers/verifyToken');

const {
  getHorarios,
  getHorario,
  createHorario,
  updateHorario,
  deleteHorario
} = require('../controllers/horarios.controller');

router.route('/api/horarios')
  .get(getHorarios)
  .post(verifyToken, createHorario);

router.route('/api/horarios/:id')
  .get(verifyToken, getHorario)
  .put(verifyToken, updateHorario)
  .delete(verifyToken, deleteHorario);

module.exports = router;
