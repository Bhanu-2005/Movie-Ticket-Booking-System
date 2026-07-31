from datetime import datetime, timezone
from bson import ObjectId
from fastapi import HTTPException, status
from app.database.database import get_database
from app.models.theatre_model import theatre_model
from app.schemas.theatre_schema import TheatreCreate

async def add_theatre(theatre: TheatreCreate):
    db = get_database()
    existing_theatre = await db.theatres.find_one(
        {
            "name": theatre.name,
            "city": theatre.city
        }
    )

    if existing_theatre:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Theatre already exists."
        )

    now = datetime.now(timezone.utc)
    new_theatre = {
        "name": theatre.name,
        "city": theatre.city,
        "address": theatre.address,
        "total_screens": theatre.total_screens,
        "is_active": True,
        "created_at": now,
        "updated_at": now
    }

    result = await db.theatres.insert_one(new_theatre)
    new_theatre["_id"] = result.inserted_id
    return theatre_model(new_theatre)

async def get_all_theatres():
    db = get_database()
    theatres = []
    async for theatre in db.theatres.find({"is_active": True}):
        theatres.append(theatre_model(theatre))
    return theatres

async def get_theatre(theatre_id: str):
    db = get_database()
    if not ObjectId.is_valid(theatre_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Theatre ID format"
        )
    theatre = await db.theatres.find_one(
        {
            "_id": ObjectId(theatre_id),
            "is_active": True
        }
    )
    if not theatre:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Theatre not found."
        )
    return theatre_model(theatre)

async def update_theatre(theatre_id: str, theatre: TheatreCreate):
    db = get_database()
    if not ObjectId.is_valid(theatre_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Theatre ID format"
        )
    existing = await db.theatres.find_one({"_id": ObjectId(theatre_id)})
    if not existing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Theatre not found."
        )

    updated = {
        "name": theatre.name,
        "city": theatre.city,
        "address": theatre.address,
        "total_screens": theatre.total_screens,
        "updated_at": datetime.now(timezone.utc)
    }

    await db.theatres.update_one(
        {"_id": ObjectId(theatre_id)},
        {"$set": updated}
    )

    theatre_doc = await db.theatres.find_one({"_id": ObjectId(theatre_id)})
    return theatre_model(theatre_doc)

async def delete_theatre(theatre_id: str):
    db = get_database()
    if not ObjectId.is_valid(theatre_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Theatre ID format"
        )
    theatre = await db.theatres.find_one({"_id": ObjectId(theatre_id)})
    if not theatre:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Theatre not found."
        )

    await db.theatres.update_one(
        {"_id": ObjectId(theatre_id)},
        {
            "$set": {
                "is_active": False,
                "updated_at": datetime.now(timezone.utc)
            }
        }
    )

    return {"message": "Theatre deleted successfully."}
