# 🚀 GraphQL API - Guia Completo de Uso

## 🚀 Informações Gerais

- **Endpoint:** `http://localhost:4000/graphql`
- **Porta:** 4000
- **Playground:** `http://localhost:4000/graphql` (interface gráfica)
- **Formato:** GraphQL (queries e mutations)
- **Headers:** `Content-Type: application/json`

## 🔧 Iniciando a API

```bash
npm run start:graphql
```

Acesse o GraphQL Playground em seu navegador: `http://localhost:4000/graphql`

## 📊 Características do GraphQL

### Vantagens

✅ **Busca exata de dados** - Solicite apenas os campos que precisa  
✅ **Queries aninhadas** - Busque dados relacionados em uma única requisição  
✅ **Tipagem forte** - Schema bem definido com validação automática  
✅ **Documentação automática** - Explorar schema no Playground  
✅ **Uma única URL** - Todas as operações no mesmo endpoint  

### Schema Principal

```graphql
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
```

---

## 🔍 QUERIES (Consultas)

### 👤 Usuários

#### 1. Listar Todos os Usuários

```graphql
query {
  usuarios {
    id
    nome
    idade
  }
}
```

**Resposta:**
```json
{
  "data": {
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
}
```

**PowerShell:**
```powershell
$query = @{
    query = "{ usuarios { id nome idade } }"
} | ConvertTo-Json

$result = Invoke-RestMethod -Uri "http://localhost:4000/graphql" `
    -Method POST `
    -Body $query `
    -ContentType "application/json"

