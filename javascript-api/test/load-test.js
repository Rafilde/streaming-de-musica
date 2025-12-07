const fetch = require('node-fetch');
const soap = require('soap');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const fs = require('fs');

// Configurações
const NUM_REQUESTS = 100; // Número de requisições por teste
const CONCURRENT_REQUESTS = 10; // Requisições simultâneas

// URLs das APIs
const REST_URL = 'http://localhost:3000/api';
const GRAPHQL_URL = 'http://localhost:4000/graphql';
const SOAP_URL = 'http://localhost:5000/wsdl?wsdl';
const GRPC_HOST = 'localhost:50051';
const PROTO_PATH = path.join(__dirname, '../src/grpc/proto/musicstreaming.proto');

// Cores para os gráficos
const COLORS = {
  REST: 'rgba(75, 192, 192, 0.8)',
  GraphQL: 'rgba(153, 102, 255, 0.8)',
  SOAP: 'rgba(255, 159, 64, 0.8)',
  gRPC: 'rgba(255, 99, 132, 0.8)'
};

// Resultados dos testes
const results = {
  createUsuario: { REST: [], GraphQL: [], SOAP: [], gRPC: [] },
  getUsuarios: { REST: [], GraphQL: [], SOAP: [], gRPC: [] },
  createMusica: { REST: [], GraphQL: [], SOAP: [], gRPC: [] },
  getMusicas: { REST: [], GraphQL: [], SOAP: [], gRPC: [] },
  createPlaylist: { REST: [], GraphQL: [], SOAP: [], gRPC: [] },
  getPlaylists: { REST: [], GraphQL: [], SOAP: [], gRPC: [] }
};

// ========== CLIENTES ==========

async function createGrpcClients() {
  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
  
  const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
  const musicstreaming = protoDescriptor.musicstreaming;
  
  return {
    usuario: new musicstreaming.UsuarioService(GRPC_HOST, grpc.credentials.createInsecure()),
    musica: new musicstreaming.MusicaService(GRPC_HOST, grpc.credentials.createInsecure()),
    playlist: new musicstreaming.PlaylistService(GRPC_HOST, grpc.credentials.createInsecure())
  };
}

// ========== TESTES REST ==========

async function testRestCreateUsuario(id) {
  const start = Date.now();
  
  await fetch(`${REST_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: `${id}-rest-${Date.now()}`,
      nome: `Usuario REST ${id}`,
      idade: 25 + (id % 30)
    })
  });
  
  return Date.now() - start;
}

async function testRestGetUsuarios() {
  const start = Date.now();
  await fetch(`${REST_URL}/usuarios`);
  return Date.now() - start;
}

async function testRestCreateMusica(id) {
  const start = Date.now();
  
  await fetch(`${REST_URL}/musicas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: `Musica REST ${id}`,
      artista: `Artista ${id}`
    })
  });
  
  return Date.now() - start;
}

async function testRestGetMusicas() {
  const start = Date.now();
  await fetch(`${REST_URL}/musicas`);
  return Date.now() - start;
}

async function testRestCreatePlaylist(id, usuarioId) {
  const start = Date.now();
  
  await fetch(`${REST_URL}/playlists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: `Playlist REST ${id}`,
      usuario_id: usuarioId
    })
  });
  
  return Date.now() - start;
}

async function testRestGetPlaylists() {
  const start = Date.now();
  await fetch(`${REST_URL}/playlists`);
  return Date.now() - start;
}

// ========== TESTES GRAPHQL ==========

async function testGraphQLCreateUsuario(id) {
  const start = Date.now();
  
  await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation {
          createUsuario(id: "${id}-graphql-${Date.now()}", nome: "Usuario GraphQL ${id}", idade: ${25 + (id % 30)}) {
            id
            nome
            idade
          }
        }
      `
    })
  });
  
  return Date.now() - start;
}

