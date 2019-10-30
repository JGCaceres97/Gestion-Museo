const { Router } = require('express');
const router = Router();

const {
  getRoles,
  getRol,
  createRol,
  updateRol,
  deleteRol
} = require('../controllers/roles.controller');

router.route('/api/roles')
  .get(getRoles)
  .post(createRol);

router.route('/api/roles')
  .get(getRol)
  .put(updateRol)
  .delete(deleteRol);

module.exports = router;
