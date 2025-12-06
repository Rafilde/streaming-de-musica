from pydantic import BaseModel

class UsuarioAutenticacao(BaseModel):
    email: str
    senha: str

class UsuarioRegistro(BaseModel):
    email: str
    senha: str
    nome: str
    idade: int

class UsuarioResposta(BaseModel):
    status: str
    mensagem: str
    dado: dict | None = None

