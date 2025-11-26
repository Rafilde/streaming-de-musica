// Complete API Test Suite
// Run this after all APIs are running

const fetch = require('node-fetch');

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = COLORS.reset) {
  console.log(`${color}${message}${COLORS.reset}`);
}

async function testRestAPI() {
  log('\n=== Testing REST API ===', COLORS.blue);
  
  try {
    const response = await fetch('http://localhost:3000/api/musicas');
    const data = await response.json();
    log('✓ REST API is working!', COLORS.green);
    log(`Found ${data.length} musicas`, COLORS.yellow);
    return true;
  } catch (error) {
    log('✗ REST API failed: ' + error.message, COLORS.red);
    return false;
  }
}

async function testGraphQL() {
  log('\n=== Testing GraphQL API ===', COLORS.blue);
  
  try {
    const query = `
      query {
        musicas {
          id
          nome
          artista
        }
      }
    `;
    
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });
    
    const data = await response.json();
    log('✓ GraphQL API is working!', COLORS.green);
    log(`Found ${data.data.musicas.length} musicas`, COLORS.yellow);
    return true;
  } catch (error) {
    log('✗ GraphQL API failed: ' + error.message, COLORS.red);
    return false;
  }
}

async function testSOAP() {
  log('\n=== Testing SOAP API ===', COLORS.blue);
  
  try {
    const response = await fetch('http://localhost:5000/wsdl?wsdl');
    const wsdl = await response.text();
    
    if (wsdl.includes('MusicStreamingService')) {
      log('✓ SOAP API is working!', COLORS.green);
      log('WSDL is accessible', COLORS.yellow);
      return true;
    } else {
      log('✗ SOAP API failed: Invalid WSDL', COLORS.red);
      return false;
    }
  } catch (error) {
    log('✗ SOAP API failed: ' + error.message, COLORS.red);
    return false;
  }
}

function testGRPC() {
  log('\n=== Testing gRPC API ===', COLORS.blue);
  
  try {
    const grpc = require('@grpc/grpc-js');
    const protoLoader = require('@grpc/proto-loader');
    const path = require('path');
    
    const PROTO_PATH = path.join(__dirname, '../src/grpc/proto/musicstreaming.proto');
    
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });
    
    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
    const musicstreaming = protoDescriptor.musicstreaming;
    
    const client = new musicstreaming.MusicaService(
      'localhost:50051',
      grpc.credentials.createInsecure()
    );
    
    return new Promise((resolve) => {
      client.GetMusicas({}, (error, response) => {
        if (error) {
          log('✗ gRPC API failed: ' + error.message, COLORS.red);
          resolve(false);
        } else {
          log('✓ gRPC API is working!', COLORS.green);
          log(`Found ${response.musicas.length} musicas`, COLORS.yellow);
          resolve(true);
        }
      });
    });
  } catch (error) {
    log('✗ gRPC API failed: ' + error.message, COLORS.red);
    return Promise.resolve(false);
  }
}

async function runAllTests() {
  log('\n╔═══════════════════════════════════════╗', COLORS.blue);
  log('║   Music Streaming API Test Suite     ║', COLORS.blue);
  log('╚═══════════════════════════════════════╝', COLORS.blue);
  
  const results = {
    REST: await testRestAPI(),
    GraphQL: await testGraphQL(),
    SOAP: await testSOAP(),
    gRPC: await testGRPC()
  };
  
  log('\n=== Test Summary ===', COLORS.blue);
  let passedTests = 0;
  
  for (const [api, result] of Object.entries(results)) {
    const status = result ? '✓ PASS' : '✗ FAIL';
    const color = result ? COLORS.green : COLORS.red;
    log(`${api}: ${status}`, color);
    if (result) passedTests++;
  }
  
  log(`\nPassed: ${passedTests}/4`, passedTests === 4 ? COLORS.green : COLORS.yellow);
  
  if (passedTests === 4) {
    log('\n🎉 All APIs are working correctly!', COLORS.green);
  } else {
    log('\n⚠️  Some APIs are not responding. Make sure all servers are running.', COLORS.yellow);
    log('Run each API with: npm run start:rest, npm run start:graphql, etc.', COLORS.yellow);
  }
}

// Run tests
runAllTests().catch(console.error);
