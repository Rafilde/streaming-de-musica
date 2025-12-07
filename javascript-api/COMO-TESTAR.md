# 🚀 Executar Testes de Carga - Guia Rápido

## Passos para Executar

### 1. Iniciar as 4 APIs

Abra **4 terminais diferentes** e execute:

**Terminal 1:**
```powershell
npm run start:rest
```

**Terminal 2:**
```powershell
npm run start:graphql
```

**Terminal 3:**
```powershell
npm run start:soap
```

**Terminal 4:**
```powershell
npm run start:grpc
```

Aguarde todas iniciarem!

### 2. Executar os Testes

Em um **5º terminal**:

```powershell
npm run load-test
```

### 3. Visualizar Resultados

Após os testes terminarem:

```powershell
# Abrir página principal com todos os resultados
start test\results\index.html
```

## 📊 O que você verá

- **Página índice** com ranking de performance
- **Cards coloridos** mostrando o desempenho de cada API
- **Links para gráficos detalhados** de cada operação
- **Gráficos interativos** com Chart.js
- **Tabelas com estatísticas** completas

## ⚙️ Ajustar Intensidade dos Testes

Edite `test/load-test.js`:

```javascript
const NUM_REQUESTS = 100;        // ← Altere aqui
const CONCURRENT_REQUESTS = 10;   // ← Altere aqui
```

**Sugestões:**
- Teste rápido: `NUM_REQUESTS = 20`, `CONCURRENT_REQUESTS = 5`
- Teste padrão: `NUM_REQUESTS = 100`, `CONCURRENT_REQUESTS = 10`
- Teste intensivo: `NUM_REQUESTS = 500`, `CONCURRENT_REQUESTS = 50`

## 🎯 Interpretação

- **Tempo < 50ms** = 🟢 Excelente
- **Tempo 50-100ms** = 🟡 Bom
- **Tempo 100-200ms** = 🟠 Aceitável
- **Tempo > 200ms** = 🔴 Precisa otimizar

## 📁 Arquivos Gerados

```
test/results/
├── index.html                  # ← COMECE AQUI!
├── comparacao-geral.html
├── create-usuario.html
├── get-usuarios.html
├── create-musica.html
├── get-musicas.html
├── create-playlist.html
├── get-playlists.html
└── report.json
```

---

**Boa sorte! 🚀**
