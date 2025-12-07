# 🎵 Sistema de Testes de Carga - Music Streaming API

## ✨ Novidade: Testes de Performance com Gráficos Interativos!

Este projeto agora inclui um sistema completo de **testes de carga** que compara a performance das 4 APIs (REST, GraphQL, SOAP e gRPC) e gera gráficos interativos em HTML.

## 🚀 Como Usar

### Opção 1: Guia Rápido

```powershell
# 1. Instalar dependências
npm install

# 2. Iniciar as 4 APIs (em terminais separados)
npm run start:rest      # Terminal 1
npm run start:graphql   # Terminal 2
npm run start:soap      # Terminal 3
npm run start:grpc      # Terminal 4

# 3. Executar testes (em um 5º terminal)
npm run load-test

# 4. Visualizar resultados
start test\results\index.html
```

### Opção 2: Guia Detalhado

Leia a documentação completa em:
- **[COMO-TESTAR.md](./COMO-TESTAR.md)** - Guia rápido de execução
- **[LOAD-TEST.md](./LOAD-TEST.md)** - Documentação completa dos testes

## 📊 O Que os Testes Fazem

Os testes executam **100 requisições simultâneas** para cada operação:

1. **Create Usuario** - Criação de usuários
2. **Get Usuarios** - Listagem de usuários  
3. **Create Musica** - Criação de músicas
4. **Get Musicas** - Listagem de músicas
5. **Create Playlist** - Criação de playlists
6. **Get Playlists** - Listagem de playlists

### Métricas Coletadas

Para cada API e operação:
- ⏱️ Tempo médio de resposta
- 🔽 Tempo mínimo (melhor caso)
- 🔼 Tempo máximo (pior caso)
- 📊 Mediana
- 📈 Percentil 95 (P95)
- 📈 Percentil 99 (P99)

## 🎨 Gráficos Interativos

Os resultados são apresentados em **páginas HTML interativas** com:

- ✅ **Gráficos de barras** com Chart.js
- ✅ **Tabelas de estatísticas** detalhadas
- ✅ **Design responsivo** e moderno
- ✅ **Ranking de performance** visual
- ✅ **Comparação lado a lado** das APIs

### Arquivos Gerados

```
test/results/
├── index.html                  # 🌟 Página principal - COMECE AQUI!
├── comparacao-geral.html       # Todas as operações em um gráfico
├── create-usuario.html         # Detalhes: Create Usuario
├── get-usuarios.html           # Detalhes: Get Usuarios
├── create-musica.html          # Detalhes: Create Musica
├── get-musicas.html            # Detalhes: Get Musicas
├── create-playlist.html        # Detalhes: Create Playlist
├── get-playlists.html          # Detalhes: Get Playlists
└── report.json                 # Dados brutos para análise
```

## 🏆 Ranking Típico de Performance

Com base em testes realizados, a ordem típica é:

1. 🥇 **gRPC** - Mais rápido (HTTP/2 + Protobuf)
2. 🥈 **REST** - Rápido e simples (HTTP/1.1 + JSON)
3. 🥉 **GraphQL** - Flexível (HTTP/1.1 + JSON)
4. 📊 **SOAP** - Mais lento (XML overhead)

*Os resultados podem variar dependendo da sua máquina e conexão.*

## ⚙️ Configuração

Edite `test/load-test.js` para ajustar a intensidade:

```javascript
const NUM_REQUESTS = 100;        // Número de requisições por teste
const CONCURRENT_REQUESTS = 10;  // Requisições simultâneas
```

### Presets Recomendados

| Cenário | NUM_REQUESTS | CONCURRENT_REQUESTS | Tempo Estimado |
|---------|--------------|---------------------|----------------|
| 🟢 Teste rápido | 20 | 5 | ~30 segundos |
| 🟡 Teste padrão | 100 | 10 | ~2 minutos |
| 🟠 Teste completo | 200 | 20 | ~5 minutos |
| 🔴 Teste intensivo | 500 | 50 | ~10 minutos |

## 📚 Documentação das APIs

- **[REST.md](./REST.md)** - API REST completa
- **[GRAPHQL.md](./GRAPHQL.md)** - API GraphQL completa
- **[SOAP.md](./SOAP.md)** - API SOAP completa
- **[GRPC.md](./GRPC.md)** - API gRPC completa

## 🛠️ Tecnologias Utilizadas

### APIs
- **REST** - Express.js
- **GraphQL** - Apollo Server
- **SOAP** - node-soap
- **gRPC** - @grpc/grpc-js

### Testes
- **node-fetch** - Cliente HTTP
- **Chart.js** - Gráficos interativos (via CDN)
- **HTML/CSS** - Visualização de resultados

### Banco de Dados
- **Supabase** (PostgreSQL)

## 🎯 Casos de Uso

### 1. Comparar Performance Inicial

Execute os testes para estabelecer uma baseline de performance.

### 2. Validar Otimizações

Após otimizar código, execute novamente e compare com resultados anteriores.

### 3. Escolher API para Produção

Use os resultados para decidir qual API usar em produção baseado em performance.

### 4. Documentar Capacidade

Inclua os gráficos em apresentações para mostrar a capacidade do sistema.

### 5. Identificar Gargalos

P95 e P99 altos indicam problemas de estabilidade.

## ⚠️ Troubleshooting

### "ECONNREFUSED"
- ✅ Verifique se todas as 4 APIs estão rodando
- ✅ Confirme as portas: 3000 (REST), 4000 (GraphQL), 5000 (SOAP), 50051 (gRPC)

### Testes muito lentos
- ✅ Reduza `NUM_REQUESTS` e `CONCURRENT_REQUESTS`
- ✅ Verifique conexão com Supabase

### Erros aleatórios
- ✅ Sobrecarga do sistema - reduza a carga
- ✅ Timeout do banco - aumente o timeout

## 📊 Exemplo de Saída no Console

```
🚀 INICIANDO TESTES DE CARGA - APIs de Música

📋 Configuração:
   - Requisições por teste: 100
   - Requisições simultâneas: 10
   - Total de testes: 6 operações

🔌 Conectando aos serviços...
✅ Conexões estabelecidas

📊 Testando: Create Usuario
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Progresso: 100/100 requisições

Resultados (em ms):
┌─────────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ API         │ Média   │ Min     │ Max     │ Mediana │ P95     │ P99     │
├─────────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ REST        │ 45.23   │ 32      │ 89      │ 44      │ 67      │ 78      │
│ GraphQL     │ 52.18   │ 38      │ 102     │ 51      │ 75      │ 91      │
│ SOAP        │ 78.45   │ 61      │ 145     │ 76      │ 112     │ 132     │
│ gRPC        │ 28.91   │ 19      │ 58      │ 27      │ 42      │ 51      │
└─────────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

✅ Gráfico salvo: test/results/create-usuario.html

...

🏆 Ranking de Performance (1º = mais rápido):
  🥇 1º - gRPC
  🥈 2º - REST
  🥉 3º - GraphQL
     4º - SOAP

✅ Testes concluídos com sucesso!
📁 Resultados salvos em: test/results/

🌐 Para visualizar os resultados, abra: test/results/index.html
```

## 🎉 Conclusão

Este sistema de testes permite:
- ✅ Comparar objetivamente as 4 APIs
- ✅ Identificar gargalos de performance
- ✅ Tomar decisões baseadas em dados
- ✅ Documentar melhorias ao longo do tempo
- ✅ Visualizar resultados de forma clara e bonita

---

**Bons testes! 🚀**

Para dúvidas ou sugestões, consulte a documentação completa em [LOAD-TEST.md](./LOAD-TEST.md).
