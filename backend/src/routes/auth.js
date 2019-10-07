const { Router } = require('express');
const router = Router();
const TokenValidation = require('../libs/verifyToken');

const {
  signUp,
  signIn,
  profile
} = require('../controllers/auth.controller');

router.post('/api/auth/registrar', signUp);
router.post('/api/auth/ingresar', signIn);

router.get('/api/auth/perfil', TokenValidation, profile);

module.exports = router;
