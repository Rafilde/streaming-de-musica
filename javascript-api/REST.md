# 📡 REST API - Guia Completo de Uso

## 🚀 Informações Gerais

- **Base URL:** `http://localhost:3000`
- **Porta:** 3000
- **Formato:** JSON
- **Métodos HTTP:** GET, POST, PUT, DELETE
- **Headers necessários:** `Content-Type: application/json`

## 🔧 Iniciando a API

```bash
npm run start:rest
```

## 📊 Estrutura de Recursos

A API REST possui 4 recursos principais:

1. `/api/usuarios` - Gerenciamento de usuários
2. `/api/playlists` - Gerenciamento de playlists
3. `/api/musicas` - Gerenciamento de músicas
4. `/api/playlist-musicas` - Associação entre playlists e músicas

---

## 👤 USUARIOS

### 1. Listar Todos os Usuários

**Endpoint:** `GET /api/usuarios`

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/usuarios" -Method GET
```

**cURL:**
```bash
curl http://localhost:3000/api/usuarios
```

**Resposta:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "João Silva",
    "idade": 28
  }
]
```

---

### 2. Buscar Usuário por ID

**Endpoint:** `GET /api/usuarios/:id`

**PowerShell:**
```powershell
$id = "550e8400-e29b-41d4-a716-446655440000"
Invoke-RestMethod -Uri "http://localhost:3000/api/usuarios/$id" -Method GET
```

**cURL:**
```bash
curl http://localhost:3000/api/usuarios/550e8400-e29b-41d4-a716-446655440000
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

### 3. Criar Novo Usuário

**Endpoint:** `POST /api/usuarios`

**PowerShell:**
```powershell
$body = @{
    id = "550e8400-e29b-41d4-a716-446655440000"
    nome = "Maria Santos"
    idade = 25
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/usuarios" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

**cURL:**
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "Maria Santos",
    "idade": 25
  }'
```

**Body (JSON):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Maria Santos",
  "idade": 25
}
```

**Resposta:**
```json
[{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Maria Santos",
  "idade": 25
}]
```

**Observações:**
- O `id` deve ser um UUID válido (v4)
- O campo `nome` é obrigatório
- O campo `idade` é opcional

---

### 4. Atualizar Usuário

**Endpoint:** `PUT /api/usuarios/:id`

**PowerShell:**
```powershell
$id = "550e8400-e29b-41d4-a716-446655440000"
$body = @{
    nome = "Maria Santos Silva"
    idade = 26
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/usuarios/$id" `
    -Method PUT `
    -Body $body `
    -ContentType "application/json"
```

**cURL:**
```bash
curl -X PUT http://localhost:3000/api/usuarios/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Santos Silva",
    "idade": 26
  }'
```

**Body (JSON):**
```json
{
  "nome": "Maria Santos Silva",
  "idade": 26
}
```

**Resposta:**
```json
[{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Maria Santos Silva",
  "idade": 26
}]
```

---

### 5. Deletar Usuário

**Endpoint:** `DELETE /api/usuarios/:id`

**PowerShell:**
```powershell
$id = "550e8400-e29b-41d4-a716-446655440000"
Invoke-RestMethod -Uri "http://localhost:3000/api/usuarios/$id" -Method DELETE
```

**cURL:**
```bash
curl -X DELETE http://localhost:3000/api/usuarios/550e8400-e29b-41d4-a716-446655440000
```

**Resposta:**
```
204 No Content
```

---

## 🎵 MÚSICAS

### 1. Listar Todas as Músicas

**Endpoint:** `GET /api/musicas`

**PowerShell:**
```powershell
$musicas = Invoke-RestMethod -Uri "http://localhost:3000/api/musicas" -Method GET
$musicas | Format-Table
```

**cURL:**
```bash
curl http://localhost:3000/api/musicas
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Bohemian Rhapsody",
    "artista": "Queen"
  },
  {
    "id": 2,
    "nome": "Stairway to Heaven",
    "artista": "Led Zeppelin"
  }
]
```

---

### 2. Buscar Música por ID

**Endpoint:** `GET /api/musicas/:id`

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/musicas/1" -Method GET
```

