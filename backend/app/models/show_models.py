def show_model(show):

    return {

        "id": str(show["_id"]),

        "movie_id": str(show["movie_id"]),

        "theatre_id": str(show["theatre_id"]),

        "screen_id": str(show["screen_id"]),

        "show_date": show["show_date"],

        "show_time": show["show_time"],

        "ticket_price": show["ticket_price"],

        "is_active": show["is_active"],

        "created_at": show["created_at"],

        "updated_at": show["updated_at"]

    }