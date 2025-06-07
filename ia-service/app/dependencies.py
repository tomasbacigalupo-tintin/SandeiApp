from fastapi import Depends, Header, HTTPException, status
import httpx
from .config import OPENAI_API_KEY

client: httpx.AsyncClient | None = None

async def get_http_client() -> httpx.AsyncClient:
    assert client is not None
    return client

async def verify_token(authorization: str = Header(default="")) -> None:
    """Basic check for Authorization header presence."""
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing",
        )
    # Here we could integrate with the NestJS backend to validate the token.
    # For simplicity we just ensure it is provided.
