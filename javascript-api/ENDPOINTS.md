# 🎵 Music Streaming API - Resumo de Endpoints

## 🚀 APIs Disponíveis

### 1️⃣ REST API
**Porta:** 3000  
**Base URL:** `http://localhost:3000`

#### Endpoints Principais:
```
GET    /                           # Info da API
GET    /api/usuarios               # Listar todos os usuários
POST   /api/usuarios               # Criar usuário
GET    /api/usuarios/:id           # Buscar usuário por ID
PUT    /api/usuarios/:id           # Atualizar usuário
DELETE /api/usuarios/:id           # Deletar usuário

GET    /api/playlists              # Listar todas as playlists
POST   /api/playlists              # Criar playlist
GET    /api/playlists/:id          # Buscar playlist por ID
PUT    /api/playlists/:id          # Atualizar playlist
DELETE /api/playlists/:id          # Deletar playlist

GET    /api/musicas                # Listar todas as músicas
POST   /api/musicas                # Criar música
GET    /api/musicas/:id            # Buscar música por ID
PUT    /api/musicas/:id            # Atualizar música
DELETE /api/musicas/:id            # Deletar música

GET    /api/playlist-musicas       # Listar todas as associações
POST   /api/playlist-musicas       # Adicionar música à playlist
GET    /api/playlist-musicas/:id   # Buscar associação por ID
GET    /api/playlist-musicas/playlist/:playlist_id  # Músicas de uma playlist
PUT    /api/playlist-musicas/:id   # Atualizar associação
DELETE /api/playlist-musicas/:id   # Remover música da playlist
```

---

### 2️⃣ GraphQL API
**Porta:** 4000  
**Endpoint:** `http://localhost:4000/graphql`  
**Playground:** `http://localhost:4000/graphql`

#### Queries Disponíveis:
```graphql
# Usuários
usuarios: [Usuario!]!
usuario(id: ID!): Usuario

# Playlists
playlists: [Playlist!]!
playlist(id: ID!): Playlist

# Músicas
musicas: [Musica!]!
musica(id: ID!): Musica

# Playlist-Música
playlistMusicas: [PlaylistMusica!]!
playlistMusica(id: ID!): PlaylistMusica
musicasByPlaylist(playlist_id: Int!): [PlaylistMusica!]!
```

#### Mutations Disponíveis:
```graphql
# Usuários
createUsuario(input: UsuarioInput!): Usuario!
updateUsuario(id: ID!, input: UsuarioUpdateInput!): Usuario!
deleteUsuario(id: ID!): Boolean!

# Playlists
createPlaylist(input: PlaylistInput!): Playlist!
updatePlaylist(id: ID!, input: PlaylistUpdateInput!): Playlist!
deletePlaylist(id: ID!): Boolean!

# Músicas
createMusica(input: MusicaInput!): Musica!
updateMusica(id: ID!, input: MusicaUpdateInput!): Musica!
deleteMusica(id: ID!): Boolean!

# Playlist-Música
createPlaylistMusica(input: PlaylistMusicaInput!): PlaylistMusica!
updatePlaylistMusica(id: ID!, input: PlaylistMusicaUpdateInput!): PlaylistMusica!
deletePlaylistMusica(id: ID!): Boolean!
```

---

### 3️⃣ SOAP API
**Porta:** 5000  
**Endpoint:** `http://localhost:5000/wsdl`  
**WSDL:** `http://localhost:5000/wsdl?wsdl`

#### Operações Disponíveis:

**Usuario:**
- `createUsuario(id, nome, idade)`: Response
- `getUsuarios()`: Response
- `getUsuario(id)`: Response
- `updateUsuario(id, nome, idade)`: Response
- `deleteUsuario(id)`: Response

**Playlist:**
- `createPlaylist(nome, usuario_id)`: Response
- `getPlaylists()`: Response
- `getPlaylist(id)`: Response
- `updatePlaylist(id, nome, usuario_id)`: Response
- `deletePlaylist(id)`: Response

