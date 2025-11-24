from pydantic import BaseModel

class UserAuth(BaseModel):
    email: str
    password: str

class UserRegister(BaseModel):
    email: str
    password: str
    username: str
    age: int

class UserResponse(BaseModel):
    status: str
    message: str
    data: dict | None = None

