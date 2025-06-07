import os
from typing import List

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

_origins_env = os.getenv("ALLOWED_ORIGINS")
if _origins_env:
    ALLOWED_ORIGINS: List[str] = [o.strip() for o in _origins_env.split(',') if o.strip()]
else:
    ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "http://localhost:3000",
    ]
