def screen_model(screen):
    return {
        "id": str(screen["_id"]),
        "theatre_id": screen["theatre_id"],
        "name": screen["name"],
        "total_seats": screen["total_seats"],
        "is_active": screen["is_active"],
        "created_at": screen["created_at"],
        "updated_at": screen["updated_at"]
    }
