import asyncio
import uvicorn
import grpc
from concurrent import futures
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter
from schemas.GRAPHQL.graphql_schema import schema
from routers.auth_router import router as auth_router
from routers.music_router import router as music_router
from routers.playlist_router import router as playlist_router
from schemas.GRPC import streaming_pb2_grpc
from routers.grpc_servicer import StreamingServicer

# ============================================================================
# Inicializar aplicação
# ============================================================================

app = FastAPI(
    title="API Streaming Music",
    description="Backend Híbrido: REST (8000), GraphQL (8000) e gRPC (50051)",
    version="2.0.0"
)

# ============================================================================
# Middleware CORS
# ============================================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# Integrar GraphQL
# ============================================================================

graphql_app = GraphQLRouter(schema, path="/graphql")
app.include_router(graphql_app)

# ============================================================================
# Integrar Routers REST
# ============================================================================

app.include_router(auth_router)
app.include_router(music_router)
app.include_router(playlist_router)

# ============================================================================
# Rota raiz
# ============================================================================

@app.get("/")
def root():
    """
    Raiz da API - Bem-vindo!
    
    Acesse:
    - REST Docs: http://localhost:8000/docs
    - GraphQL: http://localhost:8000/graphql
    - ReDoc: http://localhost:8000/redoc
    """
    return {
        "mensagem": "Bem-vindo à API Streaming Music",
        "endpoints": {
            "docs_swagger": "http://localhost:8000/docs",
            "graphql": "http://localhost:8000/graphql",
            "redoc": "http://localhost:8000/redoc",
            "autenticacao": "/auth",
            "musicas": "/musicas",
            "playlists": "/playlists"
        }
    }

# ============================================================================
# Integrar Servidor gRPC
# ============================================================================

async def iniciar_grpc():
    """Configura e inicia o servidor gRPC na porta 50051"""
    server = grpc.aio.server(futures.ThreadPoolExecutor(max_workers=10))
    
    streaming_pb2_grpc.add_StreamingServiceServicer_to_server(StreamingServicer(), server)
    
    server.add_insecure_port('[::]:50051')
    
    print("🚀 Servidor gRPC rodando em localhost:50051")
    await server.start()
    await server.wait_for_termination()

# ============================================================================
# Loop Principal (Roda FastAPI e gRPC juntos)
# ============================================================================

async def main():
    task_grpc = asyncio.create_task(iniciar_grpc())
    
    config = uvicorn.Config(app, host="0.0.0.0", port=8000, log_level="info")
    server = uvicorn.Server(config)
    
    print("🚀 Servidor REST/GraphQL rodando em localhost:8000")
    
    task_fastapi = asyncio.create_task(server.serve())
    
    await asyncio.gather(task_grpc, task_fastapi)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nDesligando servidores...")