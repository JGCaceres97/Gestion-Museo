const { Router } = require('express');
const router = Router();
const verifyToken = require('../controllers/verifyToken');

const {
  getEstados,
  getEstado,
  createEstado,
  updateEstado,
  deleteEstado
} = require('../controllers/estados.controller');

router.route('/api/estados')
  .get(verifyToken, getEstados)
  .post(verifyToken, createEstado);

router.route('/api/estados/:id')
  .get(verifyToken, getEstado)
  .put(verifyToken, updateEstado)
  .delete(verifyToken, deleteEstado);

module.exports = router;
