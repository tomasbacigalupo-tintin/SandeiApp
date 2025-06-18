from pydantic import BaseSettings
from typing import Optional, List

class Settings(BaseSettings):
    backend_url: str = "http://backend:3000"
    model_path: str = "models/sandei_model.pkl"
    openai_api_key: Optional[str] = None

    class Config:
        env_file = ".env"

settings = Settings()
