const supabase = require('../../config/supabase');

// Create
const createUsuario = async (req, res) => {
  try {
    const { id, nome, idade } = req.body;
    const { data, error } = await supabase
      .from('usuario')
      .insert([{ id, nome, idade }])
      .select();
    
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all
const getUsuarios = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('usuario')
      .select('*');
    
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read one
const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('usuario')
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
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade } = req.body;
    const { data, error } = await supabase
      .from('usuario')
      .update({ nome, idade })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('usuario')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuario,
  updateUsuario,
  deleteUsuario
};
