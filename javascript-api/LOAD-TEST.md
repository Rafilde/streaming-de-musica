# 📊 Testes de Carga e Performance

## 🎯 Visão Geral

Este sistema realiza **testes de carga comparativos** entre as 4 APIs implementadas (REST, GraphQL, SOAP e gRPC), gerando gráficos automáticos para visualizar a performance de cada uma.

## ✨ Funcionalidades

- ✅ **Testes simultâneos** - Todas as APIs são testadas ao mesmo tempo
- ✅ **Múltiplas operações** - Create/Get para Usuarios, Musicas e Playlists
- ✅ **Gráficos automáticos** - Geração de imagens PNG com comparações
- ✅ **Estatísticas detalhadas** - Média, Min, Max, Mediana, P95, P99
- ✅ **Relatório JSON** - Dados completos para análises posteriores
- ✅ **Ranking de performance** - Qual API é mais rápida

## 📋 Pré-requisitos

### 1. Instalar Dependências

```powershell
cd javascript-api
npm install
```

Todas as dependências necessárias já estão no `package.json`.

### 2. Iniciar TODAS as APIs

**Você precisa ter as 4 APIs rodando simultaneamente!**

Abra **4 terminais diferentes** e execute:

**Terminal 1 - REST:**
```powershell
npm run start:rest
```

**Terminal 2 - GraphQL:**
```powershell
npm run start:graphql
```

**Terminal 3 - SOAP:**
```powershell
npm run start:soap
```

**Terminal 4 - gRPC:**
```powershell
npm run start:grpc
```

Aguarde até todas exibirem mensagens de "Server running" ou "listening".

## 🚀 Executar Testes

### Comando Básico

```powershell
npm run load-test
```

### Processo de Execução

O teste irá:

1. ✅ Conectar-se às 4 APIs
2. 📊 Executar 6 tipos de testes diferentes:
   - **Create Usuario** - Criação de usuários
   - **Get Usuarios** - Listagem de usuários
   - **Create Musica** - Criação de músicas
   - **Get Musicas** - Listagem de músicas
   - **Create Playlist** - Criação de playlists
   - **Get Playlists** - Listagem de playlists
3. 📈 Gerar gráficos individuais para cada teste
4. 📊 Gerar gráfico de comparação geral
5. 💾 Salvar relatório JSON completo

## 📊 Configuração

Edite o arquivo `test/load-test.js` para ajustar:

```javascript
const NUM_REQUESTS = 100; // Número de requisições por teste
const CONCURRENT_REQUESTS = 10; // Requisições simultâneas
```

### Recomendações

| Cenário | NUM_REQUESTS | CONCURRENT_REQUESTS |
|---------|--------------|---------------------|
| Teste rápido | 50 | 5 |
| **Teste padrão** | **100** | **10** |
| Teste completo | 200 | 20 |
| Teste intensivo | 500 | 50 |

⚠️ **Atenção:** Valores muito altos podem sobrecarregar o sistema!

## 📈 Resultados

### Estrutura de Saída

Após a execução, os resultados estarão em `test/results/`:

```
test/results/
├── create-usuario.html        # Gráfico: Create Usuario
├── get-usuarios.html           # Gráfico: Get Usuarios
├── create-musica.html          # Gráfico: Create Musica
├── get-musicas.html            # Gráfico: Get Musicas
├── create-playlist.html        # Gráfico: Create Playlist
├── get-playlists.html          # Gráfico: Get Playlists
├── comparacao-geral.html       # Gráfico: Todas as operações
└── report.json                # Relatório completo em JSON
```

### Estatísticas Fornecidas

Para cada API e operação, você obtém:

- **Média** - Tempo médio de resposta
- **Min** - Tempo mínimo (melhor caso)
- **Max** - Tempo máximo (pior caso)
- **Mediana** - Valor central da distribuição
- **P95** - 95% das requisições foram mais rápidas que
- **P99** - 99% das requisições foram mais rápidas que

### Exemplo de Saída no Console

```
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
```

### Ranking Final

```
🏆 Ranking de Performance (1º = mais rápido):
  🥇 1º - gRPC
  🥈 2º - REST
  🥉 3º - GraphQL
     4º - SOAP
```

## 🎨 Gráficos Gerados

### Gráficos Interativos (HTML)

Cada operação gera um gráfico interativo em HTML que você pode abrir no navegador:

- **Visualização interativa** - Passe o mouse sobre as barras para ver valores
- **Tabela de estatísticas** - Dados detalhados abaixo do gráfico
- **Design responsivo** - Funciona em qualquer dispositivo
- **Sem dependências** - Abre direto no navegador

**Para visualizar:**

```powershell
# Abrir todos os gráficos
explorer test\results

# Abrir um gráfico específico
start test\results\create-usuario.html

# Abrir comparação geral
start test\results\comparacao-geral.html
```

### Gráfico de Comparação Geral

O arquivo `comparacao-geral.png` mostra:

- **Eixo X**: Todas as operações testadas
- **Barras agrupadas**: Cada API em uma cor
- **Visão completa**: Performance geral do sistema

## 📄 Relatório JSON

O arquivo `report.json` contém todos os dados brutos:

```json
{
  "timestamp": "2025-12-06T15:30:00.000Z",
  "config": {
    "numRequests": 100,
    "concurrentRequests": 10
  },
  "results": {
    "Create Usuario": {
      "REST": {
        "avg": "45.23",
        "min": 32,
        "max": 89,
        "median": 44,
        "p95": 67,
        "p99": 78
      },
      "GraphQL": { ... },
      "SOAP": { ... },
      "gRPC": { ... }
    },
    ...
  }
}
```

