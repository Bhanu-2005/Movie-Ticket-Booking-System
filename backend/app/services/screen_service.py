from datetime import datetime, timezone
from bson import ObjectId
from fastapi import HTTPException, status
from app.database.database import db
from app.models.screen_model import screen_model
from app.schemas.screen_schema import ScreenCreate

# Add Screen
async def add_screen(screen: ScreenCreate):
    theatre = await db.theatres.find_one({"_id": ObjectId(screen.theatre_id), "is_active": True})
    if not theatre:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Theatre not found.")

    existing_screen = await db.screens.find_one({"theatre_id": screen.theatre_id, "name": screen.name, "is_active": True})
    if existing_screen:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Screen already exists.")

    new_screen = {
        "theatre_id": screen.theatre_id,
        "name": screen.name,
        "total_seats": screen.total_seats,
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc)
    }
    result = await db.screens.insert_one(new_screen)
    created_screen = await db.screens.find_one({"_id": result.inserted_id})
    return screen_model(created_screen)

# Get All Screens
async def get_all_screens():
    screens = []
    async for screen in db.screens.find({"is_active": True}):
        screens.append(screen_model(screen))
    return screens

# Get Screen By ID
async def get_screen(screen_id: str):
    screen = await db.screens.find_one({"_id": ObjectId(screen_id), "is_active": True})
    if not screen:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Screen not found.")
    return screen_model(screen)

# Update Screen
async def update_screen(screen_id: str, screen: ScreenCreate):
    existing = await db.screens.find_one({"_id": ObjectId(screen_id)})
    if not existing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Screen not found.")

    updated = {
        "theatre_id": screen.theatre_id,
        "name": screen.name,
        "total_seats": screen.total_seats,
        "updated_at": datetime.now(timezone.utc)
    }
    await db.screens.update_one({"_id": ObjectId(screen_id)}, {"$set": updated})
    updated_screen = await db.screens.find_one({"_id": ObjectId(screen_id)})
    return screen_model(updated_screen)

# Delete Screen (Soft Delete)
async def delete_screen(screen_id: str):
    screen = await db.screens.find_one({"_id": ObjectId(screen_id)})
    if not screen:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Screen not found.")
    await db.screens.update_one({"_id": ObjectId(screen_id)}, {"$set": {"is_active": False, "updated_at": datetime.now(timezone.utc)}})
    return {"message": "Screen deleted successfully."}
