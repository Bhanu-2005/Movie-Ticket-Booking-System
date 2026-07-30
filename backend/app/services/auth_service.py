from datetime import datetime, timezone
from fastapi import HTTPException, status
from app.database.database import get_databse
from app.schemas.user_schema import UserRegister, UserLogin
from app.utils.security import hash_password, verify_password
from app.utils.jwt_handler import create_access_token
from app.models.user_model import user_model

async def register_user(user_data: UserRegister):
    db = get_databse()
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_pwd = hash_password(user_data.password)
    now = datetime.now(timezone.utc)
    new_user = {
        "name": user_data.name,
        "email": user_data.email,
        "phone": user_data.phone,
        "password": hashed_pwd,
        "role": "customer",
        "is_active": True,
        "created_at": now,
        "updated_at": now
    }
    
    result = await db.users.insert_one(new_user)
    new_user["_id"] = result.inserted_id
    return user_model(new_user)

async def login_user(login_data: UserLogin):
    db = get_databse()
    user = await db.users.find_one({"email": login_data.email})
    if not user or not verify_password(login_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    access_token = create_access_token(data={"sub": str(user["_id"]), "email": user["email"]})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_model(user)
    }
