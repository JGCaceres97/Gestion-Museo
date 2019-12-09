const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');

const { signIn, signOut } = require('../controllers/usuarios.controller');

router.post('/api/signIn', signIn);
router.get('/api/signOut', verifyToken, signOut);

module.exports = router;
