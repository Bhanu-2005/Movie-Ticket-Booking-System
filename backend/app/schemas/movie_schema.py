from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class MovieCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100, json_schema_extra={"example": "Inception"})
    description: Optional[str] = Field(None, json_schema_extra={"example": "A thief who steals corporate secrets through dream-sharing technology."})
    genre: List[str] = Field(default=[], json_schema_extra={"example": ["Action", "Sci-Fi"]})
    duration_minutes: int = Field(..., gt=0, json_schema_extra={"example": 148})
    language: str = Field(..., json_schema_extra={"example": "English"})
    release_date: Optional[str] = Field(None, json_schema_extra={"example": "2010-07-16"})
    poster_url: Optional[str] = Field(None, json_schema_extra={"example": "https://example.com/poster.jpg"})
    rating: Optional[float] = Field(default=0.0, ge=0, le=10, json_schema_extra={"example": 8.8})
    price: float = Field(..., gt=0, json_schema_extra={"example": 250.0})

class MovieUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    genre: Optional[List[str]] = None
    duration_minutes: Optional[int] = Field(None, gt=0)
    language: Optional[str] = None
    release_date: Optional[str] = None
    poster_url: Optional[str] = None
    rating: Optional[float] = Field(None, ge=0, le=10)
    price: Optional[float] = Field(None, gt=0)
    is_active: Optional[bool] = None

class MovieResponse(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    genre: List[str] = []
    duration_minutes: int
    language: str
    release_date: Optional[str] = None
    poster_url: Optional[str] = None
    rating: Optional[float] = 0.0
    price: float
    is_active: bool = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
