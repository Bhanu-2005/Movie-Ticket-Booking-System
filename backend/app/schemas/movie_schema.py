from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

class MovieBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=100)
    genre: str
    language: str
    duration: int = Field(..., gt=0)
    release_date: str
    description: str
    poster_url: Optional[str] = None



class MovieCreate(MovieBase):
    pass

class MovieUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=2, max_length=100)
    genre: Optional[str] = None
    language: Optional[str] = None
    duration: Optional[int] = Field(None, gt=0)
    release_date: Optional[str] = None
    description: Optional[str] = None
    poster_url: Optional[str] = None

class MovieResponse(MovieBase):
    id: Optional[str] = None
    is_active: bool
    created_at: datetime
    updated_at: datetime