**cURL:**
```bash
curl http://localhost:3000/api/musicas/1
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

### 3. Criar Nova Música

**Endpoint:** `POST /api/musicas`

**PowerShell:**
```powershell
$body = @{
    nome = "Hotel California"
    artista = "Eagles"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/musicas" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

**cURL:**
```bash
curl -X POST http://localhost:3000/api/musicas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Hotel California",
    "artista": "Eagles"
  }'
```

**Body (JSON):**
```json
{
  "nome": "Hotel California",
  "artista": "Eagles"
}
```

**Resposta:**
```json
[{
  "id": 3,
  "nome": "Hotel California",
  "artista": "Eagles"
}]
```

**Observações:**
- Ambos os campos `nome` e `artista` são obrigatórios
- O `id` é gerado automaticamente

---

### 4. Atualizar Música

**Endpoint:** `PUT /api/musicas/:id`

**PowerShell:**
```powershell
$body = @{
    nome = "Hotel California (Live)"
    artista = "Eagles"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/musicas/3" `
    -Method PUT `
    -Body $body `
    -ContentType "application/json"
```

**cURL:**
```bash
curl -X PUT http://localhost:3000/api/musicas/3 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Hotel California (Live)",
    "artista": "Eagles"
  }'
```

**Body (JSON):**
```json
{
  "nome": "Hotel California (Live)",
  "artista": "Eagles"
}
```

---

### 5. Deletar Música

**Endpoint:** `DELETE /api/musicas/:id`

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/musicas/3" -Method DELETE
```

**cURL:**
```bash
curl -X DELETE http://localhost:3000/api/musicas/3
```

**Resposta:**
```
204 No Content
```

---

## 📝 PLAYLISTS

### 1. Listar Todas as Playlists

**Endpoint:** `GET /api/playlists`

**PowerShell:**
```powershell
$playlists = Invoke-RestMethod -Uri "http://localhost:3000/api/playlists" -Method GET
$playlists | Format-Table
```

**cURL:**
```bash
curl http://localhost:3000/api/playlists
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Rock Classics",
    "usuario_id": "550e8400-e29b-41d4-a716-446655440000"
  }
]
```

---

### 2. Buscar Playlist por ID

**Endpoint:** `GET /api/playlists/:id`

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/playlists/1" -Method GET
```

**cURL:**
```bash
curl http://localhost:3000/api/playlists/1
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "Rock Classics",
  "usuario_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

### 3. Criar Nova Playlist

**Endpoint:** `POST /api/playlists`

**PowerShell:**
```powershell
$body = @{
    nome = "Minhas Favoritas"
    usuario_id = "550e8400-e29b-41d4-a716-446655440000"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/playlists" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

**cURL:**
```bash
curl -X POST http://localhost:3000/api/playlists \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Minhas Favoritas",
    "usuario_id": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

