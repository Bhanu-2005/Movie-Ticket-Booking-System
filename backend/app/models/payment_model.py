def payment_model(payment):

    return {

        "id": str(payment["_id"]),

        "booking_id": str(payment["booking_id"]),

        "payment_method": payment["payment_method"],

        "amount": payment["amount"],

        "payment_status": payment["payment_status"],

        "transaction_id": payment["transaction_id"],

        "created_at": payment["created_at"]

    }