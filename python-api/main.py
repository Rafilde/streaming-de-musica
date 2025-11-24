from fastapi import FastAPI, HTTPException
from typing import List 
from schemas.auth_schema import UsuarioRegistro, UsuarioAutenticacao, UsuarioResposta
from services.auth_service import autenticar_usuario, cadastrar_usuario
from schemas.music_schema import MusicaCadastro, MusicaResposta
from services.music_service import cadastrar_musica, obter_todas_musicas

app = FastAPI(title="API Streaming Music")

@app.post("/auth/register", response_model=UsuarioResposta)
def cadastro(user: UsuarioRegistro):
    try:
        resultado = cadastrar_usuario(
            email=user.email,
            senha=user.senha,
            nome=user.nome,
            idade=user.idade
        )

        return UsuarioResposta(
            status="Success",
            mensagem="Usuário criado com sucesso",
            dado=resultado
        )

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/auth/login", response_model=UsuarioResposta)
def login(user: UsuarioAutenticacao):
    try:
        resultado = autenticar_usuario(
            email=user.email,
            senha=user.senha
        )

        return UsuarioResposta(
            status="Success",
            mensagem="Login realizado",
            dado=resultado
        )

    except Exception as e:
        raise HTTPException(status_code=401, detail="Email ou senha inválidos")

@app.post("/musicas", response_model=MusicaResposta)
def criar_musica(musica: MusicaCadastro):
    try:
        return cadastrar_musica(musica.nome, musica.artista)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/musicas", response_model=List[MusicaResposta])
def listar_musicas():
    try:
        return obter_todas_musicas()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))