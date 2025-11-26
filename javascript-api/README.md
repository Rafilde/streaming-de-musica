# Music Streaming API - JavaScript/Node.js

Este projeto implementa um CRUD completo para um sistema de streaming de música usando 4 arquiteturas diferentes: REST, GraphQL, SOAP e gRPC.

## 📋 Estrutura do Banco de Dados

O projeto utiliza Supabase (PostgreSQL) com as seguintes tabelas:
- `usuario` - Usuários do sistema
- `playlist` - Playlists dos usuários
- `musica` - Músicas disponíveis
- `playlist_musica` - Relação N:N entre playlists e músicas

## 🚀 Instalação

```bash
cd javascript-api
npm install
```

## 📝 Configuração

Certifique-se de que o arquivo `.env` na raiz do projeto contém:

```env
SUPABASE_URL=sua_url_supabase
SUPABASE_KEY=sua_key_supabase

# Portas das APIs (opcional)
REST_PORT=3000
GRAPHQL_PORT=4000
SOAP_PORT=5000
GRPC_PORT=50051
```

## 🔧 Executar as APIs

### API REST (Express)
```bash
npm run start:rest
```
Disponível em: `http://localhost:3000`

**Endpoints:**
- `GET/POST /api/usuarios`
- `GET/PUT/DELETE /api/usuarios/:id`
- `GET/POST /api/playlists`
- `GET/PUT/DELETE /api/playlists/:id`
- `GET/POST /api/musicas`
- `GET/PUT/DELETE /api/musicas/:id`
- `GET/POST /api/playlist-musicas`
- `GET/PUT/DELETE /api/playlist-musicas/:id`
- `GET /api/playlist-musicas/playlist/:playlist_id`

### API GraphQL (Apollo Server)
```bash
npm run start:graphql
```
Disponível em: `http://localhost:4000/graphql`

**Queries e Mutations:**
- Usuarios: `usuarios`, `usuario(id)`, `createUsuario`, `updateUsuario`, `deleteUsuario`
- Playlists: `playlists`, `playlist(id)`, `createPlaylist`, `updatePlaylist`, `deletePlaylist`
- Musicas: `musicas`, `musica(id)`, `createMusica`, `updateMusica`, `deleteMusica`
- PlaylistMusicas: `playlistMusicas`, `playlistMusica(id)`, `createPlaylistMusica`, etc.

### API SOAP
```bash
npm run start:soap
```
Disponível em: `http://localhost:5000/wsdl`

WSDL: `http://localhost:5000/wsdl?wsdl`

**Operações:**
- Usuario: `createUsuario`, `getUsuarios`, `getUsuario`, `updateUsuario`, `deleteUsuario`
- Playlist: `createPlaylist`, `getPlaylists`, `getPlaylist`, `updatePlaylist`, `deletePlaylist`
- Musica: `createMusica`, `getMusicas`, `getMusica`, `updateMusica`, `deleteMusica`
- PlaylistMusica: `createPlaylistMusica`, `getPlaylistMusicas`, etc.

### API gRPC
```bash
npm run start:grpc
```
Disponível em: `localhost:50051`

**Services:**
- `UsuarioService`
- `PlaylistService`
- `MusicaService`
- `PlaylistMusicaService`

Proto file: `src/grpc/proto/musicstreaming.proto`

## 🛠️ Desenvolvimento (com auto-reload)

```bash
npm run dev:rest
npm run dev:graphql
npm run dev:soap
npm run dev:grpc
```

## 📚 Exemplos de Uso

### REST - Criar Usuário
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"id": "uuid-aqui", "nome": "João Silva", "idade": 25}'
```

### GraphQL - Query
```graphql
query {
  usuarios {
    id
    nome
    idade
  }
}
```

### GraphQL - Mutation
```graphql
mutation {
  createPlaylist(input: {nome: "Minhas Favoritas", usuario_id: "uuid-aqui"}) {
    id
    nome
  }
}
```

## 🏗️ Estrutura do Projeto

```
javascript-api/
├── src/
│   ├── config/
│   │   └── supabase.js          # Configuração Supabase
│   ├── rest/
│   │   ├── controllers/         # Controllers REST
│   │   ├── routes/              # Rotas REST
│   │   └── server.js            # Servidor REST
│   ├── graphql/
│   │   ├── schema.js            # Schema GraphQL
│   │   ├── resolvers.js         # Resolvers GraphQL
│   │   └── server.js            # Servidor GraphQL
│   ├── soap/
│   │   ├── service.js           # Implementação SOAP
│   │   ├── musicstreaming.wsdl  # Definição WSDL
│   │   └── server.js            # Servidor SOAP
│   └── grpc/
│       ├── proto/
│       │   └── musicstreaming.proto  # Definição Protocol Buffers
│       ├── services.js          # Implementação gRPC
│       └── server.js            # Servidor gRPC
├── package.json
└── README.md
```

## 📦 Dependências Principais

- `@supabase/supabase-js` - Cliente Supabase
- `express` - Framework web
- `apollo-server-express` - Servidor GraphQL
- `soap` - Servidor SOAP
- `@grpc/grpc-js` - Servidor gRPC
- `@grpc/proto-loader` - Loader Protocol Buffers

## 📄 Licença

MIT
