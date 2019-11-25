const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');

const {
  signUp,
  signIn,
  profile
} = require('../controllers/auth.controller');

router.post('/api/auth/signUp', signUp);
router.post('/api/auth/signIn', signIn);

router.get('/api/auth/perfil', verifyToken, profile);

module.exports = router;
