# ⚡ gRPC API - Guia Completo de Uso

## 🚀 Informações Gerais

- **Host:** `localhost:50051`
- **Porta:** 50051
- **Protocolo:** HTTP/2
- **Formato:** Protocol Buffers (Protobuf)
- **Proto File:** `src/grpc/proto/musicstreaming.proto`

## 🔧 Iniciando a API

```bash
npm run start:grpc
```

## 📋 O que é gRPC?

**gRPC (gRPC Remote Procedure Call)** é um framework RPC moderno, open-source e de alto desempenho desenvolvido pelo Google.

### Características

✅ **Alta Performance** - Usa HTTP/2 e Protocol Buffers  
✅ **Streaming Bidirecional** - Suporte a streams  
✅ **Independente de Linguagem** - Clientes em qualquer linguagem  
✅ **Fortemente Tipado** - Schemas definidos em `.proto`  
✅ **Geração de Código** - Stubs automáticos  
✅ **Multiplexing** - Múltiplas chamadas em uma conexão  

### Por que usar gRPC?

- **Microserviços** - Comunicação eficiente entre serviços
- **Mobile** - Economiza bateria e dados
- **IoT** - Baixo overhead
- **Real-time** - Streaming de dados

---

## 📄 Protocol Buffers (.proto)

O arquivo `.proto` define:
- Mensagens (estruturas de dados)
- Serviços (RPCs disponíveis)
- Tipos de dados

### Localização

```
src/grpc/proto/musicstreaming.proto
```

### Estrutura Básica

```protobuf
syntax = "proto3";

package musicstreaming;

message Usuario {
  string id = 1;
  string nome = 2;
  int32 idade = 3;
}

service UsuarioService {
  rpc CreateUsuario(CreateUsuarioRequest) returns (Usuario);
  rpc GetUsuarios(Empty) returns (UsuariosResponse);
}
```

---

## 🔧 Configurando Cliente gRPC

### Node.js

```bash
npm install @grpc/grpc-js @grpc/proto-loader
```

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Carregar o arquivo .proto
const PROTO_PATH = path.join(__dirname, 'src/grpc/proto/musicstreaming.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const musicstreaming = protoDescriptor.musicstreaming;

// Criar cliente
const client = new musicstreaming.UsuarioService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);
```

---

## 🎯 SERVIÇOS DISPONÍVEIS

### 1. UsuarioService

Gerenciamento de usuários.

**Métodos:**
- `CreateUsuario` - Criar usuário
- `GetUsuarios` - Listar todos
- `GetUsuario` - Buscar por ID
- `UpdateUsuario` - Atualizar dados
- `DeleteUsuario` - Remover usuário

---

### 2. PlaylistService

Gerenciamento de playlists.

**Métodos:**
- `CreatePlaylist` - Criar playlist
- `GetPlaylists` - Listar todas
- `GetPlaylist` - Buscar por ID
- `UpdatePlaylist` - Atualizar dados
- `DeletePlaylist` - Remover playlist

---

### 3. MusicaService

Gerenciamento de músicas.

**Métodos:**
- `CreateMusica` - Criar música
- `GetMusicas` - Listar todas
- `GetMusica` - Buscar por ID
- `UpdateMusica` - Atualizar dados
- `DeleteMusica` - Remover música

---

### 4. PlaylistMusicaService

Gerenciamento de associações playlist-música.

**Métodos:**
- `CreatePlaylistMusica` - Adicionar música à playlist
- `GetPlaylistMusicas` - Listar todas associações
- `GetPlaylistMusica` - Buscar por ID
- `GetMusicasByPlaylist` - Músicas de uma playlist
- `UpdatePlaylistMusica` - Atualizar associação
- `DeletePlaylistMusica` - Remover música da playlist

---

## 👤 USUARIO SERVICE

### 1. CreateUsuario

Cria um novo usuário.

**Request:**
```protobuf
message CreateUsuarioRequest {
  string id = 1;
  string nome = 2;
  int32 idade = 3;
}
```

**Response:**
```protobuf
message Usuario {
  string id = 1;
  string nome = 2;
  int32 idade = 3;
}
```

**Node.js:**
```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'musicstreaming.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const musicstreaming = protoDescriptor.musicstreaming;

const client = new musicstreaming.UsuarioService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Criar usuário
const request = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  nome: 'João Silva',
  idade: 28
};

client.CreateUsuario(request, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Usuário criado:', response);
});
```

**Resposta:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "João Silva",
  "idade": 28
}
```

---

### 2. GetUsuarios

Lista todos os usuários.

**Request:**
```protobuf
message Empty {}
```

