from fastapi import APIRouter, status
from app.schemas.user_schema import UserRegister, UserLogin, UserResponse, TokenResponse
from app.services.auth_service import register_user, login_user
from fastapi import Depends
# pyrefly: ignore [missing-import]
from app.dependencies.auth_dependency import get_current_user
from app.models.user_model import user_model
router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user: UserRegister):
    return await register_user(user)

@router.post("/login", response_model=TokenResponse, status_code=status.HTTP_200_OK)
async def login(login_data: UserLogin):
    return await login_user(login_data)



@router.get("/me")
async def get_profile(
    current_user=Depends(get_current_user)
):

    return {
        "success": True,
        "message": "Profile fetched successfully.",
        "data": user_model(current_user)
    }