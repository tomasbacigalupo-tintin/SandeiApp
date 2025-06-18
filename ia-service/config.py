from pydantic import BaseSettings

class Settings(BaseSettings):
    backend_url: str = "http://backend:3000"
    model_path: str = "models/sandei_model.pkl"

settings = Settings()

