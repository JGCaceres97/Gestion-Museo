const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');

const {
  getMunicipios,
  getMunicipio,
  createMunicipio,
  updateMunicipio,
  deleteMunicipio
} = require('../controllers/municipios.controller');

router
  .route('/api/municipios')
  .get(verifyToken, getMunicipios)
  .post(verifyToken, createMunicipio);

router
  .route('/api/municipios/:id')
  .get(verifyToken, getMunicipio)
  .put(verifyToken, updateMunicipio)
  .delete(verifyToken, deleteMunicipio);

module.exports = router;
