from fastapi import FastAPI, HTTPException
from schemas.auth_schema import UserRegister, UserAuth, UserResponse
from services.auth_service import register_user, authenticate_user

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