**Response:**
```protobuf
message UsuariosResponse {
  repeated Usuario usuarios = 1;
}
```

**Node.js:**
```javascript
client.GetUsuarios({}, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Usuários:', response.usuarios);
});
```

**Resposta:**
```json
{
  "usuarios": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "nome": "João Silva",
      "idade": 28
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "nome": "Maria Santos",
      "idade": 25
    }
  ]
}
```

---

### 3. GetUsuario

Busca um usuário específico.

**Request:**
```protobuf
message GetUsuarioRequest {
  string id = 1;
}
```

**Node.js:**
```javascript
const request = {
  id: '550e8400-e29b-41d4-a716-446655440000'
};

client.GetUsuario(request, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Usuário:', response);
});
```

---

### 4. UpdateUsuario

Atualiza dados de um usuário.

**Request:**
```protobuf
message UpdateUsuarioRequest {
  string id = 1;
  string nome = 2;
  int32 idade = 3;
}
```

**Node.js:**
```javascript
const request = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  nome: 'João Silva Santos',
  idade: 29
};

client.UpdateUsuario(request, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Usuário atualizado:', response);
});
```

---

### 5. DeleteUsuario

Remove um usuário.

**Request:**
```protobuf
message DeleteUsuarioRequest {
  string id = 1;
}
```

**Response:**
```protobuf
message DeleteResponse {
  bool success = 1;
  string message = 2;
}
```

**Node.js:**
```javascript
const request = {
  id: '550e8400-e29b-41d4-a716-446655440000'
};

client.DeleteUsuario(request, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Resposta:', response.message);
});
```

**Resposta:**
```json
{
  "success": true,
  "message": "Usuario deleted successfully"
}
```

---

## 🎵 MUSICA SERVICE

### 1. CreateMusica

Cria uma nova música.

**Request:**
```protobuf
message CreateMusicaRequest {
  string nome = 1;
  string artista = 2;
}
```

**Response:**
```protobuf
message Musica {
  int32 id = 1;
  string nome = 2;
  string artista = 3;
}
```

**Node.js:**
```javascript
const musicaClient = new musicstreaming.MusicaService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const request = {
  nome: 'Bohemian Rhapsody',
  artista: 'Queen'
};

musicaClient.CreateMusica(request, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Música criada:', response);
});
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "Bohemian Rhapsody",
  "artista": "Queen"
}
```

---

### 2. GetMusicas

Lista todas as músicas.

**Node.js:**
```javascript
musicaClient.GetMusicas({}, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Músicas:', response.musicas);
  
  // Exibir formatado
  response.musicas.forEach(musica => {
    console.log(`${musica.id} - ${musica.nome} - ${musica.artista}`);
  });
});
```

---

### 3. GetMusica

Busca uma música específica.

**Request:**
```protobuf
message GetMusicaRequest {
  int32 id = 1;
}
```

**Node.js:**
```javascript
const request = { id: 1 };

musicaClient.GetMusica(request, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Música:', response);
});
```

---

### 4. UpdateMusica

Atualiza dados de uma música.

**Request:**
```protobuf
message UpdateMusicaRequest {
  int32 id = 1;
  string nome = 2;
  string artista = 3;
}
```

**Node.js:**
```javascript
const request = {
  id: 1,
  nome: 'Bohemian Rhapsody (Remastered)',
  artista: 'Queen'
};

musicaClient.UpdateMusica(request, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Música atualizada:', response);
});
```

---

### 5. DeleteMusica

Remove uma música.

**Request:**
```protobuf
message DeleteMusicaRequest {
  int32 id = 1;
}
```

**Node.js:**
```javascript
const request = { id: 1 };

musicaClient.DeleteMusica(request, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Música deletada:', response.message);
});
```

---

## 📝 PLAYLIST SERVICE

### 1. CreatePlaylist

Cria uma nova playlist.

**Request:**
```protobuf
message CreatePlaylistRequest {
  string nome = 1;
  string usuario_id = 2;
}
```

**Response:**
```protobuf
message Playlist {
  int32 id = 1;
  string nome = 2;
  string usuario_id = 3;
}
```

**Node.js:**
```javascript
const playlistClient = new musicstreaming.PlaylistService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const request = {
  nome: 'Rock Classics',
  usuario_id: '550e8400-e29b-41d4-a716-446655440000'
};

playlistClient.CreatePlaylist(request, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Playlist criada:', response);
});
```

---

### 2. GetPlaylists

Lista todas as playlists.

**Node.js:**
```javascript
playlistClient.GetPlaylists({}, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Playlists:', response.playlists);
});
```

---

