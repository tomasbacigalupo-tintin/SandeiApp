import os
import sys
import types
import asyncio

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

class DummyAsyncClient:
    async def post(self, *args, **kwargs):
        class Resp:
            def raise_for_status(self):
                pass
            def json(self):
                return {"choices": [{"message": {"content": "ok"}}]}
        return Resp()

sys.modules['httpx'] = types.SimpleNamespace(AsyncClient=DummyAsyncClient)

from app.routers.ia import detect_errors
from app.schemas import ErrorDetectionRequest


def test_detect_errors(monkeypatch):
    monkeypatch.setattr('app.routers.ia.OPENAI_API_KEY', 'test-key')
    payload = ErrorDetectionRequest(lineup=["A", "B"], formation=None)
    result = asyncio.run(detect_errors(payload, DummyAsyncClient()))
    assert result == {"report": "ok"}
