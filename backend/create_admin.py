import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from app.utils.security import hash_password
from datetime import datetime, timezone

async def create_admin():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client.movie_booking_db
    
    hashed_pwd = hash_password("admin123")
    now = datetime.now(timezone.utc)
    
    admin_user = {
        "name": "Admin User",
        "email": "admin@example.com",
        "phone": "0000000000",
        "password": hashed_pwd,
        "role": "admin",
        "is_active": True,
        "created_at": now,
        "updated_at": now
    }
    
    await db.users.update_one(
        {"email": "admin@example.com"}, 
        {"$set": admin_user},
        upsert=True
    )
    print("Admin user created/updated successfully!")

asyncio.run(create_admin())
