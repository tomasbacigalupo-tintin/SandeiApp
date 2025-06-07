import os
import sys
import types
import asyncio

# Ensure the app package can be imported
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

# Create a minimal httpx stub
class DummyAsyncClient:
    async def post(self, *args, **kwargs):
        class Resp:
            def raise_for_status(self):
                pass
            def json(self):
                return {"choices": [{"message": {"content": "ok"}}]}
        return Resp()

sys.modules['httpx'] = types.SimpleNamespace(AsyncClient=DummyAsyncClient)

from app.routers.ia import suggest_tactics
from app.schemas import TacticsRequest


def test_suggest_tactics(monkeypatch):
    monkeypatch.setattr('app.routers.ia.OPENAI_API_KEY', 'test-key')
    payload = TacticsRequest(players=["John"], style=None)
    result = asyncio.run(suggest_tactics(payload, DummyAsyncClient()))
    assert result == {"tactics": "ok"}
