from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class ShowBase(BaseModel):

    movie_id: str

    theatre_id: str

    screen_id: str

    show_date: str

    show_time: str

    ticket_price: float = Field(..., gt=0)


class ShowCreate(ShowBase):
    pass


class ShowResponse(ShowBase):

    id: Optional[str] = None

    is_active: bool

    created_at: datetime

    updated_at: datetime