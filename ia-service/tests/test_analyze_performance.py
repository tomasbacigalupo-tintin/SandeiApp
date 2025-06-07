import os
import sys
import types
import asyncio

# Ensure the app package can be imported
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

import pytest

# Create a minimal httpx stub so app.main can be imported without the real package
class DummyAsyncClient:
    async def post(self, *args, **kwargs):
        class Resp:
            def raise_for_status(self):
                pass
            def json(self):
                return {"choices": [{"message": {"content": "ok"}}]}
        return Resp()

sys.modules['httpx'] = types.SimpleNamespace(AsyncClient=DummyAsyncClient)

from app.routers.ia import analyze_performance
from app.models import PerformanceRequest
from app.services.ai_logic import fetch_chat_completion
from app.utils.config import settings


def test_analyze_performance(monkeypatch):
    monkeypatch.setattr(settings, 'OPENAI_API_KEY', 'test-key')
    payload = PerformanceRequest(ratings=[{"player": "John", "score": 7}])
    result = asyncio.run(analyze_performance(payload, DummyAsyncClient(), fetch_chat_completion))
    assert result == {"analysis": "ok"}
