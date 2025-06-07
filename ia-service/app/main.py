from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import ia
from .utils.config import settings
from .utils.http_client import startup_client, shutdown_client

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup() -> None:
    await startup_client()


@app.on_event("shutdown")
async def on_shutdown() -> None:
    await shutdown_client()


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "Hello from FastAPI"}


@app.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(ia.router)
