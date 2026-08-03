from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class PaymentBase(BaseModel):

    booking_id: str

    payment_method: str


class PaymentCreate(PaymentBase):
    pass


class PaymentResponse(PaymentBase):

    id: Optional[str] = None

    amount: float

    payment_status: str

    transaction_id: str

    created_at: datetime