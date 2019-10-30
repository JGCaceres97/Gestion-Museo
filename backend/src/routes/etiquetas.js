const { Router } = require('express');
const router = Router();

const {
  getEtiquetas,
  getEtiqueta,
  createEtiqueta,
  updateEtiqueta,
  deleteEtiqueta
} = require('../controllers/etiquetas.controller');

router.route('/api/etiquetas')
  .get(getEtiquetas)
  .post(createEtiqueta);

router.route('/api/etiquetas/:id')
  .get(getEtiqueta)
  .put(updateEtiqueta)
  .delete(deleteEtiqueta);

module.exports = router;
