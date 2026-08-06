from fastapi import APIRouter, Depends, status

from app.dependencies.auth_dependency import get_current_user
from app.schemas.booking_schema import BookingCreate
from app.dependencies.admin_dependency import get_current_admin
from app.services.booking_service import create_booking, fetch_user_bookings, fetch_all_bookings



router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)

@router.post("/", status_code=status.HTTP_201_CREATED)
async def book_ticket(
    booking: BookingCreate,
    current_user=Depends(get_current_user)
):

    booking = await create_booking(
        booking,
        current_user
    )

    return {
        "success": True,
        "message": "Ticket booked successfully.",
        "data": booking
    }

@router.get("/my-bookings")
async def get_my_bookings(
    current_user=Depends(get_current_user)
):

    bookings = await fetch_user_bookings(
        current_user
    )

    return {
        "success": True,
        "message": "Bookings fetched successfully.",
        "data": bookings
    } 

@router.get("/all")
async def get_all_bookings_admin(
    current_admin=Depends(get_current_admin)
):
    bookings = await fetch_all_bookings()
    return {
        "success": True,
        "message": "All bookings fetched successfully.",
        "data": bookings
    }