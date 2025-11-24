from fastapi import FastAPI, HTTPException
from typing import List 
from schemas.auth_schema import UserRegister, UserAuth, UserResponse
from services.auth_service import register_user, authenticate_user
from schemas.music_schema import MusicResponse, MusicRegister
from services.music_service import register_music, get_all_music

app = FastAPI(title="API Streaming Music")

@app.post("/auth/register", response_model=UserResponse)
def register(user: UserRegister):
    try:
        result = register_user(
            email=user.email,
            password=user.password,
            username=user.username,
            age=user.age
        )

        return UserResponse(
            status="Success",
            message="Usuário criado com sucesso",
            data=result
        )

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/auth/login", response_model=UserResponse)
def login(user: UserAuth):
    try:
        result = authenticate_user(
            email=user.email,
            password=user.password
        )

        return UserResponse(
            status="Success",
            message="Login realizado",
            data=result
        )

    except Exception as e:
        raise HTTPException(status_code=401, detail="Email ou senha inválidos")

@app.post("/musicas", response_model=MusicResponse)
def criar_musica(musica: MusicRegister):
    try:
        return register_music(musica.name, musica.artist)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/musicas", response_model=List[MusicResponse])
def listar_musicas():
    try:
        return get_all_music()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))