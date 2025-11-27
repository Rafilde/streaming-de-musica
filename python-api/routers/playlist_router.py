"""
Router para rotas de Playlists
"""
from fastapi import APIRouter, HTTPException
from typing import List
from schemas.REST.playlist_schema import (
    PlaylistCadastro, 
    AdicionarMusicaPlaylist, 
    PlaylistCompleta
)
from services.playlist_service import (
    criar_playlist_servico, 
    adicionar_musica_servico,
    obter_playlist_detalhada,        
    listar_playlists_usuario_com_musicas
)

router = APIRouter(prefix="/playlists", tags=["Playlists"])


@router.post("", response_model=PlaylistCompleta)
def criar_playlist(playlist: PlaylistCadastro):
    """Cria uma nova playlist"""
    try:
        resultado = criar_playlist_servico(playlist.nome, playlist.usuario_id)
        return PlaylistCompleta(
            id=resultado["id"],
            nome=resultado["nome"],
            musicas=[]
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/adicionar-musica")
def adicionar_musica_playlist(dados: AdicionarMusicaPlaylist):
    """Adiciona uma música a uma playlist"""
    try:
        adicionar_musica_servico(dados.playlist_id, dados.musica_id)
        return {"status": "OK", "mensagem": "Música adicionada com sucesso!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{playlist_id}", response_model=PlaylistCompleta)
def obter_playlist(playlist_id: int):
    """Retorna uma playlist específica com suas músicas"""
    try:
        resultado = obter_playlist_detalhada(playlist_id)
        if not resultado:
            raise HTTPException(status_code=404, detail="Playlist não encontrada")
        return resultado
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/usuario/{usuario_id}")
def obter_playlists_usuario(usuario_id: str):
    """Retorna todas as playlists de um usuário com suas músicas"""
    try:
        return listar_playlists_usuario_com_musicas(usuario_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