### 3. GetPlaylist

Busca uma playlist específica.

**Node.js:**
```javascript
const request = { id: 1 };

playlistClient.GetPlaylist(request, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Playlist:', response);
});
```

---

### 4. UpdatePlaylist

Atualiza dados de uma playlist.

**Node.js:**
```javascript
const request = {
  id: 1,
  nome: 'Rock Classics - Updated',
  usuario_id: '550e8400-e29b-41d4-a716-446655440000'
};

playlistClient.UpdatePlaylist(request, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Playlist atualizada:', response);
});
```

---

### 5. DeletePlaylist

Remove uma playlist.

**Node.js:**
```javascript
const request = { id: 1 };

playlistClient.DeletePlaylist(request, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Playlist deletada:', response.message);
});
```

---

## 🔗 PLAYLIST_MUSICA SERVICE

### 1. CreatePlaylistMusica

Adiciona uma música a uma playlist.

**Request:**
```protobuf
message CreatePlaylistMusicaRequest {
  int32 playlist_id = 1;
  int32 musica_id = 2;
}
```

**Response:**
```protobuf
message PlaylistMusica {
  int32 id = 1;
  int32 playlist_id = 2;
  int32 musica_id = 3;
}
```

**Node.js:**
```javascript
const pmClient = new musicstreaming.PlaylistMusicaService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const request = {
  playlist_id: 1,
  musica_id: 1
};

pmClient.CreatePlaylistMusica(request, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Música adicionada à playlist:', response);
});
```

---

### 2. GetPlaylistMusicas

Lista todas as associações.

**Node.js:**
```javascript
pmClient.GetPlaylistMusicas({}, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Associações:', response.playlistMusicas);
});
```

---

### 3. GetMusicasByPlaylist

Lista músicas de uma playlist específica.

**Request:**
```protobuf
message GetMusicasByPlaylistRequest {
  int32 playlist_id = 1;
}
```

**Response:**
```protobuf
message PlaylistMusicasResponse {
  repeated PlaylistMusica playlistMusicas = 1;
}
```

**Node.js:**
```javascript
const request = { playlist_id: 1 };

pmClient.GetMusicasByPlaylist(request, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  
  console.log('Músicas na playlist:');
  response.playlistMusicas.forEach(pm => {
    console.log(`- ID: ${pm.id}, Música ID: ${pm.musica_id}`);
  });
});
```

---

### 4. DeletePlaylistMusica

Remove uma música da playlist.

**Node.js:**
```javascript
const request = { id: 1 };

pmClient.DeletePlaylistMusica(request, (error, response) => {
  if (error) {
    console.error('Erro:', error.message);
    return;
  }
  console.log('Música removida da playlist:', response.message);
});
```

---

## 🎯 Fluxo Completo - Node.js

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../src/grpc/proto/musicstreaming.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const musicstreaming = protoDescriptor.musicstreaming;

// Criar clientes
const usuarioClient = new musicstreaming.UsuarioService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const musicaClient = new musicstreaming.MusicaService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const playlistClient = new musicstreaming.PlaylistService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const pmClient = new musicstreaming.PlaylistMusicaService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

