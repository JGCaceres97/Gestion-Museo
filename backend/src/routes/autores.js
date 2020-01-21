const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');

const {
  getAutores,
  getAutor,
  createAutor,
  updateAutor,
  deleteAutor
} = require('../controllers/autores.controller');

router
  .route('/api/autores')
  .get(verifyToken, getAutores)
  .post(verifyToken, createAutor);

router
  .route('/api/autores/:id')
  .get(verifyToken, getAutor)
  .put(verifyToken, updateAutor)
  .delete(verifyToken, deleteAutor);

module.exports = router;