**Body (JSON):**
```json
{
  "nome": "Minhas Favoritas",
  "usuario_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Resposta:**
```json
[{
  "id": 2,
  "nome": "Minhas Favoritas",
  "usuario_id": "550e8400-e29b-41d4-a716-446655440000"
}]
```

**Observações:**
- O campo `nome` é obrigatório
- O `usuario_id` deve existir na tabela de usuários
- O `id` é gerado automaticamente

---

### 4. Atualizar Playlist

**Endpoint:** `PUT /api/playlists/:id`

**PowerShell:**
```powershell
$body = @{
    nome = "Minhas Favoritas 2024"
    usuario_id = "550e8400-e29b-41d4-a716-446655440000"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/playlists/2" `
    -Method PUT `
    -Body $body `
    -ContentType "application/json"
```

**cURL:**
```bash
curl -X PUT http://localhost:3000/api/playlists/2 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Minhas Favoritas 2024",
    "usuario_id": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

---

### 5. Deletar Playlist

**Endpoint:** `DELETE /api/playlists/:id`

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/playlists/2" -Method DELETE
```

**cURL:**
```bash
curl -X DELETE http://localhost:3000/api/playlists/2
```

**Resposta:**
```
204 No Content
```

**Observação:** Deletar uma playlist também remove todas as associações em `playlist_musica` (CASCADE)

---

## 🔗 PLAYLIST-MÚSICA (Associações)

### 1. Listar Todas as Associações

**Endpoint:** `GET /api/playlist-musicas`

**PowerShell:**
```powershell
$associacoes = Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas" -Method GET
$associacoes | Format-Table
```

**cURL:**
```bash
curl http://localhost:3000/api/playlist-musicas
```

**Resposta:**
```json
[
  {
    "id": 1,
    "playlist_id": 1,
    "musica_id": 1
  },
  {
    "id": 2,
    "playlist_id": 1,
    "musica_id": 2
  }
]
```

---

### 2. Buscar Associação por ID

**Endpoint:** `GET /api/playlist-musicas/:id`

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas/1" -Method GET
```

**cURL:**
```bash
curl http://localhost:3000/api/playlist-musicas/1
```

**Resposta:**
```json
{
  "id": 1,
  "playlist_id": 1,
  "musica_id": 1
}
```

---

### 3. Listar Músicas de uma Playlist

**Endpoint:** `GET /api/playlist-musicas/playlist/:playlist_id`

**PowerShell:**
```powershell
$musicasPlaylist = Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas/playlist/1" -Method GET

# Exibir de forma formatada
Write-Host "`nMúsicas na Playlist:" -ForegroundColor Cyan
foreach ($item in $musicasPlaylist) {
    Write-Host "  - $($item.musica.nome) - $($item.musica.artista)" -ForegroundColor White
}
```

**cURL:**
```bash
curl http://localhost:3000/api/playlist-musicas/playlist/1
```

**Resposta:**
```json
[
  {
    "id": 1,
    "playlist_id": 1,
    "musica_id": 1,
    "musica": {
      "id": 1,
      "nome": "Bohemian Rhapsody",
      "artista": "Queen"
    }
  },
  {
    "id": 2,
    "playlist_id": 1,
    "musica_id": 2,
    "musica": {
      "id": 2,
      "nome": "Stairway to Heaven",
      "artista": "Led Zeppelin"
    }
  }
]
```

---

### 4. Adicionar Música à Playlist

**Endpoint:** `POST /api/playlist-musicas`

**PowerShell:**
```powershell
$body = @{
    playlist_id = 1
    musica_id = 3
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

**cURL:**
```bash
curl -X POST http://localhost:3000/api/playlist-musicas \
  -H "Content-Type: application/json" \
  -d '{
    "playlist_id": 1,
    "musica_id": 3
  }'
```

**Body (JSON):**
```json
{
  "playlist_id": 1,
  "musica_id": 3
}
```

**Resposta:**
```json
[{
  "id": 3,
  "playlist_id": 1,
  "musica_id": 3
}]
```

**Observações:**
- Ambos `playlist_id` e `musica_id` são obrigatórios
- A playlist e a música devem existir
- Não há validação de duplicatas por padrão

---

### 5. Atualizar Associação

**Endpoint:** `PUT /api/playlist-musicas/:id`

**PowerShell:**
```powershell
$body = @{
    playlist_id = 2
    musica_id = 3
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas/3" `
    -Method PUT `
    -Body $body `
    -ContentType "application/json"
```

**cURL:**
```bash
curl -X PUT http://localhost:3000/api/playlist-musicas/3 \
  -H "Content-Type: application/json" \
  -d '{
    "playlist_id": 2,
    "musica_id": 3
  }'
```

---

### 6. Remover Música da Playlist

**Endpoint:** `DELETE /api/playlist-musicas/:id`

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas/3" -Method DELETE
```

**cURL:**
```bash
curl -X DELETE http://localhost:3000/api/playlist-musicas/3
```

**Resposta:**
```
204 No Content
```

---

## 🎯 Fluxo Completo de Exemplo

```powershell
# 1. Criar usuário
$usuario = @{
    id = (New-Guid).Guid
    nome = "João Silva"
    idade = 28
} | ConvertTo-Json

$usuarioResult = Invoke-RestMethod -Uri "http://localhost:3000/api/usuarios" `
    -Method POST -Body $usuario -ContentType "application/json"

Write-Host "✓ Usuário criado: $($usuarioResult[0].nome)" -ForegroundColor Green

# 2. Criar músicas
$musica1 = @{ nome = "Imagine"; artista = "John Lennon" } | ConvertTo-Json
$m1 = Invoke-RestMethod -Uri "http://localhost:3000/api/musicas" `
    -Method POST -Body $musica1 -ContentType "application/json"

$musica2 = @{ nome = "Yesterday"; artista = "The Beatles" } | ConvertTo-Json
$m2 = Invoke-RestMethod -Uri "http://localhost:3000/api/musicas" `
    -Method POST -Body $musica2 -ContentType "application/json"

Write-Host "✓ Músicas criadas" -ForegroundColor Green

# 3. Criar playlist
$playlist = @{
    nome = "Clássicos dos Beatles"
    usuario_id = $usuarioResult[0].id
} | ConvertTo-Json

$playlistResult = Invoke-RestMethod -Uri "http://localhost:3000/api/playlists" `
    -Method POST -Body $playlist -ContentType "application/json"

Write-Host "✓ Playlist criada: $($playlistResult[0].nome)" -ForegroundColor Green

# 4. Adicionar músicas à playlist
$pm1 = @{
    playlist_id = $playlistResult[0].id
    musica_id = $m1[0].id
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas" `
    -Method POST -Body $pm1 -ContentType "application/json" | Out-Null

$pm2 = @{
    playlist_id = $playlistResult[0].id
    musica_id = $m2[0].id
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas" `
    -Method POST -Body $pm2 -ContentType "application/json" | Out-Null

Write-Host "✓ Músicas adicionadas à playlist" -ForegroundColor Green

# 5. Listar resultado final
$musicasPlaylist = Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas/playlist/$($playlistResult[0].id)"

Write-Host "`nPlaylist: $($playlistResult[0].nome)" -ForegroundColor Yellow
Write-Host "Músicas:" -ForegroundColor Yellow
foreach ($pm in $musicasPlaylist) {
    Write-Host "  - $($pm.musica.nome) - $($pm.musica.artista)" -ForegroundColor White
}
```

---

## ⚠️ Tratamento de Erros

### Códigos de Status HTTP

| Código | Significado | Quando Ocorre |
|--------|-------------|---------------|
| 200 | OK | Operação bem-sucedida (GET, PUT) |
| 201 | Created | Recurso criado com sucesso (POST) |
| 204 | No Content | Recurso deletado com sucesso (DELETE) |
| 400 | Bad Request | Dados inválidos ou erro no Supabase |
| 404 | Not Found | Recurso não encontrado |
| 500 | Internal Server Error | Erro no servidor |

### Exemplo de Erro

```json
{
  "error": "duplicate key value violates unique constraint \"usuario_pkey\""
}
```

### Tratamento em PowerShell

```powershell
try {
    $result = Invoke-RestMethod -Uri "http://localhost:3000/api/usuarios/id-invalido" -Method GET
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    $statusDescription = $_.Exception.Response.StatusDescription
    
    Write-Host "Erro $statusCode : $statusDescription" -ForegroundColor Red
    
    # Tentar ler mensagem de erro do body
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorBody = $reader.ReadToEnd()
    Write-Host $errorBody -ForegroundColor Yellow
}
```

---

## 📚 Recursos Adicionais

### Ferramentas Recomendadas

- **Postman** - Cliente GUI para testar APIs REST
- **Insomnia** - Alternativa ao Postman
- **Thunder Client** - Extensão do VS Code
- **PowerShell** - Built-in no Windows

### Headers Úteis

```http
Content-Type: application/json
Accept: application/json
```

### Tips & Tricks

1. **Use variáveis** para armazenar IDs retornados
2. **Format-Table** para visualizar arrays
3. **ConvertTo-Json** sempre que enviar body
4. **Teste endpoint por endpoint** antes de fluxos completos
5. **Verifique os logs** do servidor para debugging

---

## 🔗 Links Relacionados

- [Documentação GraphQL](./GRAPHQL.md)
- [Documentação SOAP](./SOAP.md)
- [Documentação gRPC](./GRPC.md)
- [Comandos PowerShell](./COMANDOS-POWERSHELL.md)
- [Fluxo Completo](./FLUXO-COMPLETO.md)
