from typing import List, Optional
from pydantic import BaseSettings, Field, validator

class Settings(BaseSettings):
    backend_url: str = "http://backend:3000"
    model_path: str = "models/sandei_model.pkl"
    openai_api_key: Optional[str] = Field(default=None, env="OPENAI_API_KEY")
    allowed_origins: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
    ]
    api_token: Optional[str] = Field(default=None, env="API_TOKEN")

    class Config:
        env_prefix = ""
        case_sensitive = True

    @validator("allowed_origins", pre=True)
    def split_origins(cls, v):
        """
        Permite que ALLOWED_ORIGINS se defina como una lista JSON (recomendado)
        o como texto plano separado por comas.
        """
        default = [
            "http://localhost:5173",
            "http://localhost:3000",
        ]
        if not v:
            return default
        if isinstance(v, str):
            v = v.strip()
            if not v:
                return default
            if v.startswith("["):
                import json
                try:
                    return json.loads(v)
                except Exception:
                    return default
            return [o.strip() for o in v.split(",") if o.strip()]
        if isinstance(v, list):
            return v
        return default

settings = Settings()
