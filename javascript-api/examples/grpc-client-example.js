const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../src/grpc/proto/musicstreaming.proto');
const GRPC_SERVER = 'localhost:50051';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const musicstreaming = protoDescriptor.musicstreaming;

// Create clients
const usuarioClient = new musicstreaming.UsuarioService(
  GRPC_SERVER,
  grpc.credentials.createInsecure()
);

const playlistClient = new musicstreaming.PlaylistService(
  GRPC_SERVER,
  grpc.credentials.createInsecure()
);

const musicaClient = new musicstreaming.MusicaService(
  GRPC_SERVER,
  grpc.credentials.createInsecure()
);

const playlistMusicaClient = new musicstreaming.PlaylistMusicaService(
  GRPC_SERVER,
  grpc.credentials.createInsecure()
);

// Example: Get all usuarios
console.log('Testing gRPC client - Getting all usuarios...\n');

usuarioClient.GetUsuarios({}, (error, response) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('Usuarios:', response.usuarios);
});

// Example: Get all musicas
setTimeout(() => {
  console.log('\nTesting gRPC client - Getting all musicas...\n');
  
  musicaClient.GetMusicas({}, (error, response) => {
    if (error) {
      console.error('Error:', error.message);
      return;
    }
    console.log('Musicas:', response.musicas);
  });
}, 1000);

// You can add more example calls here
