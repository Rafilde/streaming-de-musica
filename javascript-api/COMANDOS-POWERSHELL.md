# 🎯 Comandos PowerShell Úteis - Music Streaming API

Este arquivo contém comandos PowerShell prontos para testar e usar as APIs.

## 📦 Instalação e Setup

```powershell
# Navegar para o diretório do projeto
cd c:\Users\siwan\Documents\streaming-de-musica\javascript-api

# Instalar dependências
npm install

# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version
```

## 🚀 Iniciar APIs

```powershell
# Iniciar REST API
npm run start:rest

# Iniciar GraphQL API
npm run start:graphql

# Iniciar SOAP API
npm run start:soap

# Iniciar gRPC API
npm run start:grpc

# Modo desenvolvimento (auto-reload)
npm run dev:rest
npm run dev:graphql
npm run dev:soap
npm run dev:grpc
```

## 🔍 Verificar Status das APIs

```powershell
# Testar REST API
Invoke-RestMethod -Uri "http://localhost:3000" -Method GET

# Testar GraphQL API
Invoke-RestMethod -Uri "http://localhost:4000/graphql" -Method GET

# Testar SOAP API (ver WSDL)
Invoke-WebRequest -Uri "http://localhost:5000/wsdl?wsdl" | Select-Object -ExpandProperty Content

# Executar teste completo de todas as APIs
npm test
```

## 🎵 REST API - Operações Completas

### Músicas

```powershell
# Criar uma música
$body = @{
    nome = "Bohemian Rhapsody"
    artista = "Queen"
} | ConvertTo-Json

$musica = Invoke-RestMethod -Uri "http://localhost:3000/api/musicas" -Method POST -Body $body -ContentType "application/json"
$musica

# Listar todas as músicas
$musicas = Invoke-RestMethod -Uri "http://localhost:3000/api/musicas" -Method GET
$musicas | Format-Table

# Buscar música específica
$musica = Invoke-RestMethod -Uri "http://localhost:3000/api/musicas/1" -Method GET
$musica

# Atualizar música
$body = @{
    nome = "Bohemian Rhapsody (Remastered)"
    artista = "Queen"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/musicas/1" -Method PUT -Body $body -ContentType "application/json"

# Deletar música
Invoke-RestMethod -Uri "http://localhost:3000/api/musicas/1" -Method DELETE
```

### Usuários

```powershell
# Criar usuário
$body = @{
    id = "550e8400-e29b-41d4-a716-446655440000"
    nome = "João Silva"
    idade = 28
} | ConvertTo-Json

$usuario = Invoke-RestMethod -Uri "http://localhost:3000/api/usuarios" -Method POST -Body $body -ContentType "application/json"
$usuario

# Listar todos os usuários
$usuarios = Invoke-RestMethod -Uri "http://localhost:3000/api/usuarios" -Method GET
$usuarios | Format-Table

# Buscar usuário específico
$usuario = Invoke-RestMethod -Uri "http://localhost:3000/api/usuarios/550e8400-e29b-41d4-a716-446655440000" -Method GET
$usuario

# Atualizar usuário
$body = @{
    nome = "João Silva Santos"
    idade = 29
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/usuarios/550e8400-e29b-41d4-a716-446655440000" -Method PUT -Body $body -ContentType "application/json"

# Deletar usuário
Invoke-RestMethod -Uri "http://localhost:3000/api/usuarios/550e8400-e29b-41d4-a716-446655440000" -Method DELETE
```

### Playlists

```powershell
# Criar playlist
$body = @{
    nome = "Rock Classics"
    usuario_id = "550e8400-e29b-41d4-a716-446655440000"
} | ConvertTo-Json

$playlist = Invoke-RestMethod -Uri "http://localhost:3000/api/playlists" -Method POST -Body $body -ContentType "application/json"
$playlist

# Listar todas as playlists
$playlists = Invoke-RestMethod -Uri "http://localhost:3000/api/playlists" -Method GET
$playlists | Format-Table

# Buscar playlist específica
$playlist = Invoke-RestMethod -Uri "http://localhost:3000/api/playlists/1" -Method GET
$playlist

# Atualizar playlist
$body = @{
    nome = "Rock Classics - Updated"
    usuario_id = "550e8400-e29b-41d4-a716-446655440000"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/playlists/1" -Method PUT -Body $body -ContentType "application/json"

# Deletar playlist
Invoke-RestMethod -Uri "http://localhost:3000/api/playlists/1" -Method DELETE
```

