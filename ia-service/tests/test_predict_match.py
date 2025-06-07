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

from app.routers.ia import predict_match
from app.models import MatchPredictionRequest
from app.services.ai_logic import fetch_chat_completion
from app.utils.config import settings


def test_predict_match(monkeypatch):
    monkeypatch.setattr(settings, 'OPENAI_API_KEY', 'test-key')
    payload = MatchPredictionRequest(home_team=['A'], away_team=['B'])
    result = asyncio.run(predict_match(payload, DummyAsyncClient(), fetch_chat_completion))
    assert result == {"prediction": "ok"}
