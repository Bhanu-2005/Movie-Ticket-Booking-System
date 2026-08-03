from fastapi import APIRouter

from app.services.dashboard_service import dashboard_summary


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary")
async def summary():

    data = await dashboard_summary()

    return {

        "success": True,

        "message": "Dashboard fetched successfully.",

        "data": data

    }