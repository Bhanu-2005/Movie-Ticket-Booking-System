import uuid

from datetime import datetime, timezone

from bson import ObjectId

from fastapi import HTTPException, status

from app.database.database import db
from app.models.payment_model import payment_model
from app.schemas.payment_schema import PaymentCreate


async def create_payment(payment: PaymentCreate):

    booking = await db.bookings.find_one(
        {
            "_id": ObjectId(payment.booking_id)
        }
    )

    if not booking:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found."
        )

    transaction_id = str(uuid.uuid4())

    new_payment = {

        "booking_id": ObjectId(payment.booking_id),

        "payment_method": payment.payment_method,

        "amount": booking["total_amount"],

        "payment_status": "SUCCESS",

        "transaction_id": transaction_id,

        "created_at": datetime.now(timezone.utc)

    }

    result = await db.payments.insert_one(
        new_payment
    )

    payment = await db.payments.find_one(
        {
            "_id": result.inserted_id
        }
    )

    return payment_model(payment)





