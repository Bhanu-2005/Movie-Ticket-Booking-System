from datetime import datetime

def user_model(user: dict):
    return {
        "id": str(user["_id"]) if "_id" in user else None,
        "name": user.get("name", ""),
        "email": user.get("email", ""),
        "phone": user.get("phone", ""),
        "role": user.get("role", "user"),
        "is_active": user.get("is_active", True),
        "created_at": user.get("created_at", datetime.now()),
        "updated_at": user.get("updated_at", datetime.now()),
    }