"""
Router para rotas de Autenticação
"""
from fastapi import APIRouter, HTTPException
from schemas.REST.auth_schema import UsuarioRegistro, UsuarioAutenticacao, UsuarioResposta
from schemas.REST.playlist_schema import PlaylistCompleta
from services.auth_service import autenticar_usuario, cadastrar_usuario, listar_todos_usuarios
from services.playlist_service import listar_playlists_usuario_com_musicas
from typing import List

router = APIRouter(prefix="/auth", tags=["Autenticação"])


@router.post("/register", response_model=UsuarioResposta)
def cadastro(user: UsuarioRegistro):
    """Registra um novo usuário"""
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


@router.post("/login", response_model=UsuarioResposta)
def login(user: UsuarioAutenticacao):
    """Faz login de um usuário"""
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


@router.get("/usuarios", response_model=List[dict])
def get_todos_usuarios():
    """Lista todos os usuários"""
    try:
        return listar_todos_usuarios()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/usuarios/{usuario_id}/playlists_detalhadas", response_model=List[PlaylistCompleta])
def ver_playlists_do_usuario(usuario_id: str):
    """Retorna todas as playlists de um usuário específico com suas músicas (rota legada)"""
    try:
        return listar_playlists_usuario_com_musicas(usuario_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
