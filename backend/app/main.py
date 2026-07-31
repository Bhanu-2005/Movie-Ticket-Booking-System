from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth_routes import router as auth_router
from app.routes.movie_routes import router as movie_router
from app.routes.theatre_routes import router as theatre_router
from app.routes.screen_routes import router as screen_router

app = FastAPI(
    title="Movie Ticket Booking API",
    description="Backend APIs for Movie Ticket Booking System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(movie_router)
app.include_router(theatre_router)
app.include_router(screen_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Movie Ticket Booking API"}