async function fluxoCompleto() {
  try {
    console.log('🎵 Fluxo Completo gRPC\n');
    
    // 1. Criar usuário
    console.log('1. Criando usuário...');
    const usuario = await new Promise((resolve, reject) => {
      usuarioClient.CreateUsuario({
        id: '770e8400-e29b-41d4-a716-446655440003',
        nome: 'Carlos Silva',
        idade: 35
      }, (error, response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
    console.log('✓ Usuário criado:', usuario.nome);
    
    // 2. Criar músicas
    console.log('\n2. Criando músicas...');
    const musica1 = await new Promise((resolve, reject) => {
      musicaClient.CreateMusica({
        nome: 'Paradise City',
        artista: 'Guns N\' Roses'
      }, (error, response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
    
    const musica2 = await new Promise((resolve, reject) => {
      musicaClient.CreateMusica({
        nome: 'Welcome to the Jungle',
        artista: 'Guns N\' Roses'
      }, (error, response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
    console.log('✓ Músicas criadas');
    
    // 3. Criar playlist
    console.log('\n3. Criando playlist...');
    const playlist = await new Promise((resolve, reject) => {
      playlistClient.CreatePlaylist({
        nome: 'Guns N\' Roses Collection',
        usuario_id: usuario.id
      }, (error, response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
    console.log('✓ Playlist criada:', playlist.nome);
    
    // 4. Adicionar músicas à playlist
    console.log('\n4. Adicionando músicas à playlist...');
    await new Promise((resolve, reject) => {
      pmClient.CreatePlaylistMusica({
        playlist_id: playlist.id,
        musica_id: musica1.id
      }, (error, response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
    
    await new Promise((resolve, reject) => {
      pmClient.CreatePlaylistMusica({
        playlist_id: playlist.id,
        musica_id: musica2.id
      }, (error, response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
    console.log('✓ Músicas adicionadas');
    
    // 5. Listar resultado
    console.log('\n5. Resultado final:');
    const musicasPlaylist = await new Promise((resolve, reject) => {
      pmClient.GetMusicasByPlaylist({
        playlist_id: playlist.id
      }, (error, response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
    
    console.log(`\nPlaylist: ${playlist.nome}`);
    console.log(`Usuário: ${usuario.nome}`);
    console.log(`Total de músicas: ${musicasPlaylist.playlistMusicas.length}`);
    
    console.log('\n✅ Fluxo completo executado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

fluxoCompleto();
```

---

## 🛠️ Ferramentas para Testar gRPC

### 1. BloomRPC

**GUI moderna para gRPC**

- Download: https://github.com/bloomrpc/bloomrpc
- Importar `.proto` file
- Interface similar ao Postman
- Suporte a streaming

### 2. grpcurl

**CLI para gRPC (similar ao curl)**

```bash
# Instalar
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest

# Listar serviços
grpcurl -plaintext localhost:50051 list

# Listar métodos de um serviço
grpcurl -plaintext localhost:50051 list musicstreaming.MusicaService

# Chamar método
grpcurl -plaintext -d '{"id": 1}' localhost:50051 musicstreaming.MusicaService/GetMusica
```

### 3. Postman

- Suporte nativo a gRPC
- Importar arquivo `.proto`
- Interface gráfica
- Coleções e testes

### 4. grpcui

**Web UI para gRPC**

```bash
# Instalar
go install github.com/fullstorydev/grpcui/cmd/grpcui@latest

# Executar
grpcui -plaintext localhost:50051
```

---

## ⚠️ Tratamento de Erros

### Códigos de Status gRPC

| Código | Nome | Descrição |
|--------|------|-----------|
| 0 | OK | Sucesso |
| 1 | CANCELLED | Operação cancelada |
| 2 | UNKNOWN | Erro desconhecido |
| 3 | INVALID_ARGUMENT | Argumento inválido |
| 5 | NOT_FOUND | Não encontrado |
| 13 | INTERNAL | Erro interno |

### Tratamento em Node.js

```javascript
client.GetMusica({ id: 999 }, (error, response) => {
  if (error) {
    console.error('Código:', error.code);
    console.error('Mensagem:', error.message);
    console.error('Detalhes:', error.details);
    return;
  }
  console.log('Música:', response);
});
```

---

## 🎓 Comparação de Performance

| API | Tamanho Payload | Velocidade | Uso de CPU |
|-----|-----------------|------------|------------|
| **gRPC** | Muito Pequeno | Muito Rápida | Baixo |
| GraphQL | Médio | Rápida | Médio |
| REST | Médio | Rápida | Médio |
| SOAP | Grande | Lenta | Alto |

### Por que gRPC é mais rápido?

1. **HTTP/2** - Multiplexing, header compression
2. **Protocol Buffers** - Binário, menor que JSON
3. **Streaming** - Conexões persistentes
4. **Geração de código** - Menos overhead

---

## 📚 Boas Práticas

### 1. Use Mensagens Específicas

❌ **Evite:**
```protobuf
message GenericRequest {
  string data = 1;
}
```

✅ **Prefira:**
```protobuf
message CreateMusicaRequest {
  string nome = 1;
  string artista = 2;
}
```

### 2. Versionamento

```protobuf
syntax = "proto3";

package musicstreaming.v1;
```

### 3. Documentação

```protobuf
// Serviço para gerenciar músicas no sistema
service MusicaService {
  // Cria uma nova música
  // @param CreateMusicaRequest
  // @return Musica
  rpc CreateMusica(CreateMusicaRequest) returns (Musica);
}
```

### 4. Timeouts

```javascript
const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5); // 5 segundos

client.GetMusicas({}, { deadline }, (error, response) => {
  // ...
});
```

---

## 🔗 Links Relacionados

- [Documentação REST](./REST.md)
- [Documentação GraphQL](./GRAPHQL.md)
- [Documentação SOAP](./SOAP.md)
- [gRPC Official Docs](https://grpc.io/)
- [Protocol Buffers](https://developers.google.com/protocol-buffers)
- [gRPC Node.js Guide](https://grpc.io/docs/languages/node/)
