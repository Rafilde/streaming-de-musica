from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter
from schemas.GRAPHQL.graphql_schema import schema
from routers.auth_router import router as auth_router
from routers.music_router import router as music_router
from routers.playlist_router import router as playlist_router

# ============================================================================
# Inicializar aplicação
# ============================================================================

app = FastAPI(
    title="API Streaming Music",
    description="Backend para serviço de streaming de músicas com REST e GraphQL",
    version="1.0.0"
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