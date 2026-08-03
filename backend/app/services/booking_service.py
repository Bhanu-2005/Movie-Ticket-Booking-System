from datetime import datetime, timezone

from bson import ObjectId
from fastapi import HTTPException, status

from app.database.database import db
from app.models.booking_model import booking_model
from app.schemas.booking_schema import BookingCreate


async def create_booking(
    booking: BookingCreate,
    current_user
):

    show = await db.shows.find_one(
        {
            "_id": ObjectId(booking.show_id),
            "is_active": True
        }
    )

    if not show:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Show not found."
        )

    existing_bookings = db.bookings.find(
        {
            "show_id": ObjectId(booking.show_id),
            "booking_status": "CONFIRMED"
        }
    )

    booked_seats = []

    async for b in existing_bookings:

        booked_seats.extend(
            b["seats"]
        )

    duplicate = set(booking.seats).intersection(
        booked_seats
    )

    if duplicate:

        raise HTTPException(
            status_code=400,
            detail=f"Seats already booked: {list(duplicate)}"
        )


    new_booking = {

        "user_id": ObjectId(current_user["_id"]),

        "show_id": ObjectId(booking.show_id),

        "seats": booking.seats,

        "total_amount": booking.total_amount,

        "booking_status": "CONFIRMED",

        "created_at": datetime.now(timezone.utc),

        "updated_at": datetime.now(timezone.utc)

    }

    result = await db.bookings.insert_one(
        new_booking
    )

    booking = await db.bookings.find_one(
        {
            "_id": result.inserted_id
        }
    )

    return booking_model(booking)

