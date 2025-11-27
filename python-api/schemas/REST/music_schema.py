from pydantic import BaseModel

class MusicaCadastro(BaseModel):
    nome: str
    artista: str

class MusicaResposta(BaseModel):
    id: int
    nome: str
    artista: str