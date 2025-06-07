from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def root() -> dict:
    return {"message": "Hello from FastAPI"}

@router.get("/healthz")
async def healthz() -> dict:
    return {"status": "ok"}
