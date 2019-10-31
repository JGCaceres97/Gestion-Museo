const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');

const {
  getRoles,
  getRol,
  createRol,
  updateRol,
  deleteRol
} = require('../controllers/roles.controller');

router.route('/api/roles')
  .get(verifyToken, getRoles)
  .post(verifyToken, createRol);

router.route('/api/roles')
  .get(verifyToken, getRol)
  .put(verifyToken, updateRol)
  .delete(verifyToken, deleteRol);

module.exports = router;
