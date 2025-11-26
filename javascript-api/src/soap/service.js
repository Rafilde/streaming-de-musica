const supabase = require('../config/supabase');

const soapService = {
  MusicStreamingService: {
    MusicStreamingServiceSoapPort: {
      // Usuario operations
      createUsuario: async (args) => {
        try {
          const { id, nome, idade } = args;
          const { data, error } = await supabase
            .from('usuario')
            .insert([{ id, nome, idade }])
            .select();
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      getUsuarios: async () => {
        try {
          const { data, error } = await supabase.from('usuario').select('*');
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      getUsuario: async (args) => {
        try {
          const { id } = args;
          const { data, error } = await supabase
            .from('usuario')
            .select('*')
            .eq('id', id)
            .single();
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      updateUsuario: async (args) => {
        try {
          const { id, nome, idade } = args;
          const { data, error } = await supabase
            .from('usuario')
            .update({ nome, idade })
            .eq('id', id)
            .select();
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      deleteUsuario: async (args) => {
        try {
          const { id } = args;
          const { error } = await supabase.from('usuario').delete().eq('id', id);
          if (error) throw error;
          return { result: 'Usuario deleted successfully' };
        } catch (error) {
          return { error: error.message };
        }
      },

      // Playlist operations
      createPlaylist: async (args) => {
        try {
          const { nome, usuario_id } = args;
          const { data, error } = await supabase
            .from('playlist')
            .insert([{ nome, usuario_id }])
            .select();
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      getPlaylists: async () => {
        try {
          const { data, error } = await supabase.from('playlist').select('*');
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      getPlaylist: async (args) => {
        try {
          const { id } = args;
          const { data, error } = await supabase
            .from('playlist')
            .select('*')
            .eq('id', id)
            .single();
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      updatePlaylist: async (args) => {
        try {
          const { id, nome, usuario_id } = args;
          const { data, error } = await supabase
            .from('playlist')
            .update({ nome, usuario_id })
            .eq('id', id)
            .select();
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      deletePlaylist: async (args) => {
        try {
          const { id } = args;
          const { error } = await supabase.from('playlist').delete().eq('id', id);
          if (error) throw error;
          return { result: 'Playlist deleted successfully' };
        } catch (error) {
          return { error: error.message };
        }
      },

      // Musica operations
      createMusica: async (args) => {
        try {
          const { nome, artista } = args;
          const { data, error } = await supabase
            .from('musica')
            .insert([{ nome, artista }])
            .select();
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      getMusicas: async () => {
        try {
          const { data, error } = await supabase.from('musica').select('*');
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      getMusica: async (args) => {
        try {
          const { id } = args;
          const { data, error } = await supabase
            .from('musica')
            .select('*')
            .eq('id', id)
            .single();
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      updateMusica: async (args) => {
        try {
          const { id, nome, artista } = args;
          const { data, error } = await supabase
            .from('musica')
            .update({ nome, artista })
            .eq('id', id)
            .select();
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      deleteMusica: async (args) => {
        try {
          const { id } = args;
          const { error } = await supabase.from('musica').delete().eq('id', id);
          if (error) throw error;
          return { result: 'Musica deleted successfully' };
        } catch (error) {
          return { error: error.message };
        }
      },

      // PlaylistMusica operations
      createPlaylistMusica: async (args) => {
        try {
          const { playlist_id, musica_id } = args;
          const { data, error } = await supabase
            .from('playlist_musica')
            .insert([{ playlist_id, musica_id }])
            .select();
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      getPlaylistMusicas: async () => {
        try {
          const { data, error } = await supabase.from('playlist_musica').select('*');
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      getPlaylistMusica: async (args) => {
        try {
          const { id } = args;
          const { data, error } = await supabase
            .from('playlist_musica')
            .select('*')
            .eq('id', id)
            .single();
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      getMusicasByPlaylist: async (args) => {
        try {
          const { playlist_id } = args;
          const { data, error } = await supabase
            .from('playlist_musica')
            .select('*, musica(*)')
            .eq('playlist_id', playlist_id);
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      updatePlaylistMusica: async (args) => {
        try {
          const { id, playlist_id, musica_id } = args;
          const { data, error } = await supabase
            .from('playlist_musica')
            .update({ playlist_id, musica_id })
            .eq('id', id)
            .select();
          if (error) throw error;
          return { result: JSON.stringify(data) };
        } catch (error) {
          return { error: error.message };
        }
      },

      deletePlaylistMusica: async (args) => {
        try {
          const { id } = args;
          const { error } = await supabase.from('playlist_musica').delete().eq('id', id);
          if (error) throw error;
          return { result: 'PlaylistMusica deleted successfully' };
        } catch (error) {
          return { error: error.message };
        }
      }
    }
  }
};

module.exports = soapService;
