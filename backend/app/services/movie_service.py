from datetime import datetime, timezone

from bson import ObjectId
from fastapi import HTTPException, status
from app.database.database import db
from app.models.movie_model import movie_model
from app.schemas.movie_schema import MovieCreate


async def add_movie(movie: MovieCreate):

    existing_movie = await db.movies.find_one(
        {"title": movie.title}
    )

    if existing_movie:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Movie already exists."
        )

    new_movie = {
        "title": movie.title,
        "genre": movie.genre,
        "language": movie.language,
        "duration": movie.duration,
        "release_date": movie.release_date,
        "description": movie.description,
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc)
    }

    result = await db.movies.insert_one(new_movie)

    created_movie = await db.movies.find_one(
        {"_id": result.inserted_id}
    )

    return movie_model(created_movie)



async def get_all_movies():

    movies = []

    async for movie in db.movies.find():

        movies.append(
            movie_model(movie)
        )

    return movies



async def get_movie(movie_id: str):

    movie = await db.movies.find_one(
        {"_id": ObjectId(movie_id)}
    )

    if not movie:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie not found."
        )

    return movie_model(movie)




async def update_movie(
    movie_id: str,
    movie: MovieCreate
):

    existing_movie = await db.movies.find_one(
        {"_id": ObjectId(movie_id)}
    )

    if not existing_movie:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie not found."
        )

    updated_movie = {
        "title": movie.title,
        "genre": movie.genre,
        "language": movie.language,
        "duration": movie.duration,
        "release_date": movie.release_date,
        "description": movie.description,
        "updated_at": datetime.now(timezone.utc)
    }

    await db.movies.update_one(
        {"_id": ObjectId(movie_id)},
        {"$set": updated_movie}
    )

    movie = await db.movies.find_one(
        {"_id": ObjectId(movie_id)}
    )

    return movie_model(movie)



async def delete_movie(movie_id: str):

    movie = await db.movies.find_one(
        {"_id": ObjectId(movie_id)}
    )

    if not movie:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie not found."
        )

    await db.movies.update_one(
        {"_id": ObjectId(movie_id)},
        {
            "$set": {
                "is_active": False,
                "updated_at": datetime.now(timezone.utc)
            }
        }
    )

    return {
        "message": "Movie deleted successfully."
    }