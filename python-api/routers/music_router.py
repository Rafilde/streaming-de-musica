"""
Router para rotas de Músicas
"""
from fastapi import APIRouter, HTTPException
from typing import List
from schemas.REST.music_schema import MusicaCadastro, MusicaResposta
from schemas.REST.playlist_schema import PlaylistResposta
from services.music_service import cadastrar_musica, obter_todas_musicas
from services.playlist_service import listar_playlists_com_musica

router = APIRouter(prefix="/musicas", tags=["Músicas"])


@router.post("", response_model=MusicaResposta)
def criar_musica(musica: MusicaCadastro):
    """Cria uma nova música"""
    try:
        return cadastrar_musica(musica.nome, musica.artista)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("", response_model=List[MusicaResposta])
def listar_musicas():
    """Lista todas as músicas"""
    try:
        return obter_todas_musicas()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{musica_id}/playlists", response_model=List[PlaylistResposta])
def get_playlists_da_musica(musica_id: int):
    """Retorna todas as playlists que contêm uma música específica"""
    try:
        return listar_playlists_com_musica(musica_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
