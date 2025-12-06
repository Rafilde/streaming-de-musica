# 🧼 SOAP API - Guia Completo de Uso

## 🚀 Informações Gerais

- **Endpoint:** `http://localhost:5000/wsdl`
- **Porta:** 5000
- **WSDL:** `http://localhost:5000/wsdl?wsdl`
- **Protocolo:** SOAP 1.1/1.2
- **Formato:** XML
- **Estilo:** RPC/Literal

## 🔧 Iniciando a API

```bash
npm run start:soap
```

Acesse o WSDL: `http://localhost:5000/wsdl?wsdl`

## 📋 O que é SOAP?

**SOAP (Simple Object Access Protocol)** é um protocolo baseado em XML para troca de informações estruturadas em ambientes descentralizados e distribuídos.

### Características

✅ **Protocolo padrão** - Especificação W3C  
✅ **Independente de plataforma** - Funciona em qualquer SO  
✅ **Fortemente tipado** - Validação via WSDL  
✅ **Suporte a transações** - ACID compliant  
✅ **Segurança robusta** - WS-Security  
✅ **Descoberta de serviços** - Via WSDL  

### Estrutura de uma Requisição SOAP

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ns:getMusicas xmlns:ns="http://localhost:5000/wsdl"/>
  </soap:Body>
</soap:Envelope>
```

---

## 📖 WSDL (Web Services Description Language)

O WSDL descreve todas as operações, tipos de dados e endpoints do serviço.

**Acessar WSDL:**
```
http://localhost:5000/wsdl?wsdl
```

### Seções do WSDL

1. **Types** - Definição dos tipos de dados
2. **Messages** - Mensagens de entrada/saída
3. **PortType** - Operações disponíveis
4. **Binding** - Protocolo e formato
5. **Service** - Endpoint do serviço

---

## 🔧 Configurando Cliente SOAP

### Node.js

```bash
npm install soap
```

```javascript
const soap = require('soap');

const url = 'http://localhost:5000/wsdl?wsdl';

soap.createClient(url, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  
  // Usar o cliente aqui
  console.log('Cliente SOAP criado com sucesso!');
});
```

### PowerShell (Built-in)

```powershell
# PowerShell tem suporte nativo a SOAP via New-WebServiceProxy
$wsdl = "http://localhost:5000/wsdl?wsdl"
$proxy = New-WebServiceProxy -Uri $wsdl -Namespace MusicAPI
```

---

## 👤 OPERAÇÕES - USUARIO

### 1. createUsuario

Cria um novo usuário no sistema.

**Parâmetros:**
- `id` (string) - UUID do usuário
- `nome` (string) - Nome do usuário
- `idade` (int) - Idade do usuário

**Node.js:**
```javascript
const soap = require('soap');

async function createUsuario() {
  const client = await soap.createClientAsync('http://localhost:5000/wsdl?wsdl');
  
  const args = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    nome: 'João Silva',
    idade: 28
  };
  
  const result = await client.createUsuarioAsync(args);
  console.log(result);
}

createUsuario();
```

**PowerShell:**
```powershell
$proxy = New-WebServiceProxy -Uri "http://localhost:5000/wsdl?wsdl"

$result = $proxy.createUsuario(
    "550e8400-e29b-41d4-a716-446655440000",
    "João Silva",
    28
)

$result.result
```

**Requisição SOAP (XML):**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ns:createUsuario xmlns:ns="http://localhost:5000/wsdl">
      <id>550e8400-e29b-41d4-a716-446655440000</id>
      <nome>João Silva</nome>
      <idade>28</idade>
    </ns:createUsuario>
  </soap:Body>
</soap:Envelope>
```

**Resposta:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ns:createUsuarioResponse xmlns:ns="http://localhost:5000/wsdl">
      <result>[{"id":"550e8400-e29b-41d4-a716-446655440000","nome":"João Silva","idade":28}]</result>
    </ns:createUsuarioResponse>
  </soap:Body>
</soap:Envelope>
```

---

### 2. getUsuarios

Lista todos os usuários.

**Parâmetros:** Nenhum

**Node.js:**
```javascript
const result = await client.getUsuariosAsync({});
const usuarios = JSON.parse(result[0].result);
console.log(usuarios);
```

**PowerShell:**
```powershell
$result = $proxy.getUsuarios()
$usuarios = $result.result | ConvertFrom-Json
$usuarios | Format-Table
```

---

### 3. getUsuario

Busca um usuário específico por ID.

**Parâmetros:**
- `id` (string) - UUID do usuário

**Node.js:**
```javascript
const result = await client.getUsuarioAsync({
  id: '550e8400-e29b-41d4-a716-446655440000'
});

