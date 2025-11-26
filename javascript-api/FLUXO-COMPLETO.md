# 📝 Fluxo Completo de Uso - Music Streaming API

Este documento demonstra um fluxo completo de uso da API, desde a criação de usuário até a montagem de uma playlist com músicas.

## 🎯 Cenário de Exemplo

Vamos criar:
1. Um usuário chamado "João Silva"
2. Uma playlist chamada "Rock Classics"
3. Algumas músicas (Queen, Led Zeppelin)
4. Adicionar as músicas à playlist

---

## 1️⃣ REST API - Fluxo Completo

### Passo 1: Criar um Usuário

```powershell
$body = @{
    id = "550e8400-e29b-41d4-a716-446655440000"
    nome = "João Silva"
    idade = 28
} | ConvertTo-Json

$usuario = Invoke-RestMethod -Uri "http://localhost:3000/api/usuarios" -Method POST -Body $body -ContentType "application/json"
Write-Host "Usuário criado: $($usuario.nome)"
```

### Passo 2: Criar Músicas

```powershell
# Música 1
$body = @{
    nome = "Bohemian Rhapsody"
    artista = "Queen"
} | ConvertTo-Json

$musica1 = Invoke-RestMethod -Uri "http://localhost:3000/api/musicas" -Method POST -Body $body -ContentType "application/json"

# Música 2
$body = @{
    nome = "Stairway to Heaven"
    artista = "Led Zeppelin"
} | ConvertTo-Json

$musica2 = Invoke-RestMethod -Uri "http://localhost:3000/api/musicas" -Method POST -Body $body -ContentType "application/json"

Write-Host "Músicas criadas: $($musica1.nome), $($musica2.nome)"
```

### Passo 3: Criar Playlist

```powershell
$body = @{
    nome = "Rock Classics"
    usuario_id = "550e8400-e29b-41d4-a716-446655440000"
} | ConvertTo-Json

$playlist = Invoke-RestMethod -Uri "http://localhost:3000/api/playlists" -Method POST -Body $body -ContentType "application/json"
Write-Host "Playlist criada: $($playlist.nome)"
```

### Passo 4: Adicionar Músicas à Playlist

```powershell
# Adicionar primeira música
$body = @{
    playlist_id = $playlist.id
    musica_id = $musica1.id
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas" -Method POST -Body $body -ContentType "application/json"

# Adicionar segunda música
$body = @{
    playlist_id = $playlist.id
    musica_id = $musica2.id
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas" -Method POST -Body $body -ContentType "application/json"
```

### Passo 5: Listar Músicas da Playlist

```powershell
$musicasPlaylist = Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas/playlist/$($playlist.id)"
Write-Host "Músicas na playlist:"
$musicasPlaylist | ForEach-Object { Write-Host "- $($_.musica.nome) - $($_.musica.artista)" }
```

---

## 2️⃣ GraphQL API - Fluxo Completo

Execute no GraphQL Playground (`http://localhost:4000/graphql`):

### Passo 1: Criar Usuário

```graphql
mutation {
  createUsuario(input: {
    id: "550e8400-e29b-41d4-a716-446655440000"
    nome: "João Silva"
    idade: 28
  }) {
    id
    nome
    idade
  }
}
```

### Passo 2: Criar Músicas

```graphql
mutation {
  musica1: createMusica(input: {
    nome: "Bohemian Rhapsody"
    artista: "Queen"
  }) {
    id
    nome
    artista
  }
  
  musica2: createMusica(input: {
    nome: "Stairway to Heaven"
    artista: "Led Zeppelin"
  }) {
    id
    nome
    artista
  }
}
```

### Passo 3: Criar Playlist