### Playlist-Música

```powershell
# Adicionar música à playlist
$body = @{
    playlist_id = 1
    musica_id = 1
} | ConvertTo-Json

$pm = Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas" -Method POST -Body $body -ContentType "application/json"
$pm

# Listar todas as associações
$pms = Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas" -Method GET
$pms | Format-Table

# Listar músicas de uma playlist específica
$musicasPlaylist = Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas/playlist/1" -Method GET
$musicasPlaylist | Format-Table

# Remover música da playlist
Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas/1" -Method DELETE
```

## 📊 GraphQL - Queries via PowerShell

```powershell
# Query: Listar todas as músicas
$query = @{
    query = "{ musicas { id nome artista } }"
} | ConvertTo-Json

$result = Invoke-RestMethod -Uri "http://localhost:4000/graphql" -Method POST -Body $query -ContentType "application/json"
$result.data.musicas

# Mutation: Criar música
$query = @{
    query = "mutation { createMusica(input: { nome: \"Hotel California\", artista: \"Eagles\" }) { id nome artista } }"
} | ConvertTo-Json

$result = Invoke-RestMethod -Uri "http://localhost:4000/graphql" -Method POST -Body $query -ContentType "application/json"
$result.data.createMusica

# Query: Buscar músicas de uma playlist
$query = @{
    query = "query { musicasByPlaylist(playlist_id: 1) { musica { nome artista } } }"
} | ConvertTo-Json

$result = Invoke-RestMethod -Uri "http://localhost:4000/graphql" -Method POST -Body $query -ContentType "application/json"
$result.data.musicasByPlaylist
```

## 🔄 Fluxo Completo em PowerShell

```powershell
# Script completo: Criar usuário, playlist e adicionar músicas

# 1. Criar usuário
Write-Host "1. Criando usuário..." -ForegroundColor Cyan
$usuario = @{
    id = New-Guid | Select-Object -ExpandProperty Guid
    nome = "Maria Santos"
    idade = 25
} | ConvertTo-Json

$usuarioResult = Invoke-RestMethod -Uri "http://localhost:3000/api/usuarios" -Method POST -Body $usuario -ContentType "application/json"
Write-Host "✓ Usuário criado: $($usuarioResult.nome)" -ForegroundColor Green

# 2. Criar músicas
Write-Host "`n2. Criando músicas..." -ForegroundColor Cyan
$musica1 = @{
    nome = "Imagine"
    artista = "John Lennon"
} | ConvertTo-Json

$musica1Result = Invoke-RestMethod -Uri "http://localhost:3000/api/musicas" -Method POST -Body $musica1 -ContentType "application/json"

$musica2 = @{
    nome = "Yesterday"
    artista = "The Beatles"
} | ConvertTo-Json

$musica2Result = Invoke-RestMethod -Uri "http://localhost:3000/api/musicas" -Method POST -Body $musica2 -ContentType "application/json"
Write-Host "✓ Músicas criadas" -ForegroundColor Green

# 3. Criar playlist
Write-Host "`n3. Criando playlist..." -ForegroundColor Cyan
$playlist = @{
    nome = "Minhas Favoritas"
    usuario_id = $usuarioResult.id
} | ConvertTo-Json

$playlistResult = Invoke-RestMethod -Uri "http://localhost:3000/api/playlists" -Method POST -Body $playlist -ContentType "application/json"
Write-Host "✓ Playlist criada: $($playlistResult[0].nome)" -ForegroundColor Green

