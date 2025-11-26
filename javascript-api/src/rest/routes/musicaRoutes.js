const express = require('express');
const router = express.Router();
const {
  createMusica,
  getMusicas,
  getMusica,
  updateMusica,
  deleteMusica
} = require('../controllers/musicaController');

router.post('/', createMusica);
router.get('/', getMusicas);
router.get('/:id', getMusica);
router.put('/:id', updateMusica);
router.delete('/:id', deleteMusica);

module.exports = router;
