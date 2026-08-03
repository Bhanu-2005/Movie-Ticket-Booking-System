def theatre_model(theatre) -> dict:
    return {
        "id": str(theatre["_id"]),
        "name": theatre["name"],
        "city": theatre["city"],
        "address": theatre["address"],
        "total_screens": theatre["total_screens"],
        "is_active": theatre["is_active"],
        "created_at": theatre["created_at"],
        "updated_at": theatre["updated_at"],
    }