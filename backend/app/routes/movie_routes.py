from fastapi import APIRouter, status, Depends, Query
from typing import List, Optional
from app.schemas.movie_schema import MovieCreate, MovieUpdate, MovieResponse
from app.services.movie_service import (
    create_movie,
    get_all_movies,
    get_movie_by_id,
    update_movie,
    delete_movie
)
from app.dependencies.auth_dependency import get_current_user

router = APIRouter(prefix="/movies", tags=["Movies"])

@router.get("", response_model=List[MovieResponse], status_code=status.HTTP_200_OK)
async def list_movies(
    search: Optional[str] = Query(None, description="Search movie by title"),
    genre: Optional[str] = Query(None, description="Filter by genre")
):
    return await get_all_movies(search=search, genre=genre)

@router.get("/{movie_id}", response_model=MovieResponse, status_code=status.HTTP_200_OK)
async def get_movie(movie_id: str):
    return await get_movie_by_id(movie_id)

@router.post("", response_model=MovieResponse, status_code=status.HTTP_201_CREATED)
async def add_movie(
    movie: MovieCreate,
    current_user=Depends(get_current_user)
):
    return await create_movie(movie)

@router.put("/{movie_id}", response_model=MovieResponse, status_code=status.HTTP_200_OK)
async def edit_movie(
    movie_id: str,
    movie: MovieUpdate,
    current_user=Depends(get_current_user)
):
    return await update_movie(movie_id, movie)

@router.delete("/{movie_id}", status_code=status.HTTP_200_OK)
async def remove_movie(
    movie_id: str,
    current_user=Depends(get_current_user)
):
    return await delete_movie(movie_id)
