def booking_model(booking):

    return {

        "id": str(booking["_id"]),

        "user_id": str(booking["user_id"]),

        "show_id": str(booking["show_id"]),

        "seats": booking["seats"],

        "total_amount": booking["total_amount"],

        "booking_status": booking["booking_status"],

        "created_at": booking["created_at"],

        "updated_at": booking["updated_at"]

    }