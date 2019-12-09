const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');

const {
  getDeptos,
  getDepto,
  createDepto,
  updateDepto,
  deleteDepto
} = require('../controllers/departamentos.controller');

router
  .route('/api/deptos')
  .get(getDeptos)
  .post(verifyToken, createDepto);

router
  .route('/api/deptos/:id')
  .get(verifyToken, getDepto)
  .put(verifyToken, updateDepto)
  .delete(verifyToken, deleteDepto);

module.exports = router;
