const express = require('express');
const router = express.Router();
const {
  createPlaylist,
  getPlaylists,
  getPlaylist,
  updatePlaylist,
  deletePlaylist
} = require('../controllers/playlistController');

router.post('/', createPlaylist);
router.get('/', getPlaylists);
router.get('/:id', getPlaylist);
router.put('/:id', updatePlaylist);
router.delete('/:id', deletePlaylist);

module.exports = router;