const usuario = JSON.parse(result[0].result);
console.log(usuario);
```

**PowerShell:**
```powershell
$result = $proxy.getUsuario("550e8400-e29b-41d4-a716-446655440000")
$usuario = $result.result | ConvertFrom-Json
$usuario
```

---

### 4. updateUsuario

Atualiza dados de um usuário.

**Parâmetros:**
- `id` (string) - UUID do usuário
- `nome` (string) - Novo nome
- `idade` (int) - Nova idade

**Node.js:**
```javascript
const result = await client.updateUsuarioAsync({
  id: '550e8400-e29b-41d4-a716-446655440000',
  nome: 'João Silva Santos',
  idade: 29
});

console.log(JSON.parse(result[0].result));
```

**PowerShell:**
```powershell
$result = $proxy.updateUsuario(
    "550e8400-e29b-41d4-a716-446655440000",
    "João Silva Santos",
    29
)

$result.result | ConvertFrom-Json
```

---

### 5. deleteUsuario

Remove um usuário do sistema.

**Parâmetros:**
- `id` (string) - UUID do usuário

**Node.js:**
```javascript
const result = await client.deleteUsuarioAsync({
  id: '550e8400-e29b-41d4-a716-446655440000'
});

console.log(result[0].result); // "Usuario deleted successfully"
```

**PowerShell:**
```powershell
$result = $proxy.deleteUsuario("550e8400-e29b-41d4-a716-446655440000")
$result.result
```

---

## 🎵 OPERAÇÕES - MUSICA

### 1. createMusica

Cria uma nova música.

**Parâmetros:**
- `nome` (string) - Nome da música
- `artista` (string) - Nome do artista

**Node.js:**
```javascript
const result = await client.createMusicaAsync({
  nome: 'Bohemian Rhapsody',
  artista: 'Queen'
});

console.log(JSON.parse(result[0].result));
```

**PowerShell:**
```powershell
$result = $proxy.createMusica("Bohemian Rhapsody", "Queen")
$result.result | ConvertFrom-Json
```

---

### 2. getMusicas

Lista todas as músicas.

**Node.js:**
```javascript
const result = await client.getMusicasAsync({});
const musicas = JSON.parse(result[0].result);
console.log(musicas);
```

**PowerShell:**
```powershell
$result = $proxy.getMusicas()
$musicas = $result.result | ConvertFrom-Json
$musicas | Format-Table -Property id, nome, artista
```

---

### 3. getMusica

Busca uma música específica.

**Parâmetros:**
- `id` (int) - ID da música

**Node.js:**
```javascript
const result = await client.getMusicaAsync({ id: 1 });
const musica = JSON.parse(result[0].result);
console.log(musica);
```

**PowerShell:**
```powershell
$result = $proxy.getMusica(1)
$musica = $result.result | ConvertFrom-Json
$musica
```

---

### 4. updateMusica

Atualiza dados de uma música.

**Parâmetros:**
- `id` (int) - ID da música
- `nome` (string) - Novo nome
- `artista` (string) - Novo artista

**Node.js:**
```javascript
const result = await client.updateMusicaAsync({
  id: 1,
  nome: 'Bohemian Rhapsody (Remastered)',
  artista: 'Queen'
});

console.log(JSON.parse(result[0].result));
```

**PowerShell:**
```powershell
$result = $proxy.updateMusica(1, "Bohemian Rhapsody (Remastered)", "Queen")
$result.result | ConvertFrom-Json
```

---

### 5. deleteMusica

Remove uma música.

**Parâmetros:**
- `id` (int) - ID da música

**Node.js:**
```javascript
const result = await client.deleteMusicaAsync({ id: 1 });
console.log(result[0].result); // "Musica deleted successfully"
```

**PowerShell:**
```powershell
$result = $proxy.deleteMusica(1)
$result.result
```

---

## 📝 OPERAÇÕES - PLAYLIST

### 1. createPlaylist

Cria uma nova playlist.

**Parâmetros:**
- `nome` (string) - Nome da playlist
- `usuario_id` (string) - UUID do usuário proprietário

**Node.js:**
```javascript
const result = await client.createPlaylistAsync({
  nome: 'Rock Classics',
  usuario_id: '550e8400-e29b-41d4-a716-446655440000'
});

console.log(JSON.parse(result[0].result));
```

**PowerShell:**
```powershell
$result = $proxy.createPlaylist(
    "Rock Classics",
    "550e8400-e29b-41d4-a716-446655440000"
)

