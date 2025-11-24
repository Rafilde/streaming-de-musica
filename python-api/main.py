from fastapi import FastAPI, HTTPException
from typing import List 
from schemas.auth_schema import UsuarioRegistro, UsuarioAutenticacao, UsuarioResposta
from services.auth_service import autenticar_usuario, cadastrar_usuario
from schemas.music_schema import MusicaCadastro, MusicaResposta
from services.music_service import cadastrar_musica, obter_todas_musicas
from schemas.playlist_schema import (
    PlaylistCadastro, 
    AdicionarMusicaPlaylist, 
    PlaylistCompleta, 
)
from services.playlist_service import (
    criar_playlist_servico, 
    adicionar_musica_servico,
    obter_playlist_detalhada,        
    listar_playlists_usuario_com_musicas 
)

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
    
#---------------------------------------------------------------------------------------------------------------

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
    
#---------------------------------------------------------------------------------------------------------------

@app.post("/playlists")
def criar(p: PlaylistCadastro):
    try:
        return criar_playlist_servico(p.nome, p.usuario_id)
    except Exception as e:
        raise HTTPException(400, str(e))

@app.post("/playlists/adicionar")
def add_musica(d: AdicionarMusicaPlaylist):
    try:
        adicionar_musica_servico(d.playlist_id, d.musica_id)
        return {"status": "OK", "mensagem": "Adicionado!"}
    except Exception as e:
        raise HTTPException(400, str(e))

@app.get("/playlists/{playlist_id}", response_model=PlaylistCompleta)
def ver_playlist(playlist_id: int):
    try:
        resultado = obter_playlist_detalhada(playlist_id)
        if not resultado:
            raise HTTPException(status_code=404, detail="Playlist não encontrada")
        return resultado
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/usuarios/{usuario_id}/playlists_detalhadas", response_model=List[PlaylistCompleta])
def ver_playlists_do_usuario(usuario_id: str):
    try:
        return listar_playlists_usuario_com_musicas(usuario_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))