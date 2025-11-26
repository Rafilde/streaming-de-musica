// REST API Examples

const BASE_URL = 'http://localhost:3000/api';

// Example 1: Create a new musica
async function createMusica() {
  const response = await fetch(`${BASE_URL}/musicas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome: 'Bohemian Rhapsody',
      artista: 'Queen'
    })
  });
  
  const data = await response.json();
  console.log('Created musica:', data);
  return data;
}

// Example 2: Get all musicas
async function getMusicas() {
  const response = await fetch(`${BASE_URL}/musicas`);
  const data = await response.json();
  console.log('All musicas:', data);
  return data;
}

// Example 3: Get specific musica
async function getMusica(id) {
  const response = await fetch(`${BASE_URL}/musicas/${id}`);
  const data = await response.json();
  console.log('Musica:', data);
  return data;
}

// Example 4: Update musica
async function updateMusica(id) {
  const response = await fetch(`${BASE_URL}/musicas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome: 'Bohemian Rhapsody (Remastered)',
      artista: 'Queen'
    })
  });
  
  const data = await response.json();
  console.log('Updated musica:', data);
  return data;
}

// Example 5: Delete musica
async function deleteMusica(id) {
  const response = await fetch(`${BASE_URL}/musicas/${id}`, {
    method: 'DELETE'
  });
  
  console.log('Deleted musica:', response.status === 204 ? 'Success' : 'Failed');
}

// Example 6: Create playlist
async function createPlaylist(usuarioId) {
  const response = await fetch(`${BASE_URL}/playlists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome: 'Rock Classics',
      usuario_id: usuarioId
    })
  });
  
  const data = await response.json();
  console.log('Created playlist:', data);
  return data;
}

// Example 7: Add music to playlist
async function addMusicToPlaylist(playlistId, musicaId) {
  const response = await fetch(`${BASE_URL}/playlist-musicas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      playlist_id: playlistId,
      musica_id: musicaId
    })
  });
  
  const data = await response.json();
  console.log('Added music to playlist:', data);
  return data;
}

// Example 8: Get musicas from playlist
async function getMusicasFromPlaylist(playlistId) {
  const response = await fetch(`${BASE_URL}/playlist-musicas/playlist/${playlistId}`);
  const data = await response.json();
  console.log('Musicas in playlist:', data);
  return data;
}

// Run examples
async function runExamples() {
  try {
    // await createMusica();
    // await getMusicas();
    // await getMusica(1);
    // await updateMusica(1);
    // await deleteMusica(1);
    
    console.log('Uncomment the examples you want to run');
  } catch (error) {
    console.error('Error:', error);
  }
}

runExamples();
