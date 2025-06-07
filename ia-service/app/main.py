from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import ia, health
from .utils.config import settings
from .utils.http_client import startup_client, shutdown_client

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Lifecycle events to initialize and close HTTP client
@app.on_event("startup")
async def on_startup() -> None:
    await startup_client()

@app.on_event("shutdown")
async def on_shutdown() -> None:
    await shutdown_client()

# Root endpoint
@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "Hello from FastAPI"}

# Include routers
app.include_router(health.router, prefix="/health", tags=["Health"])
app.include_router(ia.router, prefix="/ia", tags=["AI"])