$result.result | ConvertFrom-Json
```

---

### 2. getPlaylists

Lista todas as playlists.

**Node.js:**
```javascript
const result = await client.getPlaylistsAsync({});
const playlists = JSON.parse(result[0].result);
console.log(playlists);
```

**PowerShell:**
```powershell
$result = $proxy.getPlaylists()
$playlists = $result.result | ConvertFrom-Json
$playlists | Format-Table
```

---

### 3. getPlaylist

Busca uma playlist específica.

**Parâmetros:**
- `id` (int) - ID da playlist

**Node.js:**
```javascript
const result = await client.getPlaylistAsync({ id: 1 });
const playlist = JSON.parse(result[0].result);
console.log(playlist);
```

**PowerShell:**
```powershell
$result = $proxy.getPlaylist(1)
$playlist = $result.result | ConvertFrom-Json
$playlist
```

---

### 4. updatePlaylist

Atualiza dados de uma playlist.

**Parâmetros:**
- `id` (int) - ID da playlist
- `nome` (string) - Novo nome
- `usuario_id` (string) - Novo UUID do usuário

**Node.js:**
```javascript
const result = await client.updatePlaylistAsync({
  id: 1,
  nome: 'Rock Classics - Updated',
  usuario_id: '550e8400-e29b-41d4-a716-446655440000'
});

console.log(JSON.parse(result[0].result));
```

**PowerShell:**
```powershell
$result = $proxy.updatePlaylist(
    1,
    "Rock Classics - Updated",
    "550e8400-e29b-41d4-a716-446655440000"
)

$result.result | ConvertFrom-Json
```

---

### 5. deletePlaylist

Remove uma playlist.

**Parâmetros:**
- `id` (int) - ID da playlist

**Node.js:**
```javascript
const result = await client.deletePlaylistAsync({ id: 1 });
console.log(result[0].result); // "Playlist deleted successfully"
```

**PowerShell:**
```powershell
$result = $proxy.deletePlaylist(1)
$result.result
```

---

## 🔗 OPERAÇÕES - PLAYLIST_MUSICA

### 1. createPlaylistMusica

Adiciona uma música a uma playlist.

**Parâmetros:**
- `playlist_id` (int) - ID da playlist
- `musica_id` (int) - ID da música

**Node.js:**
```javascript
const result = await client.createPlaylistMusicaAsync({
  playlist_id: 1,
  musica_id: 1
});

console.log(JSON.parse(result[0].result));
```

**PowerShell:**
```powershell
$result = $proxy.createPlaylistMusica(1, 1)
$result.result | ConvertFrom-Json
```

---

### 2. getPlaylistMusicas

Lista todas as associações.

**Node.js:**
```javascript
const result = await client.getPlaylistMusicasAsync({});
const associacoes = JSON.parse(result[0].result);
console.log(associacoes);
```

**PowerShell:**
```powershell
$result = $proxy.getPlaylistMusicas()
$associacoes = $result.result | ConvertFrom-Json
$associacoes | Format-Table
```

---

### 3. getPlaylistMusica

Busca uma associação específica.

**Parâmetros:**
- `id` (int) - ID da associação

**Node.js:**
```javascript
const result = await client.getPlaylistMusicaAsync({ id: 1 });
const associacao = JSON.parse(result[0].result);
console.log(associacao);
```

**PowerShell:**
```powershell
$result = $proxy.getPlaylistMusica(1)
$associacao = $result.result | ConvertFrom-Json
$associacao
```

---

### 4. getMusicasByPlaylist

Lista todas as músicas de uma playlist específica.

**Parâmetros:**
- `playlist_id` (int) - ID da playlist

**Node.js:**
```javascript
const result = await client.getMusicasByPlaylistAsync({
  playlist_id: 1
});

const musicas = JSON.parse(result[0].result);
console.log('Músicas na playlist:');
musicas.forEach(pm => {
  console.log(`- ${pm.musica.nome} - ${pm.musica.artista}`);
});
```

**PowerShell:**
```powershell
$result = $proxy.getMusicasByPlaylist(1)
$musicas = $result.result | ConvertFrom-Json

Write-Host "`nMúsicas na Playlist:" -ForegroundColor Cyan
foreach ($item in $musicas) {
    Write-Host "  - $($item.musica.nome) - $($item.musica.artista)" -ForegroundColor White
}
```

---

### 5. updatePlaylistMusica

Atualiza uma associação.

**Parâmetros:**
- `id` (int) - ID da associação
- `playlist_id` (int) - Novo ID da playlist
- `musica_id` (int) - Novo ID da música

**Node.js:**
```javascript
const result = await client.updatePlaylistMusicaAsync({
  id: 1,
  playlist_id: 2,
  musica_id: 3
});