$result.data.usuarios
```

---

#### 2. Buscar Usuário Específico

```graphql
query {
  usuario(id: "550e8400-e29b-41d4-a716-446655440000") {
    id
    nome
    idade
  }
}
```

**Com Variáveis:**
```graphql
query BuscarUsuario($id: ID!) {
  usuario(id: $id) {
    id
    nome
    idade
  }
}
```

**Variables:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**PowerShell:**
```powershell
$query = @{
    query = 'query($id: ID!) { usuario(id: $id) { id nome idade } }'
    variables = @{
        id = "550e8400-e29b-41d4-a716-446655440000"
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:4000/graphql" `
    -Method POST `
    -Body $query `
    -ContentType "application/json"
```

---

#### 3. Buscar Apenas Campos Específicos

```graphql
query {
  usuarios {
    nome
  }
}
```

**Resposta:**
```json
{
  "data": {
    "usuarios": [
      { "nome": "João Silva" },
      { "nome": "Maria Santos" }
    ]
  }
}
```

---

### 🎵 Músicas

#### 1. Listar Todas as Músicas

```graphql
query {
  musicas {
    id
    nome
    artista
  }
}
```

**Resposta:**
```json
{
  "data": {
    "musicas": [
      {
        "id": "1",
        "nome": "Bohemian Rhapsody",
        "artista": "Queen"
      },
      {
        "id": "2",
        "nome": "Stairway to Heaven",
        "artista": "Led Zeppelin"
      }
    ]
  }
}
```

---

#### 2. Buscar Música Específica

```graphql
query {
  musica(id: 1) {
    id
    nome
    artista
  }
}
```

**Com Alias (múltiplas queries):**
```graphql
query {
  musica1: musica(id: 1) {
    nome
    artista
  }
  musica2: musica(id: 2) {
    nome
    artista
  }
}
```

**Resposta:**
```json
{
  "data": {
    "musica1": {
      "nome": "Bohemian Rhapsody",
      "artista": "Queen"
    },
    "musica2": {
      "nome": "Stairway to Heaven",
      "artista": "Led Zeppelin"
    }
  }
}
```

---

### 📝 Playlists

#### 1. Listar Todas as Playlists

```graphql
query {
  playlists {
    id
    nome
    usuario_id
  }
}
```

---

#### 2. Playlists com Dados do Usuário (Nested Query)

```graphql
query {
  playlists {
    id
    nome
    usuario {
      nome
      idade
    }
  }
}
```

**Resposta:**
```json
{
  "data": {
    "playlists": [
      {
        "id": "1",
        "nome": "Rock Classics",
        "usuario": {
          "nome": "João Silva",
          "idade": 28
        }
      }
    ]
  }
}
```

---

#### 3. Buscar Playlist Específica

```graphql
query {
  playlist(id: 1) {
    id
    nome
    usuario {
      id
      nome
    }
  }
}
```

---

### 🔗 Playlist-Música

#### 1. Listar Todas as Associações

```graphql
query {
  playlistMusicas {
    id
    playlist_id
    musica_id
  }
}
```

---

#### 2. Associações com Dados Relacionados

```graphql
query {
  playlistMusicas {
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

**Resposta:**
```json
{
  "data": {
    "playlistMusicas": [
      {
        "id": "1",
        "playlist": {
          "nome": "Rock Classics"
        },
        "musica": {
          "nome": "Bohemian Rhapsody",
          "artista": "Queen"
        }
      }
    ]
  }
}
```

---

#### 3. Músicas de uma Playlist Específica

```graphql
query {
  musicasByPlaylist(playlist_id: 1) {
    id
    musica {
      id
      nome
      artista
    }
    playlist {
      nome
    }
  }
}
```

**Resposta:**
```json
{
  "data": {
    "musicasByPlaylist": [
      {
        "id": "1",
        "musica": {
          "id": "1",
          "nome": "Bohemian Rhapsody",
          "artista": "Queen"
        },
        "playlist": {
          "nome": "Rock Classics"
        }
      },
      {
        "id": "2",
        "musica": {
          "id": "2",
          "nome": "Stairway to Heaven",
          "artista": "Led Zeppelin"
        },
        "playlist": {
          "nome": "Rock Classics"
        }
      }
    ]
  }
}
```

---

## ✏️ MUTATIONS (Modificações)

### 👤 Usuários

#### 1. Criar Usuário

```graphql
mutation {
  createUsuario(input: {
    id: "550e8400-e29b-41d4-a716-446655440000"
    nome: "Pedro Oliveira"
    idade: 30
  }) {
    id
    nome
    idade
  }
}
```

**Resposta:**
```json
{
  "data": {
    "createUsuario": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "nome": "Pedro Oliveira",
      "idade": 30
    }
  }
}
```

**Com Variáveis:**
```graphql
mutation CriarUsuario($input: UsuarioInput!) {
  createUsuario(input: $input) {
    id
    nome
    idade
  }
}
```

**Variables:**
```json
{
  "input": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "Pedro Oliveira",
    "idade": 30
  }
}
```

**PowerShell:**
```powershell
$mutation = @{
    query = 'mutation($input: UsuarioInput!) { createUsuario(input: $input) { id nome idade } }'
    variables = @{
        input = @{
            id = "550e8400-e29b-41d4-a716-446655440000"
            nome = "Pedro Oliveira"
            idade = 30
        }
    }
} | ConvertTo-Json -Depth 3

Invoke-RestMethod -Uri "http://localhost:4000/graphql" `
    -Method POST `
    -Body $mutation `
    -ContentType "application/json"
```

---

#### 2. Atualizar Usuário

```graphql
mutation {
  updateUsuario(
    id: "550e8400-e29b-41d4-a716-446655440000"
    input: {
      nome: "Pedro Oliveira Silva"
      idade: 31
    }
  ) {
    id
    nome
    idade
  }
}
```

**Com Variáveis:**
```graphql
mutation AtualizarUsuario($id: ID!, $input: UsuarioUpdateInput!) {
  updateUsuario(id: $id, input: $input) {
    id
    nome
    idade
  }
}
```

**Variables:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "input": {
    "nome": "Pedro Oliveira Silva",
    "idade": 31
  }
}
```

---

#### 3. Deletar Usuário

```graphql
mutation {
  deleteUsuario(id: "550e8400-e29b-41d4-a716-446655440000")
}
```

**Resposta:**
```json
{
  "data": {
    "deleteUsuario": true
  }
}
```

---

### 🎵 Músicas

#### 1. Criar Música

```graphql
mutation {
  createMusica(input: {
    nome: "Imagine"
    artista: "John Lennon"
  }) {
    id
    nome
    artista
  }
}
```

**Com Variáveis:**
```graphql
mutation CriarMusica($input: MusicaInput!) {
  createMusica(input: $input) {
    id
    nome
    artista
  }
}
```

**Variables:**
```json
{
  "input": {
    "nome": "Imagine",
    "artista": "John Lennon"
  }
}
```

---

#### 2. Criar Múltiplas Músicas (com Alias)

```graphql
mutation {
  musica1: createMusica(input: {
    nome: "Let It Be"
    artista: "The Beatles"
  }) {
    id
    nome
  }
  
  musica2: createMusica(input: {
    nome: "Hey Jude"
    artista: "The Beatles"
  }) {
    id
    nome
  }
}
```

**Resposta:**
```json
{
  "data": {
    "musica1": {
      "id": "3",
      "nome": "Let It Be"
    },
    "musica2": {
      "id": "4",
      "nome": "Hey Jude"
    }
  }
}
```

---

#### 3. Atualizar Música

```graphql
mutation {
  updateMusica(
    id: 3
    input: {
      nome: "Let It Be (Remastered)"
      artista: "The Beatles"
    }
  ) {
    id
    nome
    artista
  }
}
```

---

#### 4. Deletar Música

```graphql
mutation {
  deleteMusica(id: 3)
}
```

---

### 📝 Playlists

#### 1. Criar Playlist

```graphql
mutation {
  createPlaylist(input: {
    nome: "Beatles Collection"
    usuario_id: "550e8400-e29b-41d4-a716-446655440000"
  }) {
    id
    nome
    usuario {
      nome
    }
  }
}
```

**Resposta:**
```json
{
  "data": {
    "createPlaylist": {
      "id": "2",
      "nome": "Beatles Collection",
      "usuario": {
        "nome": "João Silva"
      }
    }
  }
}
```

---

#### 2. Atualizar Playlist

```graphql
mutation {
  updatePlaylist(
    id: 2
    input: {
      nome: "Beatles Collection - Updated"
    }
  ) {
    id
    nome
  }
}
```

---

#### 3. Deletar Playlist

```graphql
mutation {
  deletePlaylist(id: 2)
}
```

---

### 🔗 Playlist-Música

#### 1. Adicionar Música à Playlist

```graphql
mutation {
  createPlaylistMusica(input: {
    playlist_id: 1
    musica_id: 3
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

**Resposta:**
```json
{
  "data": {
    "createPlaylistMusica": {
      "id": "3",
      "playlist": {
        "nome": "Rock Classics"
      },
      "musica": {
        "nome": "Imagine",
        "artista": "John Lennon"
      }
    }
  }
}
```

---

#### 2. Atualizar Associação

```graphql
mutation {
  updatePlaylistMusica(
    id: 3
    input: {
      playlist_id: 2
      musica_id: 4
    }
  ) {
    id
    playlist_id
    musica_id
  }
}
```

---

#### 3. Remover Música da Playlist

```graphql
mutation {
  deletePlaylistMusica(id: 3)
}
```

---

## 🎯 Queries Complexas e Avançadas

### 1. Query Completa de Playlist com Tudo

```graphql
query PlaylistCompleta {
  playlist(id: 1) {
    id
    nome
    usuario {
      id
      nome
      idade
    }
  }
  
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

**Resposta:**
```json
{
  "data": {
    "playlist": {
      "id": "1",
      "nome": "Rock Classics",
      "usuario": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "nome": "João Silva",
        "idade": 28
      }
    },
    "musicasByPlaylist": [
      {
        "id": "1",
        "musica": {
          "id": "1",
          "nome": "Bohemian Rhapsody",
          "artista": "Queen"
        }
      },
      {
        "id": "2",
        "musica": {
          "id": "2",
          "nome": "Stairway to Heaven",
          "artista": "Led Zeppelin"
        }
      }
    ]
  }
}
```

---

### 2. Buscar Múltiplos Recursos Simultaneamente

```graphql
query TodosDados {
  usuarios {
    id
    nome
  }
  
  musicas {
    id
    nome
    artista
  }
  
  playlists {
    id
    nome
    usuario {
      nome
    }
  }
}
```

---

### 3. Query com Fragmentos

```graphql
fragment MusicaDetalhes on Musica {
  id
  nome
  artista
}

query {
  musica1: musica(id: 1) {
    ...MusicaDetalhes
  }
  
  musica2: musica(id: 2) {
    ...MusicaDetalhes
  }
  
  todasMusicas: musicas {
    ...MusicaDetalhes
  }
}
```

---

## 🔄 Fluxo Completo de Exemplo

```graphql
# 1. Criar usuário
mutation {
  usuario: createUsuario(input: {
    id: "770e8400-e29b-41d4-a716-446655440002"
    nome: "Ana Costa"
    idade: 27
  }) {
    id
    nome
  }
}

# 2. Criar músicas
mutation {
  m1: createMusica(input: {
    nome: "Sweet Child O' Mine"
    artista: "Guns N' Roses"
  }) {
    id
  }
  
  m2: createMusica(input: {
    nome: "November Rain"
    artista: "Guns N' Roses"
  }) {
    id
  }
}

# 3. Criar playlist
mutation {
  playlist: createPlaylist(input: {
    nome: "Guns N' Roses Hits"
    usuario_id: "770e8400-e29b-41d4-a716-446655440002"
  }) {
    id
    nome
  }
}

# 4. Adicionar músicas (supondo IDs retornados: playlist=3, musicas=5,6)
mutation {
  add1: createPlaylistMusica(input: {
    playlist_id: 3
    musica_id: 5
  }) {
    id
  }
  
  add2: createPlaylistMusica(input: {
    playlist_id: 3
    musica_id: 6
  }) {
    id
  }
}

# 5. Consultar resultado
query {
  playlist(id: 3) {
    nome
    usuario {
      nome
    }
  }
  
  musicasByPlaylist(playlist_id: 3) {
    musica {
      nome
      artista
    }
  }
}
```

---

## 💻 Usando GraphQL via PowerShell

### Query Simples

```powershell
$query = @{
    query = "{ musicas { id nome artista } }"
} | ConvertTo-Json

$result = Invoke-RestMethod `
    -Uri "http://localhost:4000/graphql" `
    -Method POST `
    -Body $query `
    -ContentType "application/json"

$result.data.musicas | Format-Table
```

---

### Mutation com Variáveis

```powershell
$mutation = @{
    query = @"
        mutation(`$input: MusicaInput!) {
            createMusica(input: `$input) {
                id
                nome
                artista
            }
        }
"@
    variables = @{
        input = @{
            nome = "Paradise City"
            artista = "Guns N' Roses"
        }
    }
} | ConvertTo-Json -Depth 3

$result = Invoke-RestMethod `
    -Uri "http://localhost:4000/graphql" `
    -Method POST `
    -Body $mutation `
    -ContentType "application/json"

$result.data.createMusica
```

---

### Script Completo em PowerShell

```powershell
function Invoke-GraphQL {
    param(
        [string]$Query,
        [hashtable]$Variables = @{}
    )
    
    $body = @{
        query = $Query
    }
    
    if ($Variables.Count -gt 0) {
        $body.variables = $Variables
    }
    
    $json = $body | ConvertTo-Json -Depth 10
    
    $result = Invoke-RestMethod `
        -Uri "http://localhost:4000/graphql" `
        -Method POST `
        -Body $json `
        -ContentType "application/json"
    
    return $result.data
}

# Uso:
$musicas = Invoke-GraphQL -Query "{ musicas { nome artista } }"
$musicas.musicas | Format-Table

# Com variáveis:
$usuario = Invoke-GraphQL `
    -Query 'mutation($input: UsuarioInput!) { createUsuario(input: $input) { id nome } }' `
    -Variables @{
        input = @{
            id = (New-Guid).Guid
            nome = "Carlos Silva"
            idade = 35
        }
    }

$usuario.createUsuario
```

---

## ⚠️ Tratamento de Erros

### Erro de Validação

```graphql
mutation {
  createMusica(input: {
    nome: "Test"
    # artista está faltando
  }) {
    id
  }
}
```

**Resposta:**
```json
{
  "errors": [
    {
      "message": "Field \"MusicaInput.artista\" of required type \"String!\" was not provided.",
      "locations": [{"line": 2, "column": 17}]
    }
  ]
}
```

---

### Erro de Dados

```graphql
mutation {
  createUsuario(input: {
    id: "id-invalido"
    nome: "Test"
  }) {
    id
  }
}
```

**Resposta:**
```json
{
  "errors": [
    {
      "message": "invalid input syntax for type uuid: \"id-invalido\"",
      "path": ["createUsuario"]
    }
  ],
  "data": {
    "createUsuario": null
  }
}
```

---

## 🛠️ Ferramentas Recomendadas

### 1. GraphQL Playground (Built-in)

Acesse `http://localhost:4000/graphql` para:
- ✅ Autocomplete de queries
- ✅ Documentação interativa do schema
- ✅ Histórico de queries
- ✅ Sintaxe highlighting

### 2. Apollo Studio

- Interface avançada para GraphQL
- Exploração de schema
- Performance tracking

### 3. Postman

- Suporta GraphQL nativamente
- Coleções e ambiente
- Testes automatizados

### 4. Altair GraphQL Client

- Cliente desktop/web
- Suporte a variáveis e headers
- Export/Import de queries

---

## 📚 Dicas e Boas Práticas

### 1. Use Variáveis

❌ **Evite:**
```graphql
mutation {
  createMusica(input: { nome: "Test", artista: "Artist" }) {
    id
  }
}
```

✅ **Prefira:**
```graphql
mutation CriarMusica($input: MusicaInput!) {
  createMusica(input: $input) {
    id
  }
}
```

### 2. Nomeie suas Operações

✅ **Bom:**
```graphql
query BuscarPlaylistsDoUsuario($id: ID!) {
  usuario(id: $id) {
    nome
  }
}
```

### 3. Use Fragmentos para Reutilizar

```graphql
fragment UsuarioInfo on Usuario {
  id
  nome
  idade
}

query {
  usuario1: usuario(id: "...") {
    ...UsuarioInfo
  }
  
  usuarios {
    ...UsuarioInfo
  }
}
```

### 4. Peça Apenas o que Precisa

❌ **Evite:**
```graphql
query {
  musicas {
    id
    nome
    artista
  }
}
```

✅ **Se só precisa dos nomes:**
```graphql
query {
  musicas {
    nome
  }
}
```

---

## 🔗 Links Relacionados

- [Documentação REST](./REST.md)
- [Documentação SOAP](./SOAP.md)
- [Documentação gRPC](./GRPC.md)
- [GraphQL Official Docs](https://graphql.org/learn/)
- [Apollo Server Docs](https://www.apollographql.com/docs/apollo-server/)
