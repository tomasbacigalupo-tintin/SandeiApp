from fastapi import Depends
from .http_client import get_http_client
from .security import verify_token

__all__ = ["get_http_client", "verify_token"]

# get_http_client ya retorna la instancia correcta (httpx.AsyncClient)
# verify_token es la función de seguridad, se expone como dependencia

# Uso en FastAPI:
# client: httpx.AsyncClient = Depends(get_http_client)
# _: None = Depends(verify_token)
