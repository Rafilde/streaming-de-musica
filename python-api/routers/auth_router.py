"""
Router para rotas de Autenticação
"""
from fastapi import APIRouter, HTTPException
from schemas.REST.auth_schema import UsuarioRegistro, UsuarioAutenticacao, UsuarioResposta
from services.auth_service import autenticar_usuario, cadastrar_usuario, listar_todos_usuarios
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
