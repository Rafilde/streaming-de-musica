# GraphQL API Examples

Use o GraphQL Playground em http://localhost:4000/graphql

## Queries

### Get all usuarios
```graphql
query {
  usuarios {
    id
    nome
    idade
  }
}
```

### Get specific usuario
```graphql
query {
  usuario(id: "uuid-aqui") {
    id
    nome
    idade
  }
}
```

### Get all playlists
```graphql
query {
  playlists {
    id
    nome
    usuario_id
    usuario {
      nome
    }
  }
}
```

### Get all musicas
```graphql
query {
  musicas {
    id
    nome
    artista
  }
}
```

### Get musicas from a playlist
```graphql
query {
  musicasByPlaylist(playlist_id: 1) {
    id
    musica {
      nome
      artista
    }
    playlist {
      nome
    }
  }
}
```

## Mutations

### Create Usuario
```graphql
mutation {
  createUsuario(input: {
    id: "uuid-aqui"
    nome: "João Silva"
    idade: 25
  }) {
    id
    nome
    idade
  }
}
```

### Update Usuario
```graphql
mutation {
  updateUsuario(id: "uuid-aqui", input: {
    nome: "João Silva Atualizado"
    idade: 26
  }) {
    id
    nome
    idade
  }
}
```

### Delete Usuario
```graphql
mutation {
  deleteUsuario(id: "uuid-aqui")
}
```

### Create Playlist
```graphql
mutation {
  createPlaylist(input: {
    nome: "Rock Classics"
    usuario_id: "uuid-aqui"
  }) {
    id
    nome
    usuario {
      nome
    }
  }
}
```

### Create Musica
```graphql
mutation {
  createMusica(input: {
    nome: "Bohemian Rhapsody"
    artista: "Queen"
  }) {
    id
    nome
    artista
  }
}
```

### Add Musica to Playlist
```graphql
mutation {
  createPlaylistMusica(input: {
    playlist_id: 1
    musica_id: 1
  }) {
    id
    playlist {
      nome
    }
    musica {
      nome
      artista
    }
  }
}
```

### Update Musica
```graphql
mutation {
  updateMusica(id: 1, input: {
    nome: "Bohemian Rhapsody (Remastered)"
    artista: "Queen"
  }) {
    id
    nome
    artista
  }
}
```

### Delete Playlist
```graphql
mutation {
  deletePlaylist(id: 1)
}
```

## Complex Queries

### Get all playlists with usuario and musicas
```graphql
query {
  playlists {
    id
    nome
    usuario {
      id
      nome
      idade
    }
  }
}
```

### Get playlist with all its musicas
```graphql
query {
  musicasByPlaylist(playlist_id: 1) {
    id
    musica {
      id
      nome
      artista
    }
  }
}
```
