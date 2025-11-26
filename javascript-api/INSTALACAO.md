# Guia de Instalação e Teste - Music Streaming API

## 📦 Passo 1: Instalar Dependências

Navegue até a pasta `javascript-api` e instale as dependências:

```bash
cd javascript-api
npm install
```

## 🔧 Passo 2: Verificar Configuração

Certifique-se de que o arquivo `.env` na raiz do projeto (uma pasta acima) contém as credenciais do Supabase:

```
SUPABASE_URL=https://gjtdgfkonzlnhbvbyzke.supabase.co
SUPABASE_KEY=sua_key_aqui
```

## 🚀 Passo 3: Iniciar as APIs

### Opção 1: Iniciar cada API individualmente

**Terminal 1 - REST API:**
```bash
npm run start:rest
```
Acesse: http://localhost:3000

**Terminal 2 - GraphQL API:**
```bash
npm run start:graphql
```
Acesse: http://localhost:4000/graphql

**Terminal 3 - SOAP API:**
```bash
npm run start:soap
```
Acesse WSDL: http://localhost:5000/wsdl?wsdl

**Terminal 4 - gRPC API:**
```bash
npm run start:grpc
```
Porta: 50051

### Opção 2: Modo desenvolvimento (com auto-reload)

```bash
npm run dev:rest
npm run dev:graphql
npm run dev:soap
npm run dev:grpc
```

## 🧪 Passo 4: Testar as APIs

### 4.1 Testar REST API

Usando curl (PowerShell):

**Criar uma música:**
```powershell
$body = @{
    nome = "Bohemian Rhapsody"
    artista = "Queen"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/musicas" -Method POST -Body $body -ContentType "application/json"
```

**Listar todas as músicas:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/musicas" -Method GET
```

Ou use o exemplo em JavaScript:
```bash
node examples/rest-client-example.js
```

### 4.2 Testar GraphQL API

1. Acesse http://localhost:4000/graphql no navegador
2. Use o GraphQL Playground para executar as queries
3. Consulte `examples/graphql-examples.md` para exemplos

**Exemplo de Query:**
```graphql
query {
  musicas {
    id
    nome
    artista
  }
}
```

**Exemplo de Mutation:**
```graphql
mutation {
  createMusica(input: {
    nome: "Stairway to Heaven"
    artista: "Led Zeppelin"
  }) {
    id
    nome
    artista
  }
}
```

### 4.3 Testar SOAP API

**Ver o WSDL:**
Acesse http://localhost:5000/wsdl?wsdl no navegador

**Testar com cliente SOAP:**
```bash
node examples/soap-client-example.js
```

**Usando SoapUI ou Postman:**
1. Importe o WSDL: http://localhost:5000/wsdl?wsdl
2. Execute as operações disponíveis

### 4.4 Testar gRPC API

**Usando o cliente de exemplo:**
```bash
node examples/grpc-client-example.js
```

**Usando BloomRPC ou Postman:**
1. Importe o arquivo proto: `src/grpc/proto/musicstreaming.proto`
2. Configure o servidor: `localhost:50051`
3. Execute os métodos dos serviços

## 📊 Estrutura dos Dados

### Usuario
```json
{
  "id": "uuid-v4",
  "nome": "Nome do Usuário",
  "idade": 25
}
```

### Playlist
```json
{
  "id": 1,
  "nome": "Nome da Playlist",
  "usuario_id": "uuid-v4"
}
```

### Musica
```json
{
  "id": 1,
  "nome": "Nome da Música",
  "artista": "Nome do Artista"
}
```

### PlaylistMusica
```json
{
  "id": 1,
  "playlist_id": 1,
  "musica_id": 1
}
```

## 🔍 Verificar se as APIs estão rodando

**REST:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000" -Method GET
```

**GraphQL:**
```powershell
Invoke-RestMethod -Uri "http://localhost:4000/graphql" -Method GET
```

**SOAP:**
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/wsdl?wsdl" -Method GET
```

**gRPC:**
O gRPC não tem endpoint HTTP, use o cliente de exemplo.

## ⚠️ Troubleshooting

### Erro: "Missing Supabase URL or Key"
- Verifique se o arquivo `.env` existe na raiz do projeto
- Certifique-se de que as variáveis estão sem espaços extras

### Erro: "Port already in use"
- Altere a porta no `.env` ou no código
- Ou encerre o processo que está usando a porta

### Erro de conexão com Supabase
- Verifique se a URL e Key estão corretas
- Teste a conexão diretamente no Supabase Dashboard

### Erro ao instalar dependências
```bash
# Limpar cache do npm
npm cache clean --force

# Remover node_modules e reinstalar
Remove-Item -Recurse -Force node_modules
npm install
```

## 📚 Recursos Adicionais

- **REST API Testing**: Use Postman, Insomnia ou Thunder Client
- **GraphQL Testing**: Use GraphQL Playground, Apollo Studio ou Postman
- **SOAP Testing**: Use SoapUI ou Postman
- **gRPC Testing**: Use BloomRPC, Postman ou grpcurl

## 🎯 Próximos Passos

1. Criar um usuário no banco de dados usando a API
2. Criar playlists para o usuário
3. Adicionar músicas ao banco
4. Associar músicas às playlists
5. Testar todas as operações CRUD em cada API