```graphql
mutation {
  createPlaylist(input: {
    nome: "Rock Classics"
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

### Passo 4: Adicionar Músicas à Playlist

```graphql
mutation {
  addMusica1: createPlaylistMusica(input: {
    playlist_id: 1
    musica_id: 1
  }) {
    id
  }
  
  addMusica2: createPlaylistMusica(input: {
    playlist_id: 1
    musica_id: 2
  }) {
    id
  }
}
```

### Passo 5: Consultar Playlist Completa

```graphql
query {
  playlist(id: 1) {
    id
    nome
    usuario {
      nome
      idade
    }
  }
  
  musicasByPlaylist(playlist_id: 1) {
    musica {
      id
      nome
      artista
    }
  }
}
```

---

## 3️⃣ Operações CRUD Completas

### REST - Atualizar Música

```powershell
$body = @{
    nome = "Bohemian Rhapsody (Remastered)"
    artista = "Queen"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/musicas/1" -Method PUT -Body $body -ContentType "application/json"
```

### GraphQL - Atualizar Usuário

```graphql
mutation {
  updateUsuario(
    id: "550e8400-e29b-41d4-a716-446655440000"
    input: {
      nome: "João Silva Santos"
      idade: 29
    }
  ) {
    id
    nome
    idade
  }
}
```

### REST - Deletar Música da Playlist

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas/1" -Method DELETE
```

### GraphQL - Deletar Playlist

```graphql
mutation {
  deletePlaylist(id: 1)
}
```

---

## 4️⃣ Consultas Avançadas

### REST - Buscar Todas as Playlists de um Usuário

```powershell
$playlists = Invoke-RestMethod -Uri "http://localhost:3000/api/playlists"
$playlistsDoUsuario = $playlists | Where-Object { $_.usuario_id -eq "550e8400-e29b-41d4-a716-446655440000" }
$playlistsDoUsuario
```

### GraphQL - Buscar Usuário com Suas Playlists

```graphql
query {
  usuario(id: "550e8400-e29b-41d4-a716-446655440000") {
    id
    nome
    idade
  }
  
  playlists {
    id
    nome
    usuario_id
  }
}
```

---

## 5️⃣ Script Completo (Node.js)

Salve como `complete-flow.js` e execute com `node complete-flow.js`:

```javascript
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000/api';

async function completeFlow() {
  try {
    // 1. Criar usuário
    console.log('1. Criando usuário...');
    const usuario = await fetch(`${BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'João Silva',
        idade: 28
      })
    }).then(r => r.json());
    console.log('✓ Usuário criado:', usuario.nome);

    // 2. Criar músicas
    console.log('\n2. Criando músicas...');
    const musica1 = await fetch(`${BASE_URL}/musicas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Bohemian Rhapsody',
        artista: 'Queen'
      })
    }).then(r => r.json());

    const musica2 = await fetch(`${BASE_URL}/musicas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Stairway to Heaven',
        artista: 'Led Zeppelin'
      })
    }).then(r => r.json());
    console.log('✓ Músicas criadas:', musica1[0].nome, ',', musica2[0].nome);

    // 3. Criar playlist
    console.log('\n3. Criando playlist...');
    const playlist = await fetch(`${BASE_URL}/playlists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Rock Classics',
        usuario_id: usuario.id
      })
    }).then(r => r.json());
    console.log('✓ Playlist criada:', playlist[0].nome);

    // 4. Adicionar músicas à playlist
    console.log('\n4. Adicionando músicas à playlist...');
    await fetch(`${BASE_URL}/playlist-musicas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playlist_id: playlist[0].id,
        musica_id: musica1[0].id
      })
    });

    await fetch(`${BASE_URL}/playlist-musicas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playlist_id: playlist[0].id,
        musica_id: musica2[0].id
      })
    });
    console.log('✓ Músicas adicionadas à playlist');

    // 5. Listar músicas da playlist
    console.log('\n5. Listando músicas da playlist...');
    const musicasPlaylist = await fetch(
      `${BASE_URL}/playlist-musicas/playlist/${playlist[0].id}`
    ).then(r => r.json());
    
    console.log('\nPlaylist:', playlist[0].nome);
    console.log('Músicas:');
    musicasPlaylist.forEach(pm => {
      console.log(`  - ${pm.musica.nome} - ${pm.musica.artista}`);
    });

    console.log('\n✅ Fluxo completo executado com sucesso!');
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

completeFlow();
```

---

## 🎯 Dicas de Uso

1. **Sempre crie o usuário primeiro** - A tabela usuario está ligada a auth.users.id
2. **Use UUIDs válidos** - Para o ID do usuário, use UUIDs v4
3. **Verifique os IDs retornados** - Após criar recursos, use os IDs retornados nas operações seguintes
4. **GraphQL oferece queries aninhadas** - Aproveite para buscar dados relacionados em uma única query
5. **REST é mais direto** - Bom para operações simples e CRUD básico
6. **SOAP tem contratos rígidos** - Use o WSDL como referência
7. **gRPC é eficiente** - Melhor para comunicação entre serviços

---

## 📚 Recursos

- Use Postman Collections para salvar suas requisições
- GraphQL Playground tem autocomplete e documentação integrada
- SoapUI é ótimo para testar APIs SOAP
- BloomRPC facilita testes de APIs gRPC
