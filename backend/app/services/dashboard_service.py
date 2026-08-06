from app.database.database import db

async def dashboard_summary():

    total_users = await db.users.count_documents({})

    total_movies = await db.movies.count_documents(
        {
            "is_active": True
        }
    )

    total_theatres = await db.theatres.count_documents(
        {
            "is_active": True
        }
    )

    total_screens = await db.screens.count_documents(
        {
            "is_active": True
        }
    )

    total_shows = await db.shows.count_documents(
        {
            "is_active": True
        }
    )

    total_bookings = await db.bookings.count_documents({})

    revenue = 0

    async for booking in db.bookings.find():

        revenue += booking["total_amount"]
    latest_bookings = []

    async for booking in db.bookings.find().sort(
        "created_at",
        -1
    ).limit(5):

        latest_bookings.append(

            booking_model(booking)

        )

    return {

        "total_users": total_users,

        "total_movies": total_movies,

        "total_theatres": total_theatres,

        "total_screens": total_screens,

        "total_shows": total_shows,

        "total_bookings": total_bookings,

        "total_revenue": revenue,

        "latest_bookings": latest_bookings

    }