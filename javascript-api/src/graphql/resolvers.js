const supabase = require('../config/supabase');

const resolvers = {
  Query: {
    // Usuario queries
    usuarios: async () => {
      const { data, error } = await supabase.from('usuario').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
    usuario: async (_, { id }) => {
      const { data, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },

    // Playlist queries
    playlists: async () => {
      const { data, error } = await supabase.from('playlist').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
    playlist: async (_, { id }) => {
      const { data, error } = await supabase
        .from('playlist')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },

    // Musica queries
    musicas: async () => {
      const { data, error } = await supabase.from('musica').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
    musica: async (_, { id }) => {
      const { data, error } = await supabase
        .from('musica')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },

    // PlaylistMusica queries
    playlistMusicas: async () => {
      const { data, error } = await supabase.from('playlist_musica').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
    playlistMusica: async (_, { id }) => {
      const { data, error } = await supabase
        .from('playlist_musica')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    musicasByPlaylist: async (_, { playlist_id }) => {
      const { data, error } = await supabase
        .from('playlist_musica')
        .select('*, musica(*), playlist(*)')
        .eq('playlist_id', playlist_id);
      if (error) throw new Error(error.message);
      return data;
    }
  },

  Mutation: {
    // Usuario mutations
    createUsuario: async (_, { input }) => {
      const { data, error } = await supabase
        .from('usuario')
        .insert([input])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    updateUsuario: async (_, { id, input }) => {
      const { data, error } = await supabase
        .from('usuario')
        .update(input)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    deleteUsuario: async (_, { id }) => {
      const { error } = await supabase.from('usuario').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    },

    // Playlist mutations
    createPlaylist: async (_, { input }) => {
      const { data, error } = await supabase
        .from('playlist')
        .insert([input])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    updatePlaylist: async (_, { id, input }) => {
      const { data, error } = await supabase
        .from('playlist')
        .update(input)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    deletePlaylist: async (_, { id }) => {
      const { error } = await supabase.from('playlist').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    },

    // Musica mutations
    createMusica: async (_, { input }) => {
      const { data, error } = await supabase
        .from('musica')
        .insert([input])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    updateMusica: async (_, { id, input }) => {
      const { data, error } = await supabase
        .from('musica')
        .update(input)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    deleteMusica: async (_, { id }) => {
      const { error } = await supabase.from('musica').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    },

    // PlaylistMusica mutations
    createPlaylistMusica: async (_, { input }) => {
      const { data, error } = await supabase
        .from('playlist_musica')
        .insert([input])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    updatePlaylistMusica: async (_, { id, input }) => {
      const { data, error } = await supabase
        .from('playlist_musica')
        .update(input)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    deletePlaylistMusica: async (_, { id }) => {
      const { error } = await supabase.from('playlist_musica').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    }
  },

  // Field resolvers
  Playlist: {
    usuario: async (parent) => {
      const { data, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('id', parent.usuario_id)
        .single();
      if (error) return null;
      return data;
    }
  },

  PlaylistMusica: {
    playlist: async (parent) => {
      const { data, error } = await supabase
        .from('playlist')
        .select('*')
        .eq('id', parent.playlist_id)
        .single();
      if (error) return null;
      return data;
    },
    musica: async (parent) => {
      const { data, error } = await supabase
        .from('musica')
        .select('*')
        .eq('id', parent.musica_id)
        .single();
      if (error) return null;
      return data;
    }
  }
};

module.exports = resolvers;
