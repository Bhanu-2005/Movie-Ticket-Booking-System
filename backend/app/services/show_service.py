from datetime import datetime, timezone

from bson import ObjectId
from fastapi import HTTPException, status

from app.database.database import db
from app.models.show_models import show_model
from app.schemas.show_schema import ShowCreate



async def add_show(show: ShowCreate):

    if not ObjectId.is_valid(show.movie_id) or not ObjectId.is_valid(show.theatre_id) or not ObjectId.is_valid(show.screen_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid ID format for movie, theatre, or screen."
        )

    movie = await db.movies.find_one(
        {
            "_id": ObjectId(show.movie_id),
            "is_active": True
        }
    )

    if not movie:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie not found."
        )

    theatre = await db.theatres.find_one(
        {
            "_id": ObjectId(show.theatre_id),
            "is_active": True
        }
    )

    if not theatre:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Theatre not found."
        )

    screen = await db.screens.find_one(
        {
            "_id": ObjectId(show.screen_id),
            "is_active": True
        }
    )

    if not screen:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Screen not found."
        )

    existing_show = await db.shows.find_one(
        {
            "screen_id": ObjectId(show.screen_id),
            "show_date": show.show_date,
            "show_time": show.show_time,
            "is_active": True
        }
    )

    if existing_show:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A show already exists for this screen at the specified date and time."
        )

    new_show = {

        "movie_id": ObjectId(show.movie_id),

        "theatre_id": ObjectId(show.theatre_id),

        "screen_id": ObjectId(show.screen_id),

        "show_date": show.show_date,

        "show_time": show.show_time,

        "ticket_price": show.ticket_price,

        "is_active": True,

        "created_at": datetime.now(timezone.utc),

        "updated_at": datetime.now(timezone.utc)

    }

    result = await db.shows.insert_one(new_show)

    created_show = await db.shows.find_one(
        {"_id": result.inserted_id}
    )

    return show_model(created_show)


async def get_all_shows():

    shows = []

    async for show in db.shows.find(
        {"is_active": True}
    ):

        shows.append(
            show_model(show)
        )

    return shows



async def get_show(show_id: str):

    if not ObjectId.is_valid(show_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Show ID format."
        )

    show = await db.shows.find_one(
        {
            "_id": ObjectId(show_id),
            "is_active": True
        }
    )

    if not show:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Show not found."
        )

    return show_model(show)



async def get_available_seats(show_id: str):

    show = await db.shows.find_one(
        {
            "_id": ObjectId(show_id),
            "is_active": True
        }
    )

    if not show:

        raise HTTPException(
            status_code=404,
            detail="Show not found."
        )

    booked = []

    async for booking in db.bookings.find(
        {
            "show_id": ObjectId(show_id),
            "booking_status": "CONFIRMED"
        }
    ):

        booked.extend(
            booking["seats"]
        )

    all_seats = []

    rows = ["A", "B", "C", "D", "E"]

    for row in rows:

        for seat in range(1, 11):

            all_seats.append(
                f"{row}{seat}"
            )

    available = [
        seat
        for seat in all_seats
        if seat not in booked
    ]

    return {

        "available": available,

        "booked": booked

    }