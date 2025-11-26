const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

const usuarioRoutes = require('./routes/usuarioRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const musicaRoutes = require('./routes/musicaRoutes');
const playlistMusicaRoutes = require('./routes/playlistMusicaRoutes');

const app = express();
const PORT = process.env.REST_PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/musicas', musicaRoutes);
app.use('/api/playlist-musicas', playlistMusicaRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Music Streaming REST API',
    endpoints: {
      usuarios: '/api/usuarios',
      playlists: '/api/playlists',
      musicas: '/api/musicas',
      playlistMusicas: '/api/playlist-musicas'
    }
  });
});

app.listen(PORT, () => {
  console.log(`REST API running on http://localhost:${PORT}`);
});

module.exports = app;
