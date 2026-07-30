from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserRegister(BaseModel):
    name: str = Field(..., min_length=3, max_length=50, json_schema_extra={"example": "Bhanu"})
    email: EmailStr = Field(..., json_schema_extra={"example": "user@example.com"})
    phone: str = Field(..., min_length=10, max_length=10, json_schema_extra={"example": "9391145787"})
    password: str = Field(..., min_length=6, json_schema_extra={"example": "password123"})

class UserLogin(BaseModel):
    email: EmailStr = Field(..., json_schema_extra={"example": "user@example.com"})
    password: str = Field(..., json_schema_extra={"example": "password123"})

class UserResponse(BaseModel):
    id: Optional[str] = None
    name: str
    email: EmailStr
    phone: str
    role: str = "user"
    is_active: bool = True
    created_at: Optional[datetime] = None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
