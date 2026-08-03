from fastapi import APIRouter, Depends, status

from app.dependencies.auth_dependency import get_current_user
from app.schemas.show_schema import ShowCreate
from app.services.show_service import (
    add_show,
    get_all_shows,
    get_show
)


router = APIRouter(
    prefix="/shows",
    tags=["Shows"]
)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_show(
    show: ShowCreate,
    current_user=Depends(get_current_user)
):

    created_show = await add_show(show)

    return {
        "success": True,
        "message": "Show added successfully.",
        "data": created_show
    }


@router.get("/")
async def fetch_all_shows():

    shows = await get_all_shows()

    return {
        "success": True,
        "message": "Shows fetched successfully.",
        "data": shows
    }


@router.get("/{show_id}")
async def fetch_show(show_id: str):

    show = await get_show(show_id)

    return {
        "success": True,
        "message": "Show fetched successfully.",
        "data": show
    }


