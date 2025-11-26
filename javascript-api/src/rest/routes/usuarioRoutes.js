const express = require('express');
const router = express.Router();
const {
  createUsuario,
  getUsuarios,
  getUsuario,
  updateUsuario,
  deleteUsuario
} = require('../controllers/usuarioController');

router.post('/', createUsuario);
router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;
