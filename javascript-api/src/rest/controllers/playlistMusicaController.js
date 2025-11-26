const supabase = require('../../config/supabase');

// Create
const createPlaylistMusica = async (req, res) => {
  try {
    const { playlist_id, musica_id } = req.body;
    const { data, error } = await supabase
      .from('playlist_musica')
      .insert([{ playlist_id, musica_id }])
      .select();
    
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all
const getPlaylistMusicas = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('playlist_musica')
      .select('*');
    
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read one
const getPlaylistMusica = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('playlist_musica')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Read by playlist
const getMusicasByPlaylist = async (req, res) => {
  try {
    const { playlist_id } = req.params;
    const { data, error } = await supabase
      .from('playlist_musica')
      .select('*, musica(*)')
      .eq('playlist_id', playlist_id);
    
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update
const updatePlaylistMusica = async (req, res) => {
  try {
    const { id } = req.params;
    const { playlist_id, musica_id } = req.body;
    const { data, error } = await supabase
      .from('playlist_musica')
      .update({ playlist_id, musica_id })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
const deletePlaylistMusica = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('playlist_musica')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPlaylistMusica,
  getPlaylistMusicas,
  getPlaylistMusica,
  getMusicasByPlaylist,
  updatePlaylistMusica,
  deletePlaylistMusica
};
