import os
import sys
import types
import asyncio

# Aseguramos que el paquete app pueda ser importado
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

# Creamos un stub mínimo de httpx.AsyncClient
class DummyAsyncClient:
    async def post(self, *args, **kwargs):
        class Resp:
            def raise_for_status(self):
                pass

            async def json(self):
                return {"choices": [{"message": {"content": "ok"}}]}

        return Resp()

# Inyectamos el stub como httpx
sys.modules['httpx'] = types.SimpleNamespace(AsyncClient=DummyAsyncClient)

from app.routers.ia import suggest_tactics
from app.schemas import TacticsRequest
from app.config import settings


def test_suggest_tactics(monkeypatch):
    # Simulamos que la API key está configurada
    monkeypatch.setattr(settings, 'openai_api_key', 'test-key')

    payload = TacticsRequest(players=["John"], style=None)

    result = asyncio.run(suggest_tactics(payload, DummyAsyncClient()))

    assert result == {"tactics": "ok"}