async function testGraphQLGetUsuarios() {
  const start = Date.now();
  
  await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          usuarios {
            id
            nome
            idade
          }
        }
      `
    })
  });
  
  return Date.now() - start;
}

async function testGraphQLCreateMusica(id) {
  const start = Date.now();
  
  await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation {
          createMusica(nome: "Musica GraphQL ${id}", artista: "Artista ${id}") {
            id
            nome
            artista
          }
        }
      `
    })
  });
  
  return Date.now() - start;
}

async function testGraphQLGetMusicas() {
  const start = Date.now();
  
  await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          musicas {
            id
            nome
            artista
          }
        }
      `
    })
  });
  
  return Date.now() - start;
}

async function testGraphQLCreatePlaylist(id, usuarioId) {
  const start = Date.now();
  
  await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation {
          createPlaylist(nome: "Playlist GraphQL ${id}", usuario_id: "${usuarioId}") {
            id
            nome
          }
        }
      `
    })
  });
  
  return Date.now() - start;
}

async function testGraphQLGetPlaylists() {
  const start = Date.now();
  
  await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          playlists {
            id
            nome
          }
        }
      `
    })
  });
  
  return Date.now() - start;
}

// ========== TESTES SOAP ==========

async function testSoapCreateUsuario(client, id) {
  const start = Date.now();
  
  await new Promise((resolve, reject) => {
    client.createUsuario({
      id: `${id}-soap-${Date.now()}`,
      nome: `Usuario SOAP ${id}`,
      idade: 25 + (id % 30)
    }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  
  return Date.now() - start;
}

async function testSoapGetUsuarios(client) {
  const start = Date.now();
  
  await new Promise((resolve, reject) => {
    client.getUsuarios({}, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  
  return Date.now() - start;
}

async function testSoapCreateMusica(client, id) {
  const start = Date.now();
  
  await new Promise((resolve, reject) => {
    client.createMusica({
      nome: `Musica SOAP ${id}`,
      artista: `Artista ${id}`
    }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  
  return Date.now() - start;
}

async function testSoapGetMusicas(client) {
  const start = Date.now();
  
  await new Promise((resolve, reject) => {
    client.getMusicas({}, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  
  return Date.now() - start;
}

async function testSoapCreatePlaylist(client, id, usuarioId) {
  const start = Date.now();
  
  await new Promise((resolve, reject) => {
    client.createPlaylist({
      nome: `Playlist SOAP ${id}`,
      usuario_id: usuarioId
    }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  
  return Date.now() - start;
}

async function testSoapGetPlaylists(client) {
  const start = Date.now();
  
  await new Promise((resolve, reject) => {
    client.getPlaylists({}, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  
  return Date.now() - start;
}

// ========== TESTES gRPC ==========

async function testGrpcCreateUsuario(client, id) {
  const start = Date.now();
  
  await new Promise((resolve, reject) => {
    client.CreateUsuario({
      id: `${id}-grpc-${Date.now()}`,
      nome: `Usuario gRPC ${id}`,
      idade: 25 + (id % 30)
    }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  
  return Date.now() - start;
}

async function testGrpcGetUsuarios(client) {
  const start = Date.now();
  
  await new Promise((resolve, reject) => {
    client.GetUsuarios({}, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  
  return Date.now() - start;
}

async function testGrpcCreateMusica(client, id) {
  const start = Date.now();
  
  await new Promise((resolve, reject) => {
    client.CreateMusica({
      nome: `Musica gRPC ${id}`,
      artista: `Artista ${id}`
    }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  
  return Date.now() - start;
}

async function testGrpcGetMusicas(client) {
  const start = Date.now();
  
  await new Promise((resolve, reject) => {
    client.GetMusicas({}, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  
  return Date.now() - start;
}

async function testGrpcCreatePlaylist(client, id, usuarioId) {
  const start = Date.now();
  
  await new Promise((resolve, reject) => {
    client.CreatePlaylist({
      nome: `Playlist gRPC ${id}`,
      usuario_id: usuarioId
    }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  
  return Date.now() - start;
}

async function testGrpcGetPlaylists(client) {
  const start = Date.now();
  
  await new Promise((resolve, reject) => {
    client.GetPlaylists({}, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  
  return Date.now() - start;
}

// ========== EXECUTAR TESTES ==========

async function runConcurrentTests(testName, testFunctions) {
  console.log(`\n📊 Testando: ${testName}`);
  console.log('━'.repeat(60));
  
  const testResults = {
    REST: [],
    GraphQL: [],
    SOAP: [],
    gRPC: []
  };
  
  // Executar testes em lotes concorrentes
  for (let batch = 0; batch < NUM_REQUESTS; batch += CONCURRENT_REQUESTS) {
    const promises = [];
    
    for (let i = 0; i < CONCURRENT_REQUESTS && (batch + i) < NUM_REQUESTS; i++) {
      const index = batch + i;
      
      // Executar todos os tipos de API simultaneamente
      promises.push(
        Promise.all([
          testFunctions.REST(index).catch(() => -1),
          testFunctions.GraphQL(index).catch(() => -1),
          testFunctions.SOAP(index).catch(() => -1),
          testFunctions.gRPC(index).catch(() => -1)
        ]).then(([restTime, graphqlTime, soapTime, grpcTime]) => {
          if (restTime !== -1) testResults.REST.push(restTime);
          if (graphqlTime !== -1) testResults.GraphQL.push(graphqlTime);
          if (soapTime !== -1) testResults.SOAP.push(soapTime);
          if (grpcTime !== -1) testResults.gRPC.push(grpcTime);
        })
      );
    }
    
    await Promise.all(promises);
    
    const progress = Math.min(batch + CONCURRENT_REQUESTS, NUM_REQUESTS);
    process.stdout.write(`\rProgresso: ${progress}/${NUM_REQUESTS} requisições`);
  }
  
  console.log('\n');
  
  // Calcular estatísticas
  const stats = {};
  for (const api of ['REST', 'GraphQL', 'SOAP', 'gRPC']) {
    const times = testResults[api].filter(t => t > 0);
    if (times.length === 0) {
      stats[api] = { avg: 0, min: 0, max: 0, median: 0, p95: 0, p99: 0 };
      continue;
    }
    
    times.sort((a, b) => a - b);
    const sum = times.reduce((a, b) => a + b, 0);
    
    stats[api] = {
      avg: (sum / times.length).toFixed(2),
      min: Math.min(...times),
      max: Math.max(...times),
      median: times[Math.floor(times.length / 2)],
      p95: times[Math.floor(times.length * 0.95)],
      p99: times[Math.floor(times.length * 0.99)]
    };
  }
  
  // Mostrar resultados
  console.log('Resultados (em ms):');
  console.log('┌─────────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐');
  console.log('│ API         │ Média   │ Min     │ Max     │ Mediana │ P95     │ P99     │');
  console.log('├─────────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤');
  
  for (const api of ['REST', 'GraphQL', 'SOAP', 'gRPC']) {
    const s = stats[api];
    console.log(`│ ${api.padEnd(11)} │ ${String(s.avg).padEnd(7)} │ ${String(s.min).padEnd(7)} │ ${String(s.max).padEnd(7)} │ ${String(s.median).padEnd(7)} │ ${String(s.p95).padEnd(7)} │ ${String(s.p99).padEnd(7)} │`);
  }
  
  console.log('└─────────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘');
  
  return { results: testResults, stats };
}

// ========== GERAR GRÁFICOS HTML ==========

async function generateChart(testName, stats) {
  const apis = ['REST', 'GraphQL', 'SOAP', 'gRPC'];
  
  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${testName} - Comparação de Performance</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 10px;
        }
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
        }
        canvas {
            max-height: 400px;
        }
        .stats-table {
            margin-top: 30px;
            width: 100%;
            border-collapse: collapse;
        }
        .stats-table th, .stats-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        .stats-table th {
            background-color: #667eea;
            color: white;
        }
        .stats-table tr:hover {
            background-color: #f5f5f5;
        }
        .api-rest { color: #4BC0C0; font-weight: bold; }
        .api-graphql { color: #9966FF; font-weight: bold; }
        .api-soap { color: #FF9F40; font-weight: bold; }
        .api-grpc { color: #FF6384; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 ${testName}</h1>
        <p class="subtitle">Comparação de Performance entre APIs</p>
        <canvas id="myChart"></canvas>
        
        <table class="stats-table">
            <thead>
                <tr>
                    <th>API</th>
                    <th>Média (ms)</th>
                    <th>Mínimo (ms)</th>
                    <th>Máximo (ms)</th>
                    <th>Mediana (ms)</th>
                    <th>P95 (ms)</th>
                    <th>P99 (ms)</th>
                </tr>
            </thead>
            <tbody>
                ${apis.map(api => `
                <tr>
                    <td class="api-${api.toLowerCase()}">${api}</td>
                    <td>${stats[api].avg}</td>
                    <td>${stats[api].min}</td>
                    <td>${stats[api].max}</td>
                    <td>${stats[api].median}</td>
                    <td>${stats[api].p95}</td>
                    <td>${stats[api].p99}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
    
    <script>
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['REST', 'GraphQL', 'SOAP', 'gRPC'],
                datasets: [{
                    label: 'Tempo Médio (ms)',
                    data: [${apis.map(api => stats[api].avg).join(', ')}],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)',
                        'rgba(255, 99, 132, 0.8)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: '${testName} - Performance Comparison',
                        font: {
                            size: 18,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Tempo de Resposta (ms)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Tipo de API'
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>`;
  
  const fileName = `test/results/${testName.toLowerCase().replace(/\s+/g, '-')}.html`;
  
  if (!fs.existsSync('test/results')) {
    fs.mkdirSync('test/results', { recursive: true });
  }
  
  fs.writeFileSync(fileName, htmlContent);
  console.log(`✅ Gráfico salvo: ${fileName}`);
}

async function generateComparisonChart(allStats) {
  const tests = Object.keys(allStats);
  const apis = ['REST', 'GraphQL', 'SOAP', 'gRPC'];
  
  const datasets = apis.map((api, index) => {
    const colors = [
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)',
      'rgba(255, 99, 132, 0.8)'
    ];
    const borderColors = [
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255, 99, 132, 1)'
    ];
    
    return {
      label: api,
      data: tests.map(test => parseFloat(allStats[test][api].avg)),
      backgroundColor: colors[index],
      borderColor: borderColors[index]
    };
  });
  
  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comparação Geral de Performance - Todas as APIs</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 10px;
        }
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
        }
        canvas {
            max-height: 500px;
        }
        .summary {
            margin-top: 30px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        .summary-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .summary-card h3 {
            margin: 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .summary-card .value {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
        }
        .summary-card .unit {
            font-size: 14px;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Comparação Geral de Performance</h1>
        <p class="subtitle">Todas as Operações - REST vs GraphQL vs SOAP vs gRPC</p>
        <canvas id="comparisonChart"></canvas>
        
        <div class="summary">
            ${apis.map(api => {
              const total = tests.reduce((sum, test) => sum + parseFloat(allStats[test][api].avg), 0);
              const avg = (total / tests.length).toFixed(2);
              return `
              <div class="summary-card">
                  <h3>${api}</h3>
                  <div class="value">${avg}</div>
                  <div class="unit">ms médio</div>
              </div>
              `;
            }).join('')}
        </div>
    </div>
    
    <script>
        const ctx = document.getElementById('comparisonChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ${JSON.stringify(tests)},
                datasets: ${JSON.stringify(datasets)}
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Comparação de Performance - Todas as Operações',
                        font: {
                            size: 20,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Tempo Médio de Resposta (ms)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Operação'
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>`;
  
  const fileName = 'test/results/comparacao-geral.html';
  fs.writeFileSync(fileName, htmlContent);
  console.log(`\n✅ Gráfico de comparação geral salvo: ${fileName}`);
}

async function generateIndexPage(allStats) {
  const tests = Object.keys(allStats);
  const apis = ['REST', 'GraphQL', 'SOAP', 'gRPC'];
  
  // Calcular médias gerais
  const apiAverages = {};
  apis.forEach(api => {
    const total = tests.reduce((sum, test) => sum + parseFloat(allStats[test][api].avg), 0);
    apiAverages[api] = (total / tests.length).toFixed(2);
  });
  
  // Determinar ranking
  const ranking = Object.entries(apiAverages)
    .sort(([, a], [, b]) => parseFloat(a) - parseFloat(b))
    .map(([api], index) => ({ api, position: index + 1 }));
  
  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Testes de Carga - Resultados</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        header {
            background: white;
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            margin-bottom: 30px;
        }
        h1 {
            color: #333;
            font-size: 36px;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #666;
            font-size: 18px;
        }
        .timestamp {
            color: #999;
            font-size: 14px;
            margin-top: 10px;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: white;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s;
        }
        .stat-card:hover {
            transform: translateY(-5px);
        }
        .stat-card.winner {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: white;
        }
        .stat-card h3 {
            font-size: 18px;
            margin-bottom: 10px;
            opacity: 0.8;
        }
        .stat-card.winner h3 {
            opacity: 1;
        }
        .stat-value {
            font-size: 42px;
            font-weight: bold;
            margin: 10px 0;
        }
        .stat-unit {
            font-size: 14px;
            opacity: 0.7;
        }
        .medal {
            font-size: 48px;
            margin-bottom: 10px;
        }
        .charts-section {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            margin-bottom: 30px;
        }
        .charts-section h2 {
            color: #333;
            margin-bottom: 20px;
            font-size: 28px;
        }
        .chart-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }
        .chart-link {
            display: block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 10px;
            text-decoration: none;
            transition: transform 0.3s, box-shadow 0.3s;
            text-align: center;
        }
        .chart-link:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .chart-link h3 {
            font-size: 20px;
            margin-bottom: 10px;
        }
        .chart-link p {
            opacity: 0.9;
            font-size: 14px;
        }
        .chart-link.featured {
            grid-column: 1 / -1;
            background: linear-gradient(135deg, #FF6B6B 0%, #C92A2A 100%);
        }
        .ranking-section {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        .ranking-section h2 {
            color: #333;
            margin-bottom: 20px;
            font-size: 28px;
            text-align: center;
        }
        .ranking-list {
            list-style: none;
            max-width: 600px;
            margin: 0 auto;
        }
        .ranking-item {
            display: flex;
            align-items: center;
            padding: 20px;
            margin-bottom: 15px;
            background: #f8f9fa;
            border-radius: 10px;
            transition: transform 0.3s;
        }
        .ranking-item:hover {
            transform: translateX(10px);
        }
        .ranking-item.first {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: white;
        }
        .ranking-medal {
            font-size: 32px;
            margin-right: 20px;
            min-width: 40px;
        }
        .ranking-info {
            flex: 1;
        }
        .ranking-api {
            font-size: 24px;
            font-weight: bold;
        }
        .ranking-time {
            font-size: 18px;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>📊 Relatório de Testes de Carga</h1>
            <p class="subtitle">Comparação de Performance: REST vs GraphQL vs SOAP vs gRPC</p>
            <p class="timestamp">Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
        </header>
        
        <div class="stats-grid">
            ${ranking.map(({ api, position }) => {
              const medal = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : '📊';
              const isWinner = position === 1;
              return `
              <div class="stat-card ${isWinner ? 'winner' : ''}">
                  <div class="medal">${medal}</div>
                  <h3>${api}</h3>
                  <div class="stat-value">${apiAverages[api]}</div>
                  <div class="stat-unit">ms médio</div>
                  <p>${position}º lugar</p>
              </div>
              `;
            }).join('')}
        </div>
        
        <div class="charts-section">
            <h2>📈 Gráficos Detalhados</h2>
            <div class="chart-grid">
                <a href="comparacao-geral.html" class="chart-link featured">
                    <h3>🏆 Comparação Geral</h3>
                    <p>Visão completa de todas as operações</p>
                </a>
                ${tests.map(test => {
                  const fileName = test.toLowerCase().replace(/\s+/g, '-');
                  return `
                  <a href="${fileName}.html" class="chart-link">
                      <h3>${test}</h3>
                      <p>Ver análise detalhada</p>
                  </a>
                  `;
                }).join('')}
            </div>
        </div>
        
        <div class="ranking-section">
            <h2>🏆 Ranking de Performance</h2>
            <ul class="ranking-list">
                ${ranking.map(({ api, position }) => {
                  const medal = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : '📊';
                  const isFirst = position === 1;
                  return `
                  <li class="ranking-item ${isFirst ? 'first' : ''}">
                      <span class="ranking-medal">${medal}</span>
                      <div class="ranking-info">
                          <div class="ranking-api">${position}º - ${api}</div>
                          <div class="ranking-time">${apiAverages[api]} ms médio</div>
                      </div>
                  </li>
                  `;
                }).join('')}
            </ul>
        </div>
    </div>
</body>
</html>`;
  
  const fileName = 'test/results/index.html';
  fs.writeFileSync(fileName, htmlContent);
  console.log('✅ Página índice salva: test/results/index.html');
  console.log('\n🌐 Para visualizar os resultados, abra: test/results/index.html');
}

// ========== MAIN ==========

async function main() {
  console.log('🚀 INICIANDO TESTES DE CARGA - APIs de Música\n');
  console.log(`📋 Configuração:`);
  console.log(`   - Requisições por teste: ${NUM_REQUESTS}`);
  console.log(`   - Requisições simultâneas: ${CONCURRENT_REQUESTS}`);
  console.log(`   - Total de testes: 6 operações\n`);
  
  try {
    // Criar clientes
    console.log('🔌 Conectando aos serviços...');
    const soapClient = await soap.createClientAsync(SOAP_URL);
    const grpcClients = await createGrpcClients();
    console.log('✅ Conexões estabelecidas\n');
    
    const allStats = {};
    
    // ID de usuário base para testes de playlist
    const baseUsuarioId = '550e8400-e29b-41d4-a716-446655440000';
    
    // Teste 1: Create Usuario
    const test1 = await runConcurrentTests('Create Usuario', {
      REST: (id) => testRestCreateUsuario(id),
      GraphQL: (id) => testGraphQLCreateUsuario(id),
      SOAP: (id) => testSoapCreateUsuario(soapClient, id),
      gRPC: (id) => testGrpcCreateUsuario(grpcClients.usuario, id)
    });
    allStats['Create Usuario'] = test1.stats;
    await generateChart('Create Usuario', test1.stats);
    
    // Teste 2: Get Usuarios
    const test2 = await runConcurrentTests('Get Usuarios', {
      REST: () => testRestGetUsuarios(),
      GraphQL: () => testGraphQLGetUsuarios(),
      SOAP: () => testSoapGetUsuarios(soapClient),
      gRPC: () => testGrpcGetUsuarios(grpcClients.usuario)
    });
    allStats['Get Usuarios'] = test2.stats;
    await generateChart('Get Usuarios', test2.stats);
    
    // Teste 3: Create Musica
    const test3 = await runConcurrentTests('Create Musica', {
      REST: (id) => testRestCreateMusica(id),
      GraphQL: (id) => testGraphQLCreateMusica(id),
      SOAP: (id) => testSoapCreateMusica(soapClient, id),
      gRPC: (id) => testGrpcCreateMusica(grpcClients.musica, id)
    });
    allStats['Create Musica'] = test3.stats;
    await generateChart('Create Musica', test3.stats);
    
    // Teste 4: Get Musicas
    const test4 = await runConcurrentTests('Get Musicas', {
      REST: () => testRestGetMusicas(),
      GraphQL: () => testGraphQLGetMusicas(),
      SOAP: () => testSoapGetMusicas(soapClient),
      gRPC: () => testGrpcGetMusicas(grpcClients.musica)
    });
    allStats['Get Musicas'] = test4.stats;
    await generateChart('Get Musicas', test4.stats);
    
    // Teste 5: Create Playlist
    const test5 = await runConcurrentTests('Create Playlist', {
      REST: (id) => testRestCreatePlaylist(id, baseUsuarioId),
      GraphQL: (id) => testGraphQLCreatePlaylist(id, baseUsuarioId),
      SOAP: (id) => testSoapCreatePlaylist(soapClient, id, baseUsuarioId),
      gRPC: (id) => testGrpcCreatePlaylist(grpcClients.playlist, id, baseUsuarioId)
    });
    allStats['Create Playlist'] = test5.stats;
    await generateChart('Create Playlist', test5.stats);
    
    // Teste 6: Get Playlists
    const test6 = await runConcurrentTests('Get Playlists', {
      REST: () => testRestGetPlaylists(),
      GraphQL: () => testGraphQLGetPlaylists(),
      SOAP: () => testSoapGetPlaylists(soapClient),
      gRPC: () => testGrpcGetPlaylists(grpcClients.playlist)
    });
    allStats['Get Playlists'] = test6.stats;
    await generateChart('Get Playlists', test6.stats);
    
    // Gráfico de comparação geral
    await generateComparisonChart(allStats);
    
    // Gerar página índice
    await generateIndexPage(allStats);
    
    // Gerar relatório JSON
    const report = {
      timestamp: new Date().toISOString(),
      config: {
        numRequests: NUM_REQUESTS,
        concurrentRequests: CONCURRENT_REQUESTS
      },
      results: allStats
    };
    
    fs.writeFileSync('test/results/report.json', JSON.stringify(report, null, 2));
    console.log('✅ Relatório JSON salvo: test/results/report.json');
    
    // Resumo final
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMO GERAL');
    console.log('='.repeat(60));
    
    const apiTotals = { REST: 0, GraphQL: 0, SOAP: 0, gRPC: 0 };
    const testCount = Object.keys(allStats).length;
    
    for (const test of Object.keys(allStats)) {
      for (const api of ['REST', 'GraphQL', 'SOAP', 'gRPC']) {
        apiTotals[api] += parseFloat(allStats[test][api].avg);
      }
    }
    
    console.log('\nTempo Médio Total (soma de todos os testes):');
    for (const api of ['REST', 'GraphQL', 'SOAP', 'gRPC']) {
      const avg = (apiTotals[api] / testCount).toFixed(2);
      console.log(`  ${api.padEnd(10)}: ${avg} ms`);
    }
    
    // Ranking
    const ranking = Object.entries(apiTotals)
      .sort(([, a], [, b]) => a - b)
      .map(([api], index) => ({ api, position: index + 1 }));
    
    console.log('\n🏆 Ranking de Performance (1º = mais rápido):');
    ranking.forEach(({ api, position }) => {
      const medal = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : '  ';
      console.log(`  ${medal} ${position}º - ${api}`);
    });
    
    console.log('\n✅ Testes concluídos com sucesso!');
    console.log('📁 Resultados salvos em: test/results/\n');
    
  } catch (error) {
    console.error('\n❌ Erro durante os testes:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Executar
if (require.main === module) {
  main();
}

module.exports = { main };