# 4. Adicionar músicas à playlist
Write-Host "`n4. Adicionando músicas à playlist..." -ForegroundColor Cyan
$pm1 = @{
    playlist_id = $playlistResult[0].id
    musica_id = $musica1Result[0].id
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas" -Method POST -Body $pm1 -ContentType "application/json" | Out-Null

$pm2 = @{
    playlist_id = $playlistResult[0].id
    musica_id = $musica2Result[0].id
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas" -Method POST -Body $pm2 -ContentType "application/json" | Out-Null
Write-Host "✓ Músicas adicionadas" -ForegroundColor Green

# 5. Listar resultado
Write-Host "`n5. Resultado final:" -ForegroundColor Cyan
$musicasPlaylist = Invoke-RestMethod -Uri "http://localhost:3000/api/playlist-musicas/playlist/$($playlistResult[0].id)" -Method GET

Write-Host "`nPlaylist: $($playlistResult[0].nome)" -ForegroundColor Yellow
Write-Host "Usuário: $($usuarioResult.nome)" -ForegroundColor Yellow
Write-Host "Músicas:" -ForegroundColor Yellow
foreach ($pm in $musicasPlaylist) {
    Write-Host "  - $($pm.musica.nome) - $($pm.musica.artista)" -ForegroundColor White
}

Write-Host "`n✅ Fluxo completo executado com sucesso!" -ForegroundColor Green
```

## 🛠️ Utilitários

```powershell
# Limpar cache do npm
npm cache clean --force

# Reinstalar dependências
Remove-Item -Recurse -Force node_modules
npm install

# Ver processos Node.js rodando
Get-Process node

# Matar processo específico (substitua PID)
Stop-Process -Id PID

# Matar todos os processos Node.js
Get-Process node | Stop-Process -Force

# Verificar portas em uso
netstat -ano | findstr :3000
netstat -ano | findstr :4000
netstat -ano | findstr :5000
netstat -ano | findstr :50051

# Abrir GraphQL Playground no navegador
Start-Process "http://localhost:4000/graphql"

# Abrir WSDL no navegador
Start-Process "http://localhost:5000/wsdl?wsdl"
```

## 📝 Scripts Personalizados

```powershell
# Função para criar UUID v4
function New-UUID {
    [guid]::NewGuid().ToString()
}

# Exemplo de uso
$novoId = New-UUID
Write-Host "Novo UUID: $novoId"

# Função para formatar JSON de resposta
function Format-JsonResponse {
    param($response)
    $response | ConvertTo-Json -Depth 10 | Write-Host
}

# Exemplo de uso
$musicas = Invoke-RestMethod -Uri "http://localhost:3000/api/musicas"
Format-JsonResponse $musicas
```

## 🎯 Debugging

```powershell
# Ver logs detalhados de requisição HTTP
$DebugPreference = "Continue"
Invoke-RestMethod -Uri "http://localhost:3000/api/musicas" -Method GET -Debug
$DebugPreference = "SilentlyContinue"

# Capturar erro detalhado
try {
    Invoke-RestMethod -Uri "http://localhost:3000/api/musicas/999" -Method GET
} catch {
    Write-Host "Status Code:" $_.Exception.Response.StatusCode.value__
    Write-Host "Status Description:" $_.Exception.Response.StatusDescription
    $_.Exception | Format-List -Force
}

# Testar conectividade
Test-NetConnection -ComputerName localhost -Port 3000
Test-NetConnection -ComputerName localhost -Port 4000
Test-NetConnection -ComputerName localhost -Port 5000
Test-NetConnection -ComputerName localhost -Port 50051
```

## 💡 Dicas

1. Use `Format-Table` para visualizar arrays de forma tabular
2. Use `ConvertTo-Json -Depth 10` para ver JSON completo
3. Salve respostas em variáveis para reutilizar IDs
4. Use `Write-Host` com cores para melhor visualização
5. Teste uma API por vez para facilitar debugging

## 📚 Referências

- [Documentação PowerShell](https://docs.microsoft.com/powershell/)
- [Invoke-RestMethod](https://docs.microsoft.com/powershell/module/microsoft.powershell.utility/invoke-restmethod)
- [Invoke-WebRequest](https://docs.microsoft.com/powershell/module/microsoft.powershell.utility/invoke-webrequest)
