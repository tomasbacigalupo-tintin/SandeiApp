import os
import sys
import types
import asyncio

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

import pytest
from fastapi import HTTPException

class DummyAsyncClient:
    async def post(self, *args, **kwargs):
        class Resp:
            def raise_for_status(self):
                pass
            def json(self):
                return {"choices": [{"message": {"content": "ok"}}]}
        return Resp()

sys.modules['httpx'] = types.SimpleNamespace(AsyncClient=DummyAsyncClient)

from app.routers.ia import (
    analyze_performance,
    predict_match,
    detect_errors,
    suggest_tactics,
    suggest_lineup,
)
from app.models import (
    PerformanceRequest,
    MatchPredictionRequest,
    ErrorDetectionRequest,
    TacticsRequest,
    LineupRequest,
)
from app.services.ai_logic import fetch_chat_completion
from app.utils.config import settings


def test_analyze_performance_no_key(monkeypatch):
    monkeypatch.setattr(settings, 'OPENAI_API_KEY', None)
    payload = PerformanceRequest(ratings=[{"player": "John", "score": 7}])
    with pytest.raises(HTTPException) as exc:
        asyncio.run(analyze_performance(payload, DummyAsyncClient(), fetch_chat_completion))
    assert exc.value.status_code == 500

def test_predict_match_no_key(monkeypatch):
    monkeypatch.setattr(settings, 'OPENAI_API_KEY', None)
    payload = MatchPredictionRequest(home_team=['A'], away_team=['B'])
    with pytest.raises(HTTPException) as exc:
        asyncio.run(predict_match(payload, DummyAsyncClient(), fetch_chat_completion))
    assert exc.value.status_code == 500

def test_detect_errors_no_key(monkeypatch):
    monkeypatch.setattr(settings, 'OPENAI_API_KEY', None)
    payload = ErrorDetectionRequest(lineup=['A', 'B'], formation=None)
    with pytest.raises(HTTPException) as exc:
        asyncio.run(detect_errors(payload, DummyAsyncClient(), fetch_chat_completion))
    assert exc.value.status_code == 500

def test_suggest_lineup_no_key(monkeypatch):
    monkeypatch.setattr(settings, 'OPENAI_API_KEY', None)
    payload = LineupRequest(players=['A', 'B'], formation='4-4-2')
    with pytest.raises(HTTPException) as exc:
        asyncio.run(suggest_lineup(payload, DummyAsyncClient(), fetch_chat_completion))
    assert exc.value.status_code == 500

def test_suggest_tactics_no_key(monkeypatch):
    monkeypatch.setattr(settings, 'OPENAI_API_KEY', None)
    payload = TacticsRequest(players=['John'], style=None)
    with pytest.raises(HTTPException) as exc:
        asyncio.run(suggest_tactics(payload, DummyAsyncClient(), fetch_chat_completion))
    assert exc.value.status_code == 500
