from pydantic import BaseModel
from typing import List

class PlaylistCadastro(BaseModel):
    nome: str
    usuario_id: str

class AdicionarMusicaPlaylist(BaseModel):
    playlist_id: int
    musica_id: int

class MusicaSimples(BaseModel):
    id: int
    nome: str
    artista: str

class PlaylistCompleta(BaseModel):
    id: int
    nome: str
    musicas: List[MusicaSimples] = []