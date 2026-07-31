from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)

    email: EmailStr

    phone: str = Field(..., min_length=10, max_length=10)


class UserRegister(UserBase):
    password: str = Field(..., min_length=6)


class UserLogin(BaseModel):
    email: EmailStr

    password: str


class UserResponse(UserBase):
    id: Optional[str] = None

    role: str

    is_active: bool

    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse