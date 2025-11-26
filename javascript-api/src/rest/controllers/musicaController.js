const supabase = require('../../config/supabase');

// Create
const createMusica = async (req, res) => {
  try {
    const { nome, artista } = req.body;
    const { data, error } = await supabase
      .from('musica')
      .insert([{ nome, artista }])
      .select();
    
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all
const getMusicas = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('musica')
      .select('*');
    
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read one
const getMusica = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('musica')
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
const updateMusica = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, artista } = req.body;
    const { data, error } = await supabase
      .from('musica')
      .update({ nome, artista })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
const deleteMusica = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('musica')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createMusica,
  getMusicas,
  getMusica,
  updateMusica,
  deleteMusica
};
