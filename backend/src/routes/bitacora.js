const { Router } = require('express');
const router = Router();
const verifyToken = require('../controllers/verifyToken');

const {
  getRegistros,
  createRegistro
} = require('../controllers/bitacora.controller');

router.route('/api/bitacora')
  .get(verifyToken, getRegistros)
  .post(verifyToken, createRegistro);

module.exports = router;
