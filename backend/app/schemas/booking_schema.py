from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class BookingBase(BaseModel):

    show_id: str

    seats: List[str]

    total_amount: float = Field(..., gt=0)


class BookingCreate(BookingBase):
    pass


class BookingResponse(BookingBase):

    id: Optional[str] = None

    user_id: str

    booking_status: str

    created_at: datetime

    updated_at: datetime
