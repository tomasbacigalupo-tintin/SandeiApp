from __future__ import annotations

from typing import List
from pydantic import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str | None = None
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    API_TOKEN: str | None = None

    class Config:
        case_sensitive = True

settings = Settings()