**Musica:**
- `createMusica(nome, artista)`: Response
- `getMusicas()`: Response
- `getMusica(id)`: Response
- `updateMusica(id, nome, artista)`: Response
- `deleteMusica(id)`: Response

**PlaylistMusica:**
- `createPlaylistMusica(playlist_id, musica_id)`: Response
- `getPlaylistMusicas()`: Response
- `getPlaylistMusica(id)`: Response
- `getMusicasByPlaylist(playlist_id)`: Response
- `updatePlaylistMusica(id, playlist_id, musica_id)`: Response
- `deletePlaylistMusica(id)`: Response

---

### 4️⃣ gRPC API
**Porta:** 50051  
**Server:** `localhost:50051`  
**Proto File:** `src/grpc/proto/musicstreaming.proto`

#### Services Disponíveis:

**UsuarioService:**
- `CreateUsuario(CreateUsuarioRequest)`: Usuario
- `GetUsuarios(Empty)`: UsuariosResponse
- `GetUsuario(GetUsuarioRequest)`: Usuario
- `UpdateUsuario(UpdateUsuarioRequest)`: Usuario
- `DeleteUsuario(DeleteUsuarioRequest)`: DeleteResponse

**PlaylistService:**
- `CreatePlaylist(CreatePlaylistRequest)`: Playlist
- `GetPlaylists(Empty)`: PlaylistsResponse
- `GetPlaylist(GetPlaylistRequest)`: Playlist
- `UpdatePlaylist(UpdatePlaylistRequest)`: Playlist
- `DeletePlaylist(DeletePlaylistRequest)`: DeleteResponse

**MusicaService:**
- `CreateMusica(CreateMusicaRequest)`: Musica
- `GetMusicas(Empty)`: MusicasResponse
- `GetMusica(GetMusicaRequest)`: Musica
- `UpdateMusica(UpdateMusicaRequest)`: Musica
- `DeleteMusica(DeleteMusicaRequest)`: DeleteResponse

**PlaylistMusicaService:**
- `CreatePlaylistMusica(CreatePlaylistMusicaRequest)`: PlaylistMusica
- `GetPlaylistMusicas(Empty)`: PlaylistMusicasResponse
- `GetPlaylistMusica(GetPlaylistMusicaRequest)`: PlaylistMusica
- `GetMusicasByPlaylist(GetMusicasByPlaylistRequest)`: PlaylistMusicasResponse
- `UpdatePlaylistMusica(UpdatePlaylistMusicaRequest)`: PlaylistMusica
- `DeletePlaylistMusica(DeletePlaylistMusicaRequest)`: DeleteResponse

---

## 🔧 Como Iniciar

```bash
# Terminal 1
npm run start:rest

# Terminal 2
npm run start:graphql

# Terminal 3
npm run start:soap

# Terminal 4
npm run start:grpc
```

## 🧪 Testar Todas as APIs

```bash
npm test
```

---

## 📊 Estrutura do Banco de Dados

### Tables:
- **usuario** (id UUID PK, nome TEXT, idade INT)
- **playlist** (id INT PK, nome TEXT, usuario_id UUID FK)
- **musica** (id INT PK, nome TEXT, artista TEXT)
- **playlist_musica** (id INT PK, playlist_id INT FK, musica_id INT FK)

---

## 🔍 Quick Test Commands

### REST
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/musicas" -Method GET
```

### GraphQL
```powershell
Invoke-RestMethod -Uri "http://localhost:4000/graphql" -Method POST -Body '{"query":"{ musicas { id nome artista } }"}' -ContentType "application/json"
```

### SOAP
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/wsdl?wsdl" -Method GET
```

### gRPC
```bash
node examples/grpc-client-example.js
```

---

## 📚 Documentação Completa

- **README.md** - Visão geral do projeto
- **INSTALACAO.md** - Guia de instalação detalhado
- **examples/** - Exemplos de código para cada API
