const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');

const {
  getLibros,
  getLibro,
  createLibro,
  updateLibro,
  deleteLibro
} = require('../controllers/libros.controller');

router.route('/api/libros')
  .get(verifyToken, getLibros)
  .post(verifyToken, createLibro);

router.route('/api/libros/:id')
  .get(verifyToken, getLibro)
  .put(verifyToken, updateLibro)
  .delete(verifyToken, deleteLibro);

module.exports = router;
