const { Router } = require('express');
const router = Router();
const verifyToken = require('../controllers/verifyToken');

const {
  signUp,
  signIn,
  profile
} = require('../controllers/auth.controller');

router.post('/api/auth/registrar', signUp);
router.post('/api/auth/ingresar', signIn);

router.get('/api/auth/perfil', verifyToken, profile);

module.exports = router;
