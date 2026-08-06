from datetime import datetime

def movie_model(movie: dict) -> dict:
    return {
        "id": str(movie["_id"]) if "_id" in movie else None,
        "title": movie.get("title", ""),
        "description": movie.get("description", ""),
        "genre": ", ".join(movie.get("genre", [])) if isinstance(movie.get("genre"), list) else movie.get("genre", ""),
        "duration": movie.get("duration") or movie.get("duration_minutes", 0),
        "duration_minutes": movie.get("duration") or movie.get("duration_minutes", 0),
        "language": movie.get("language", ""),
        "release_date": movie.get("release_date", ""),
        "poster_url": movie.get("poster_url", ""),
        "rating": movie.get("rating", 0.0),
        "price": movie.get("price", 0.0),
        "is_active": movie.get("is_active", True),
        "created_at": movie.get("created_at", datetime.now()),
        "updated_at": movie.get("updated_at", datetime.now()),
    }
