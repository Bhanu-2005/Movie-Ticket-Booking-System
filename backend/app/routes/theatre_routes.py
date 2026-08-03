from fastapi import APIRouter, Depends, status

from app.dependencies.auth_dependency import get_current_user
from app.schemas.theatre_schema import TheatreCreate
from app.services.theatre_service import (
    add_theatre,
    get_all_theatres,
    get_theatre,
    update_theatre,
    delete_theatre,
)



router = APIRouter(
    prefix="/theatres",
    tags=["Theatres"]
)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_theatre(
    theatre: TheatreCreate,
    current_user=Depends(get_current_user)
):
    theatre = await add_theatre(theatre)

    return {
        "success": True,
        "message": "Theatre added successfully.",
        "data": theatre
    }




@router.get("/")
async def fetch_all_theatres():

    theatres = await get_all_theatres()

    return {
        "success": True,
        "message": "Theatres fetched successfully.",
        "data": theatres
    }




@router.get("/{theatre_id}")
async def fetch_theatre(theatre_id: str):

    theatre = await get_theatre(theatre_id)

    return {
        "success": True,
        "message": "Theatre fetched successfully.",
        "data": theatre
    }





@router.put("/{theatre_id}")
async def edit_theatre(
    theatre_id: str,
    theatre: TheatreCreate,
    current_user=Depends(get_current_user)
):

    updated = await update_theatre(
        theatre_id,
        theatre
    )

    return {
        "success": True,
        "message": "Theatre updated successfully.",
        "data": updated
    }




@router.delete("/{theatre_id}")
async def remove_theatre(
    theatre_id: str,
    current_user=Depends(get_current_user)
):

    await delete_theatre(theatre_id)

    return {
        "success": True,
        "message": "Theatre deleted successfully."
    }




