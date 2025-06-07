from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import ALLOWED_ORIGINS
from . import dependencies
from .routers import ia, health

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup() -> None:
    import httpx
    dependencies.client = httpx.AsyncClient()

@app.on_event("shutdown")
async def shutdown() -> None:
    if dependencies.client is not None:
        await dependencies.client.aclose()

app.include_router(health.router)
app.include_router(ia.router)
