const supabase = require('../../config/supabase');

// Create
const createPlaylist = async (req, res) => {
  try {
    const { nome, usuario_id } = req.body;
    const { data, error } = await supabase
      .from('playlist')
      .insert([{ nome, usuario_id }])
      .select();
    
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all
const getPlaylists = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('playlist')
      .select('*');
    
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read one
const getPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('playlist')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update
const updatePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, usuario_id } = req.body;
    const { data, error } = await supabase
      .from('playlist')
      .update({ nome, usuario_id })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('playlist')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPlaylist,
  getPlaylists,
  getPlaylist,
  updatePlaylist,
  deletePlaylist
};
