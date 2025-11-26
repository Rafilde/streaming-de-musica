# 🎵 Sistema de Streaming de Música

Sistema completo de streaming de música com APIs implementadas em **4 arquiteturas diferentes**: REST, GraphQL, SOAP e gRPC.

## 📁 Estrutura do Projeto

```
streaming-de-musica/
├── javascript-api/           # APIs Node.js (REST, GraphQL, SOAP, gRPC)
│   ├── src/
│   │   ├── config/          # Configuração Supabase
│   │   ├── rest/            # API REST
│   │   ├── graphql/         # API GraphQL
│   │   ├── soap/            # API SOAP
│   │   └── grpc/            # API gRPC
│   ├── examples/            # Exemplos de uso
│   ├── test/                # Testes automatizados
│   ├── README.md
│   ├── INSTALACAO.md
│   ├── ENDPOINTS.md
│   └── FLUXO-COMPLETO.md
├── python-api/              # APIs Python (FastAPI)
├── supabase/                # Migrações do banco
│   └── migrations/
├── .env                     # Variáveis de ambiente
└── README.md               # Este arquivo
```

## 🗄️ Banco de Dados

**Plataforma:** Supabase (PostgreSQL)

### Tabelas:

#### `usuario`
```sql
id UUID PRIMARY KEY REFERENCES auth.users(id)
nome TEXT NOT NULL
idade INT
```

#### `playlist`
```sql
id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY
nome TEXT NOT NULL
usuario_id UUID NOT NULL REFERENCES usuario(id)
```

#### `musica`
```sql
id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY
nome TEXT NOT NULL
artista TEXT NOT NULL
```

#### `playlist_musica`
```sql
id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY
playlist_id INT NOT NULL REFERENCES playlist(id) ON DELETE CASCADE
musica_id INT NOT NULL REFERENCES musica(id) ON DELETE CASCADE
```

## 🚀 APIs Disponíveis

### 1. REST API (Express.js)
- **Porta:** 3000
- **Tecnologia:** Express.js
- **Endpoints:** CRUD completo para todas as tabelas
- **Documentação:** `/javascript-api/README.md`

### 2. GraphQL API (Apollo Server)
- **Porta:** 4000
- **Tecnologia:** Apollo Server Express
- **Queries & Mutations:** CRUD completo com relacionamentos
- **Playground:** `http://localhost:4000/graphql`

### 3. SOAP API
- **Porta:** 5000
- **Tecnologia:** node-soap
- **WSDL:** `http://localhost:5000/wsdl?wsdl`
- **Operações:** CRUD completo via SOAP

### 4. gRPC API
- **Porta:** 50051
- **Tecnologia:** @grpc/grpc-js
- **Protocol Buffers:** `/javascript-api/src/grpc/proto/musicstreaming.proto`
- **Services:** 4 services com CRUD completo

## ⚡ Quick Start

### 1. Instalar Dependências

```bash
cd javascript-api
npm install
```

### 2. Configurar Ambiente

O arquivo `.env` já está configurado na raiz do projeto com as credenciais do Supabase.

### 3. Iniciar as APIs

```bash
# REST API
npm run start:rest

# GraphQL API
npm run start:graphql

# SOAP API
npm run start:soap

# gRPC API
npm run start:grpc
```

### 4. Testar

```bash
npm test
```

## 📚 Documentação Detalhada

### Para Desenvolvedores JavaScript/Node.js

1. **README.md** - Visão geral do projeto Node.js
2. **INSTALACAO.md** - Guia completo de instalação
3. **ENDPOINTS.md** - Lista completa de todos os endpoints
4. **FLUXO-COMPLETO.md** - Tutorial passo a passo com exemplos

Todos os arquivos estão em: `/javascript-api/`

## 🎯 Funcionalidades Implementadas

### ✅ CRUD Completo
- [x] Usuários (Create, Read, Update, Delete)
- [x] Playlists (Create, Read, Update, Delete)
- [x] Músicas (Create, Read, Update, Delete)
- [x] Playlist-Música (Create, Read, Update, Delete)

### ✅ Arquiteturas Implementadas
- [x] REST API com Express.js
- [x] GraphQL com Apollo Server
- [x] SOAP com WSDL
- [x] gRPC com Protocol Buffers

### ✅ Recursos Adicionais
- [x] Integração com Supabase
- [x] Exemplos de código para cada API
- [x] Testes automatizados
- [x] Documentação completa
- [x] Scripts de desenvolvimento (nodemon)

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js 18+
- Express.js
- Apollo Server (GraphQL)
- node-soap (SOAP)
- @grpc/grpc-js (gRPC)
- Supabase JS Client

### Banco de Dados
- PostgreSQL (via Supabase)
- Supabase Auth
- Row Level Security (RLS)

### Ferramentas de Desenvolvimento
- Nodemon (auto-reload)
- dotenv (variáveis de ambiente)
- node-fetch (testes HTTP)

## 📝 Exemplos de Uso

### REST API
```bash
curl http://localhost:3000/api/musicas
```

### GraphQL API
```graphql
query {
  musicas {
    id
    nome
    artista
  }
}
```

### SOAP API
```javascript
const soap = require('soap');
const client = await soap.createClientAsync('http://localhost:5000/wsdl?wsdl');
const result = await client.getMusicasAsync({});
```

### gRPC API
```javascript
const client = new musicstreaming.MusicaService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);
client.GetMusicas({}, callback);
```

## 🧪 Testes

Execute o suite completo de testes:

```bash
cd javascript-api
npm test
```

Isso testará todas as 4 APIs e mostrará um relatório de status.

## 🔐 Segurança

- Credenciais do Supabase no arquivo `.env`
- Chaves de API públicas (anon key)
- RLS configurado no Supabase
- CORS habilitado para desenvolvimento

## 📦 Deploy

### Supabase
O banco de dados já está hospedado no Supabase e pronto para uso.

### APIs
As APIs podem ser deployadas em:
- Vercel (REST, GraphQL)
- Railway (Todas)
- Heroku (Todas)
- AWS EC2 / DigitalOcean (Todas)
- Google Cloud Run (gRPC, REST)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Autores

- Desenvolvimento inicial: [Seu Nome]
- APIs JavaScript: REST, GraphQL, SOAP, gRPC

## 🔗 Links Úteis

- [Supabase Dashboard](https://app.supabase.com)
- [Documentação Express.js](https://expressjs.com/)
- [Documentação Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Documentação node-soap](https://github.com/vpulim/node-soap)
- [Documentação gRPC Node.js](https://grpc.io/docs/languages/node/)

## 📞 Suporte

Para questões e suporte:
- Abra uma issue no GitHub
- Consulte a documentação em `/javascript-api/`
- Verifique os exemplos em `/javascript-api/examples/`

---

**Status do Projeto:** ✅ Todas as 4 APIs funcionando e documentadas!
