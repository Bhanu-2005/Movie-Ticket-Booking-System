from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class TheatreBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, json_schema_extra={"example": "PVR Cinemas"})
    city: str = Field(..., json_schema_extra={"example": "Hyderabad"})
    address: str = Field(..., json_schema_extra={"example": "Next Galleria Mall, Panjagutta"})
    total_screens: int = Field(..., gt=0, json_schema_extra={"example": 6})

class TheatreCreate(TheatreBase):
    pass

class TheatreResponse(TheatreBase):
    id: Optional[str] = None
    is_active: bool = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