Use este arquivo para:
- Análises customizadas
- Gráficos personalizados
- Comparações históricas
- Documentação de performance

## 🔍 Interpretando os Resultados

### Tempo de Resposta

- **< 50ms** - 🟢 Excelente
- **50-100ms** - 🟡 Bom
- **100-200ms** - 🟠 Aceitável
- **> 200ms** - 🔴 Precisa otimização

### Percentis (P95, P99)

- **P95**: 95% dos usuários tiveram experiência melhor que este tempo
- **P99**: 99% dos usuários tiveram experiência melhor que este tempo
- Valores altos indicam variabilidade/instabilidade

### Exemplo de Análise

```
REST - Média: 45ms, P99: 78ms
  ✅ Performance consistente e rápida

SOAP - Média: 78ms, P99: 132ms
  ⚠️ Mais lento, variabilidade alta
```

## 🛠️ Troubleshooting

### Erro: "ECONNREFUSED"

**Problema:** Uma ou mais APIs não estão rodando.

**Solução:**
```powershell
# Verifique se todas as 4 APIs estão ativas
# REST (porta 3000)
curl http://localhost:3000/api/usuarios

# GraphQL (porta 4000)
curl http://localhost:4000/graphql

# SOAP (porta 5000)
curl http://localhost:5000/wsdl?wsdl

# gRPC (porta 50051) - use grpcurl ou cliente específico
```

### Erro: "Cannot find module 'chartjs-node-canvas'"

**Problema:** Dependências não instaladas.

**Solução:**
```powershell
npm install
```

### Gráficos não são gerados

**Problema:** Pasta `test/results/` não existe.

**Solução:** O script cria automaticamente, mas você pode criar manualmente:
```powershell
New-Item -Path "test/results" -ItemType Directory -Force
```

### Performance muito lenta

**Possíveis causas:**
1. Banco de dados Supabase lento (network)
2. Muitas requisições simultâneas
3. Recursos do sistema limitados

**Soluções:**
- Reduza `NUM_REQUESTS` e `CONCURRENT_REQUESTS`
- Verifique conexão com internet
- Feche outros programas pesados

### Erros aleatórios durante os testes

**Causa:** Sobrecarga das APIs ou banco de dados.

**Solução:** Reduza a carga:
```javascript
const NUM_REQUESTS = 50;
const CONCURRENT_REQUESTS = 5;
```

## 📊 Casos de Uso

### 1. Comparar Performance Inicial

```powershell
# Teste padrão
npm run load-test
```

### 2. Teste Rápido para Desenvolvimento

Edite `load-test.js`:
```javascript
const NUM_REQUESTS = 20;
const CONCURRENT_REQUESTS = 5;
```

```powershell
npm run load-test
```

### 3. Teste de Estresse

Edite `load-test.js`:
```javascript
const NUM_REQUESTS = 500;
const CONCURRENT_REQUESTS = 50;
```

```powershell
npm run load-test
```

### 4. Teste de uma Operação Específica

Comente os testes que não quer executar em `load-test.js`:

```javascript
// Teste 1: Create Usuario
const test1 = await runConcurrentTests('Create Usuario', { ... });

// Teste 2: Get Usuarios
// const test2 = await runConcurrentTests('Get Usuarios', { ... });

// ... comente os outros
```

## 📈 Otimizações Baseadas nos Resultados

### Se REST for mais lento

- Verifique middlewares desnecessários
- Adicione cache
- Otimize queries do banco

### Se GraphQL for mais lento

- Implemente DataLoader para evitar N+1
- Adicione cache de queries
- Limite profundidade das queries

### Se SOAP for mais lento

- SOAP é naturalmente mais lento (XML overhead)
- Considere migrar operações críticas para REST/gRPC
- Comprima payloads XML

### Se gRPC for mais lento

- Verifique configuração de HTTP/2
- Use streaming quando apropriado
- Otimize Protocol Buffers

## 🎯 Melhores Práticas

1. **Execute testes regulares** - Após cada mudança significativa
2. **Compare histórico** - Salve relatórios JSON com timestamps
3. **Teste em condições reais** - Simule carga real de usuários
4. **Monitore recursos** - CPU, RAM, Network durante os testes
5. **Documente resultados** - Mantenha registro das melhorias

## 🔗 Links Relacionados

- [Documentação REST](../REST.md)
- [Documentação GraphQL](../GRAPHQL.md)
- [Documentação SOAP](../SOAP.md)
- [Documentação gRPC](../GRPC.md)

## 📝 Exemplo Completo

```powershell
# 1. Navegar para o diretório
cd c:\Users\siwan\Documents\streaming-de-musica\javascript-api

# 2. Instalar dependências (primeira vez)
npm install

# 3. Abrir 4 terminais e iniciar as APIs
# Terminal 1
npm run start:rest

# Terminal 2
npm run start:graphql

# Terminal 3
npm run start:soap

# Terminal 4
npm run start:grpc

# 4. Em um 5º terminal, executar os testes
npm run load-test

# 5. Visualizar resultados
explorer test\results
```

## 🎉 Conclusão

Este sistema de testes permite:
- ✅ Comparar objetivamente as 4 APIs
- ✅ Identificar gargalos de performance
- ✅ Tomar decisões baseadas em dados
- ✅ Documentar melhorias ao longo do tempo

**Bons testes! 🚀**
