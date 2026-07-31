from datetime import datetime, timezone
from fastapi import HTTPException, status
from bson import ObjectId
from app.database.database import get_database
from app.schemas.movie_schema import MovieCreate, MovieUpdate
from app.models.movie_model import movie_model

async def create_movie(movie_data: MovieCreate):
    db = get_database()
    now = datetime.now(timezone.utc)
    new_movie = movie_data.model_dump()
    new_movie.update({
        "is_active": True,
        "created_at": now,
        "updated_at": now
    })
    
    result = await db.movies.insert_one(new_movie)
    new_movie["_id"] = result.inserted_id
    return movie_model(new_movie)

async def get_all_movies(search: str | None = None, genre: str | None = None):
    db = get_database()
    query = {"is_active": True}
    
    if search:
        query["title"] = {"$regex": search, "$options": "i"}
    if genre:
        query["genre"] = {"$in": [genre]}
        
    movies = []
    cursor = db.movies.find(query)
    async for movie in cursor:
        movies.append(movie_model(movie))
    return movies

async def get_movie_by_id(movie_id: str):
    db = get_database()
    if not ObjectId.is_valid(movie_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Movie ID format"
        )
        
    movie = await db.movies.find_one({"_id": ObjectId(movie_id)})
    if not movie:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie not found"
        )
    return movie_model(movie)

async def update_movie(movie_id: str, movie_data: MovieUpdate):
    db = get_database()
    if not ObjectId.is_valid(movie_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Movie ID format"
        )
        
    update_dict = {k: v for k, v in movie_data.model_dump().items() if v is not None}
    if not update_dict:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields provided to update"
        )
        
    update_dict["updated_at"] = datetime.now(timezone.utc)
    result = await db.movies.update_one(
        {"_id": ObjectId(movie_id)},
        {"$set": update_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie not found"
        )
        
    return await get_movie_by_id(movie_id)

async def delete_movie(movie_id: str):
    db = get_database()
    if not ObjectId.is_valid(movie_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Movie ID format"
        )
        
    result = await db.movies.delete_one({"_id": ObjectId(movie_id)})
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie not found"
        )
    return {"message": "Movie deleted successfully"}
