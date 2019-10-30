const { Router } = require('express');
const router = Router();

const {
  getRegistros,
  createRegistro
} = require('../controllers/bitacora.controller');

router.route('/api/bitacora')
  .get(getRegistros)
  .post(createRegistro);

module.exports = router;
