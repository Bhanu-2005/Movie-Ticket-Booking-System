from fastapi import APIRouter, Depends, status
from app.dependencies.auth_dependency import get_current_user
from app.schemas.screen_schema import ScreenCreate
from app.services.screen_service import add_screen, get_all_screens, get_screen, update_screen, delete_screen

router = APIRouter(prefix="/screens", tags=["Screens"])

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_screen(screen: ScreenCreate, current_user=Depends(get_current_user)):
    screen = await add_screen(screen)
    return {"success": True, "message": "Screen added successfully.", "data": screen}

@router.get("/")
async def fetch_all_screens():
    screens = await get_all_screens()
    return {"success": True, "message": "Screens fetched successfully.", "data": screens}

@router.get("/{screen_id}")
async def fetch_screen(screen_id: str):
    screen = await get_screen(screen_id)
    return {"success": True, "message": "Screen fetched successfully.", "data": screen}

@router.put("/{screen_id}")
async def edit_screen(screen_id: str, screen: ScreenCreate, current_user=Depends(get_current_user)):
    updated = await update_screen(screen_id, screen)
    return {"success": True, "message": "Screen updated successfully.", "data": updated}

@router.delete("/{screen_id}")
async def remove_screen(screen_id: str, current_user=Depends(get_current_user)):
    await delete_screen(screen_id)
    return {"success": True, "message": "Screen deleted successfully."}
