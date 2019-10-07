const { Router } = require('express');
const router = Router();

const {
  getLibros,
  getLibro,
  createLibro,
  updateLibro,
  deleteLibro
} = require('../controllers/libros.controller');

router.route('/api/libros')
  .get(getLibros)
  .post(createLibro);

router.route('/api/libros/:id')
  .get(getLibro)
  .put(updateLibro)
  .delete(deleteLibro);

module.exports = router;
