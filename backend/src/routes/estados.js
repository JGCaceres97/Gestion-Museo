const { Router } = require('express');
const router = Router();

const {
  getEstados,
  getEstado,
  createEstado,
  updateEstado,
  deleteEstado
} = require('../controllers/estados.controller');

router.route('/api/estados')
  .get(getEstados)
  .post(createEstado);

router.route('/api/estados/:id')
  .get(getEstado)
  .put(updateEstado)
  .delete(deleteEstado);

module.exports = router;