console.log(JSON.parse(result[0].result));
```

**PowerShell:**
```powershell
$result = $proxy.updatePlaylistMusica(1, 2, 3)
$result.result | ConvertFrom-Json
```

---

### 6. deletePlaylistMusica

Remove uma música da playlist.

**Parâmetros:**
- `id` (int) - ID da associação

**Node.js:**
```javascript
const result = await client.deletePlaylistMusicaAsync({ id: 1 });
console.log(result[0].result); // "PlaylistMusica deleted successfully"
```

**PowerShell:**
```powershell
$result = $proxy.deletePlaylistMusica(1)
$result.result
```

---

## 🎯 Fluxo Completo - Node.js

```javascript
const soap = require('soap');

async function fluxoCompleto() {
  const url = 'http://localhost:5000/wsdl?wsdl';
  const client = await soap.createClientAsync(url);
  
  try {
    // 1. Criar usuário
    console.log('1. Criando usuário...');
    const usuario = await client.createUsuarioAsync({
      id: '550e8400-e29b-41d4-a716-446655440000',
      nome: 'Ana Costa',
      idade: 27
    });
    console.log('✓ Usuário criado');
    
    // 2. Criar músicas
    console.log('\n2. Criando músicas...');
    const musica1 = await client.createMusicaAsync({
      nome: 'Sweet Child O Mine',
      artista: 'Guns N Roses'
    });
    
    const musica2 = await client.createMusicaAsync({
      nome: 'November Rain',
      artista: 'Guns N Roses'
    });
    console.log('✓ Músicas criadas');
    
    const m1 = JSON.parse(musica1[0].result)[0];
    const m2 = JSON.parse(musica2[0].result)[0];
    
    // 3. Criar playlist
    console.log('\n3. Criando playlist...');
    const playlist = await client.createPlaylistAsync({
      nome: 'Guns N Roses Hits',
      usuario_id: '550e8400-e29b-41d4-a716-446655440000'
    });
    const p = JSON.parse(playlist[0].result)[0];
    console.log('✓ Playlist criada:', p.nome);
    
    // 4. Adicionar músicas à playlist
    console.log('\n4. Adicionando músicas...');
    await client.createPlaylistMusicaAsync({
      playlist_id: p.id,
      musica_id: m1.id
    });
    
    await client.createPlaylistMusicaAsync({
      playlist_id: p.id,
      musica_id: m2.id
    });
    console.log('✓ Músicas adicionadas');
    
    // 5. Listar resultado
    console.log('\n5. Resultado final:');
    const result = await client.getMusicasByPlaylistAsync({
      playlist_id: p.id
    });
    
    const musicasPlaylist = JSON.parse(result[0].result);
    console.log(`\nPlaylist: ${p.nome}`);
    console.log('Músicas:');
    musicasPlaylist.forEach(pm => {
      console.log(`  - ${pm.musica.nome} - ${pm.musica.artista}`);
    });
    
    console.log('\n✅ Fluxo completo executado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

fluxoCompleto();
```

---

## 🎯 Fluxo Completo - PowerShell

```powershell
# Criar proxy SOAP
$proxy = New-WebServiceProxy -Uri "http://localhost:5000/wsdl?wsdl" -Namespace MusicAPI

try {
    # 1. Criar usuário
    Write-Host "1. Criando usuário..." -ForegroundColor Cyan
    $usuarioResult = $proxy.createUsuario(
        "550e8400-e29b-41d4-a716-446655440000",
        "Ana Costa",
        27
    )
    Write-Host "✓ Usuário criado" -ForegroundColor Green
    
    # 2. Criar músicas
    Write-Host "`n2. Criando músicas..." -ForegroundColor Cyan
    $m1Result = $proxy.createMusica("Sweet Child O' Mine", "Guns N' Roses")
    $m2Result = $proxy.createMusica("November Rain", "Guns N' Roses")
    
    $m1 = ($m1Result.result | ConvertFrom-Json)[0]
    $m2 = ($m2Result.result | ConvertFrom-Json)[0]
    Write-Host "✓ Músicas criadas" -ForegroundColor Green
    
    # 3. Criar playlist
    Write-Host "`n3. Criando playlist..." -ForegroundColor Cyan
    $playlistResult = $proxy.createPlaylist(
        "Guns N' Roses Hits",
        "550e8400-e29b-41d4-a716-446655440000"
    )
    $playlist = ($playlistResult.result | ConvertFrom-Json)[0]
    Write-Host "✓ Playlist criada: $($playlist.nome)" -ForegroundColor Green
    
    # 4. Adicionar músicas
    Write-Host "`n4. Adicionando músicas..." -ForegroundColor Cyan
    $proxy.createPlaylistMusica($playlist.id, $m1.id) | Out-Null
    $proxy.createPlaylistMusica($playlist.id, $m2.id) | Out-Null
    Write-Host "✓ Músicas adicionadas" -ForegroundColor Green
    
    # 5. Listar resultado
    Write-Host "`n5. Resultado final:" -ForegroundColor Cyan
    $musicasResult = $proxy.getMusicasByPlaylist($playlist.id)
    $musicas = $musicasResult.result | ConvertFrom-Json
    
    Write-Host "`nPlaylist: $($playlist.nome)" -ForegroundColor Yellow
    Write-Host "Músicas:" -ForegroundColor Yellow
    foreach ($item in $musicas) {
        Write-Host "  - $($item.musica.nome) - $($item.musica.artista)" -ForegroundColor White
    }
    
    Write-Host "`n✅ Fluxo completo executado com sucesso!" -ForegroundColor Green
    
} catch {
    Write-Host "`n❌ Erro: $($_.Exception.Message)" -ForegroundColor Red
}
```

---

## 🛠️ Ferramentas para Testar SOAP

### 1. SoapUI

**Melhor ferramenta para SOAP**

- Download: https://www.soapui.org/
- Importar WSDL: `http://localhost:5000/wsdl?wsdl`
- Gera automaticamente requisições de teste
- Suporte a scripts e automação

### 2. Postman

- Suporta SOAP via requisições HTTP POST
- Configurar body como XML
- Header: `Content-Type: text/xml`

**Exemplo:**
```
POST http://localhost:5000/wsdl
Content-Type: text/xml

<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ns:getMusicas xmlns:ns="http://localhost:5000/wsdl"/>
  </soap:Body>
</soap:Envelope>
```

### 3. cURL

```bash
curl -X POST http://localhost:5000/wsdl \
  -H "Content-Type: text/xml" \
  -d '<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ns:getMusicas xmlns:ns="http://localhost:5000/wsdl"/>
  </soap:Body>
</soap:Envelope>'
```

### 4. PowerShell (Invoke-WebRequest)

```powershell
$body = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ns:getMusicas xmlns:ns="http://localhost:5000/wsdl"/>
  </soap:Body>
</soap:Envelope>
"@

$response = Invoke-WebRequest `
    -Uri "http://localhost:5000/wsdl" `
    -Method POST `
    -ContentType "text/xml" `
    -Body $body

$response.Content
```

---

## ⚠️ Tratamento de Erros

### Estrutura de Erro SOAP

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <soap:Fault>
      <faultcode>soap:Server</faultcode>
      <faultstring>Error message here</faultstring>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>
```

### Tratamento em Node.js

```javascript
try {
  const result = await client.getMusicaAsync({ id: 999 });
  console.log(result);
} catch (error) {
  console.error('Erro SOAP:', error.message);
  if (error.root) {
    console.error('Detalhes:', error.root.Envelope.Body.Fault);
  }
}
```

### Tratamento em PowerShell

```powershell
try {
    $result = $proxy.getMusica(999)
    $result.result | ConvertFrom-Json
} catch {
    Write-Host "Erro: $($_.Exception.Message)" -ForegroundColor Red
    
    # Detalhes do erro
    if ($_.Exception.Detail) {
        Write-Host "Detalhes: $($_.Exception.Detail)" -ForegroundColor Yellow
    }
}
```

---

## 📚 Respostas Comuns

### Sucesso

```json
{
  "result": "[{\"id\":1,\"nome\":\"Test\",\"artista\":\"Artist\"}]"
}
```

### Erro

```json
{
  "error": "Error message here"
}
```

### Deletado com Sucesso

```json
{
  "result": "Musica deleted successfully"
}
```

---

## 🎓 Comparação com Outras APIs

| Característica | SOAP | REST | GraphQL | gRPC |
|----------------|------|------|---------|------|
| Formato | XML | JSON | JSON | Protobuf |
| Protocolo | HTTP/HTTPS | HTTP/HTTPS | HTTP/HTTPS | HTTP/2 |
| Descoberta | WSDL | Documentação | Schema | Proto |
| Tipagem | Forte | Fraca | Forte | Forte |
| Complexidade | Alta | Baixa | Média | Média |
| Performance | Média | Alta | Alta | Muito Alta |

---

## 🔗 Links Relacionados

- [Documentação REST](./REST.md)
- [Documentação GraphQL](./GRAPHQL.md)
- [Documentação gRPC](./GRPC.md)
- [SOAP Specification](https://www.w3.org/TR/soap/)
- [WSDL Specification](https://www.w3.org/TR/wsdl)
