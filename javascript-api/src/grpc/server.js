const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

const {
  usuarioService,
  playlistService,
  musicaService,
  playlistMusicaService
} = require('./services');

const PROTO_PATH = path.join(__dirname, 'proto', 'musicstreaming.proto');
const PORT = process.env.GRPC_PORT || 50051;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const musicstreaming = protoDescriptor.musicstreaming;

function main() {
  const server = new grpc.Server();

  // Add services
  server.addService(musicstreaming.UsuarioService.service, usuarioService);
  server.addService(musicstreaming.PlaylistService.service, playlistService);
  server.addService(musicstreaming.MusicaService.service, musicaService);
  server.addService(musicstreaming.PlaylistMusicaService.service, playlistMusicaService);

  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error('Error starting gRPC server:', error);
        return;
      }
      console.log(`gRPC API running on port ${port}`);
      server.start();
    }
  );
}

main();
