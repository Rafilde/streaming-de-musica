const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Usuario {
    id: ID!
    nome: String!
    idade: Int
  }

  type Playlist {
    id: ID!
    nome: String!
    usuario_id: ID!
    usuario: Usuario
  }

  type Musica {
    id: ID!
    nome: String!
    artista: String!
  }

  type PlaylistMusica {
    id: ID!
    playlist_id: Int!
    musica_id: Int!
    playlist: Playlist
    musica: Musica
  }

  input UsuarioInput {
    id: ID!
    nome: String!
    idade: Int
  }

  input UsuarioUpdateInput {
    nome: String
    idade: Int
  }

  input PlaylistInput {
    nome: String!
    usuario_id: ID!
  }

  input PlaylistUpdateInput {
    nome: String
    usuario_id: ID
  }

  input MusicaInput {
    nome: String!
    artista: String!
  }

  input MusicaUpdateInput {
    nome: String
    artista: String
  }

  input PlaylistMusicaInput {
    playlist_id: Int!
    musica_id: Int!
  }

  input PlaylistMusicaUpdateInput {
    playlist_id: Int
    musica_id: Int
  }

  type Query {
    # Usuario queries
    usuarios: [Usuario!]!
    usuario(id: ID!): Usuario

    # Playlist queries
    playlists: [Playlist!]!
    playlist(id: ID!): Playlist

    # Musica queries
    musicas: [Musica!]!
    musica(id: ID!): Musica

    # PlaylistMusica queries
    playlistMusicas: [PlaylistMusica!]!
    playlistMusica(id: ID!): PlaylistMusica
    musicasByPlaylist(playlist_id: Int!): [PlaylistMusica!]!
  }

  type Mutation {
    # Usuario mutations
    createUsuario(input: UsuarioInput!): Usuario!
    updateUsuario(id: ID!, input: UsuarioUpdateInput!): Usuario!
    deleteUsuario(id: ID!): Boolean!

    # Playlist mutations
    createPlaylist(input: PlaylistInput!): Playlist!
    updatePlaylist(id: ID!, input: PlaylistUpdateInput!): Playlist!
    deletePlaylist(id: ID!): Boolean!

    # Musica mutations
    createMusica(input: MusicaInput!): Musica!
    updateMusica(id: ID!, input: MusicaUpdateInput!): Musica!
    deleteMusica(id: ID!): Boolean!

    # PlaylistMusica mutations
    createPlaylistMusica(input: PlaylistMusicaInput!): PlaylistMusica!
    updatePlaylistMusica(id: ID!, input: PlaylistMusicaUpdateInput!): PlaylistMusica!
    deletePlaylistMusica(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
