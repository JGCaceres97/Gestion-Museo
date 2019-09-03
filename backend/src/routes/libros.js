const { Router } = require('express');
const router = Router();

const {
  getLibros,
  getLibro,
  createLibro,
  updateLibro,
  deleteLibro
} = require('../controllers/libros.controller');

router.route('/')
  .get(getLibros)
  .post(createLibro);

router.route('/:id')
  .get(getLibro)
  .put(updateLibro)
  .delete(deleteLibro);

module.exports = router;
