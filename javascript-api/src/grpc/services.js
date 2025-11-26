const supabase = require('../config/supabase');

// Usuario Service Implementation
const usuarioService = {
  CreateUsuario: async (call, callback) => {
    try {
      const { id, nome, idade } = call.request;
      const { data, error } = await supabase
        .from('usuario')
        .insert([{ id, nome, idade }])
        .select()
        .single();
      
      if (error) throw error;
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  },

  GetUsuarios: async (call, callback) => {
    try {
      const { data, error } = await supabase.from('usuario').select('*');
      if (error) throw error;
      callback(null, { usuarios: data });
    } catch (error) {
      callback(error);
    }
  },

  GetUsuario: async (call, callback) => {
    try {
      const { id } = call.request;
      const { data, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  },

  UpdateUsuario: async (call, callback) => {
    try {
      const { id, nome, idade } = call.request;
      const { data, error } = await supabase
        .from('usuario')
        .update({ nome, idade })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  },

  DeleteUsuario: async (call, callback) => {
    try {
      const { id } = call.request;
      const { error } = await supabase.from('usuario').delete().eq('id', id);
      
      if (error) throw error;
      callback(null, { success: true, message: 'Usuario deleted successfully' });
    } catch (error) {
      callback(error);
    }
  }
};

// Playlist Service Implementation
const playlistService = {
  CreatePlaylist: async (call, callback) => {
    try {
      const { nome, usuario_id } = call.request;
      const { data, error } = await supabase
        .from('playlist')
        .insert([{ nome, usuario_id }])
        .select()
        .single();
      
      if (error) throw error;
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  },

  GetPlaylists: async (call, callback) => {
    try {
      const { data, error } = await supabase.from('playlist').select('*');
      if (error) throw error;
      callback(null, { playlists: data });
    } catch (error) {
      callback(error);
    }
  },

  GetPlaylist: async (call, callback) => {
    try {
      const { id } = call.request;
      const { data, error } = await supabase
        .from('playlist')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  },

  UpdatePlaylist: async (call, callback) => {
    try {
      const { id, nome, usuario_id } = call.request;
      const { data, error } = await supabase
        .from('playlist')
        .update({ nome, usuario_id })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  },

  DeletePlaylist: async (call, callback) => {
    try {
      const { id } = call.request;
      const { error } = await supabase.from('playlist').delete().eq('id', id);
      
      if (error) throw error;
      callback(null, { success: true, message: 'Playlist deleted successfully' });
    } catch (error) {
      callback(error);
    }
  }
};

// Musica Service Implementation
const musicaService = {
  CreateMusica: async (call, callback) => {
    try {
      const { nome, artista } = call.request;
      const { data, error } = await supabase
        .from('musica')
        .insert([{ nome, artista }])
        .select()
        .single();
      
      if (error) throw error;
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  },

  GetMusicas: async (call, callback) => {
    try {
      const { data, error } = await supabase.from('musica').select('*');
      if (error) throw error;
      callback(null, { musicas: data });
    } catch (error) {
      callback(error);
    }
  },

  GetMusica: async (call, callback) => {
    try {
      const { id } = call.request;
      const { data, error } = await supabase
        .from('musica')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  },

  UpdateMusica: async (call, callback) => {
    try {
      const { id, nome, artista } = call.request;
      const { data, error } = await supabase
        .from('musica')
        .update({ nome, artista })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  },

  DeleteMusica: async (call, callback) => {
    try {
      const { id } = call.request;
      const { error } = await supabase.from('musica').delete().eq('id', id);
      
      if (error) throw error;
      callback(null, { success: true, message: 'Musica deleted successfully' });
    } catch (error) {
      callback(error);
    }
  }
};

// PlaylistMusica Service Implementation
const playlistMusicaService = {
  CreatePlaylistMusica: async (call, callback) => {
    try {
      const { playlist_id, musica_id } = call.request;
      const { data, error } = await supabase
        .from('playlist_musica')
        .insert([{ playlist_id, musica_id }])
        .select()
        .single();
      
      if (error) throw error;
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  },

  GetPlaylistMusicas: async (call, callback) => {
    try {
      const { data, error } = await supabase.from('playlist_musica').select('*');
      if (error) throw error;
      callback(null, { playlistMusicas: data });
    } catch (error) {
      callback(error);
    }
  },

  GetPlaylistMusica: async (call, callback) => {
    try {
      const { id } = call.request;
      const { data, error } = await supabase
        .from('playlist_musica')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  },

  GetMusicasByPlaylist: async (call, callback) => {
    try {
      const { playlist_id } = call.request;
      const { data, error } = await supabase
        .from('playlist_musica')
        .select('*')
        .eq('playlist_id', playlist_id);
      
      if (error) throw error;
      callback(null, { playlistMusicas: data });
    } catch (error) {
      callback(error);
    }
  },

  UpdatePlaylistMusica: async (call, callback) => {
    try {
      const { id, playlist_id, musica_id } = call.request;
      const { data, error } = await supabase
        .from('playlist_musica')
        .update({ playlist_id, musica_id })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  },

  DeletePlaylistMusica: async (call, callback) => {
    try {
      const { id } = call.request;
      const { error } = await supabase.from('playlist_musica').delete().eq('id', id);
      
      if (error) throw error;
      callback(null, { success: true, message: 'PlaylistMusica deleted successfully' });
    } catch (error) {
      callback(error);
    }
  }
};

module.exports = {
  usuarioService,
  playlistService,
  musicaService,
  playlistMusicaService
};
