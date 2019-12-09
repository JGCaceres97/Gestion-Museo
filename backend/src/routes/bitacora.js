const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');

const { getRegistros } = require('../controllers/bitacora.controller');

router.get('/api/bitacora', verifyToken, getRegistros);

module.exports = router;
