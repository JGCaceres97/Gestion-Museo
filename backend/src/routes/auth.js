const { Router } = require('express');
const router = Router();

const { signIn } = require('../controllers/usuarios.controller');

router.post('/api/signIn', signIn);

module.exports = router;
