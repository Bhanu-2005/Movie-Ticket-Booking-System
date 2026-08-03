from fastapi import APIRouter, Depends, HTTPException, status

from app.dependencies.auth_dependency import get_current_user
from app.dependencies.admin_dependency import get_current_admin
from app.services.movie_service import(
    add_movie as svc_create_movie,
    get_all_movies,
    get_movie as get_movie_by_id,
    update_movie,
    delete_movie
)

from app.schemas.movie_schema import MovieCreate, MovieUpdate


router = APIRouter(
    prefix="/movies",
    tags=["Movies"]
)


@router.post(
    "/",
    status_code = status.HTTP_201_CREATED
)

async def create_movie_route(
    movie: MovieCreate,
    current_user = Depends(get_current_user)
):
    created_movie = await svc_create_movie(movie)
    return{
        "success": True,
        "message": "Movie added successfully.",
        "data": created_movie
    }



@router.get("/")
async def fetch_all_movies():
    movies = await get_all_movies()

    return{
        "success": True,
        "message": "Movies fetched successfully.",
        "data": movies
    }


@router.get("/{movie_id}")
async def fetch_movie(movie_id: str):

    movie = await get_movie_by_id(movie_id)

    return {
        "success": True,
        "message": "Movie fetched successfully.",
        "data": movie
    }



@router.put("/{movie_id}")
async def edit_movie(
    movie_id: str,
    movie: MovieUpdate,
    current_user=Depends(get_current_user)
):

    updated_movie = await update_movie(
        movie_id,
        movie
    )

    return {
        "success": True,
        "message": "Movie updated successfully.",
        "data": updated_movie
    }



@router.delete("/{movie_id}")
async def remove_movie(
    movie_id: str,
    current_user=Depends(get_current_user)
):

    await delete_movie(movie_id)

    return {
        "success": True,
        "message": "Movie deleted successfully."
    }