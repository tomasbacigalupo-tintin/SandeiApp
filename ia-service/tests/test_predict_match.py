import os
import sys
import types
import asyncio

# Agregamos el directorio raíz del proyecto al path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

# Simulamos httpx.AsyncClient
class DummyAsyncClient:
    async def post(self, *args, **kwargs):
        class Resp:
            def raise_for_status(self):
                pass

            async def json(self):
                return {"choices": [{"message": {"content": "ok"}}]}

        return Resp()

# Inyectamos DummyAsyncClient en lugar de httpx.AsyncClient
sys.modules['httpx'] = types.SimpleNamespace(AsyncClient=DummyAsyncClient)

from app.routers.ia_router import predict_match
from app.schemas import MatchPredictionRequest
from app.config import settings


def test_predict_match(monkeypatch):
    # Simulamos que la API key está configurada
    monkeypatch.setattr(settings, 'OPENAI_API_KEY', 'test-key')

    payload = MatchPredictionRequest(home_team=['A'], away_team=['B'])

    result = asyncio.run(predict_match(payload, DummyAsyncClient()))

    assert result == {"prediction": "ok"}
