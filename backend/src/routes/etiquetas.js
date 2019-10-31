const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');

const {
  getEtiquetas,
  getEtiqueta,
  createEtiqueta,
  updateEtiqueta,
  deleteEtiqueta
} = require('../controllers/etiquetas.controller');

router.route('/api/etiquetas')
  .get(verifyToken, getEtiquetas)
  .post(verifyToken, createEtiqueta);

router.route('/api/etiquetas/:id')
  .get(verifyToken, getEtiqueta)
  .put(verifyToken, updateEtiqueta)
  .delete(verifyToken, deleteEtiqueta);

module.exports = router;
