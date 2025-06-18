from typing import List
from pydantic import BaseSettings

class Settings(BaseSettings):
    backend_url: str = "http://backend:3000"
    model_path: str = "models/sandei_model.pkl"
    openai_api_key: str | None = None
    allowed_origins: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
    ]
    api_token: str | None = None

    class Config:
        env_prefix = ""
        case_sensitive = True

settings = Settings()
