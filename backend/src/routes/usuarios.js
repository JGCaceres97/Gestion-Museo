const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');

const {
  forgotPassword,
  getUsuarios,
  profile,
  updateUsuario,
  deleteUsuario,
  reset,
  signUp,
  updatePassword,
  getCantidadUsuarios
} = require('../controllers/usuarios.controller');

router
  .route('/api/usuarios')
  .get(verifyToken, getUsuarios)
  .post(verifyToken, signUp);

router
  .route('/api/usuarios/:id')
  .get(verifyToken, profile)
  .put(verifyToken, updateUsuario)
  .delete(verifyToken, deleteUsuario);

router.post('/api/forgotPassword', forgotPassword);
router.post('/api/reset', reset);
router.put('/api/updatePassword', updatePassword);
router.get('/api/cantidadUsuarios', getCantidadUsuarios);

module.exports = router;
