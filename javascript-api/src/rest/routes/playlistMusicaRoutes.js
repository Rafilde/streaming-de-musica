const express = require('express');
const router = express.Router();
const {
  createPlaylistMusica,
  getPlaylistMusicas,
  getPlaylistMusica,
  getMusicasByPlaylist,
  updatePlaylistMusica,
  deletePlaylistMusica
} = require('../controllers/playlistMusicaController');

router.post('/', createPlaylistMusica);
router.get('/', getPlaylistMusicas);
router.get('/:id', getPlaylistMusica);
router.get('/playlist/:playlist_id', getMusicasByPlaylist);
router.put('/:id', updatePlaylistMusica);
router.delete('/:id', deletePlaylistMusica);

module.exports = router;
