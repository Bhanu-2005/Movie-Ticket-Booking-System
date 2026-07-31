from datetime import datetime

def theatre_model(theatre: dict) -> dict:
    return {
        "id": str(theatre["_id"]) if "_id" in theatre else None,
        "name": theatre.get("name", ""),
        "city": theatre.get("city", ""),
        "address": theatre.get("address", ""),
        "total_screens": theatre.get("total_screens", 1),
        "is_active": theatre.get("is_active", True),
        "created_at": theatre.get("created_at", datetime.now()),
        "updated_at": theatre.get("updated_at", datetime.now()),
    }
