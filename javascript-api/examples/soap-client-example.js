const soap = require('soap');

const WSDL_URL = 'http://localhost:5000/wsdl?wsdl';

// Example 1: Get all musicas
async function getMusicas() {
  try {
    const client = await soap.createClientAsync(WSDL_URL);
    const result = await client.getMusicasAsync({});
    console.log('Musicas:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 2: Create musica
async function createMusica() {
  try {
    const client = await soap.createClientAsync(WSDL_URL);
    const result = await client.createMusicaAsync({
      nome: 'Stairway to Heaven',
      artista: 'Led Zeppelin'
    });
    console.log('Created musica:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 3: Get specific musica
async function getMusica(id) {
  try {
    const client = await soap.createClientAsync(WSDL_URL);
    const result = await client.getMusicaAsync({ id });
    console.log('Musica:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 4: Update musica
async function updateMusica(id) {
  try {
    const client = await soap.createClientAsync(WSDL_URL);
    const result = await client.updateMusicaAsync({
      id,
      nome: 'Stairway to Heaven (Remastered)',
      artista: 'Led Zeppelin'
    });
    console.log('Updated musica:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 5: Delete musica
async function deleteMusica(id) {
  try {
    const client = await soap.createClientAsync(WSDL_URL);
    const result = await client.deleteMusicaAsync({ id });
    console.log('Deleted musica:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 6: Get all playlists
async function getPlaylists() {
  try {
    const client = await soap.createClientAsync(WSDL_URL);
    const result = await client.getPlaylistsAsync({});
    console.log('Playlists:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 7: Create playlist
async function createPlaylist(usuarioId) {
  try {
    const client = await soap.createClientAsync(WSDL_URL);
    const result = await client.createPlaylistAsync({
      nome: 'Classic Rock Hits',
      usuario_id: usuarioId
    });
    console.log('Created playlist:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 8: Add music to playlist
async function addMusicToPlaylist(playlistId, musicaId) {
  try {
    const client = await soap.createClientAsync(WSDL_URL);
    const result = await client.createPlaylistMusicaAsync({
      playlist_id: playlistId,
      musica_id: musicaId
    });
    console.log('Added music to playlist:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 9: Get musicas by playlist
async function getMusicasByPlaylist(playlistId) {
  try {
    const client = await soap.createClientAsync(WSDL_URL);
    const result = await client.getMusicasByPlaylistAsync({
      playlist_id: playlistId
    });
    console.log('Musicas in playlist:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run examples
async function runExamples() {
  console.log('SOAP Client Examples\n');
  
  // Uncomment the examples you want to run
  // await getMusicas();
  // await createMusica();
  // await getMusica(1);
  // await updateMusica(1);
  // await deleteMusica(1);
  // await getPlaylists();
  // await createPlaylist('uuid-aqui');
  // await addMusicToPlaylist(1, 1);
  // await getMusicasByPlaylist(1);
  
  console.log('Uncomment the examples you want to run');
}

runExamples();
