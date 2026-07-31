from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class ScreenBase(BaseModel):
    theatre_id: str
    name: str = Field(..., min_length=2)
    total_seats: int = Field(..., gt=0)


class ScreenCreate(ScreenBase):
    pass


class ScreenResponse(ScreenBase):
    id: Optional[str] = None
    is_active: bool
    created_at: datetime
    updated_at: datetime
