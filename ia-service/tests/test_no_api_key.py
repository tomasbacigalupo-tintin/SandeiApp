import asyncio
import pytest
from fastapi import HTTPException
from app.config import settings
from app.routers.ia import (
    analyze_performance,
    predict_match,
    detect_errors,
    suggest_lineup,
    suggest_tactics,
)
from app.schemas import (
    PerformanceRequest,
    MatchPredictionRequest,
    ErrorDetectionRequest,
    LineupRequest,
    TacticsRequest,
)


class DummyAsyncClient:
    async def post(self, *args, **kwargs):
        return DummyResponse()


class DummyResponse:
    def raise_for_status(self):
        pass

    def json(self):
        return {"result": "dummy"}


def test_analyze_performance_no_key(monkeypatch):
    # Simulamos que la API key no está configurada
    monkeypatch.setattr(settings, 'openai_api_key', None)
    payload = PerformanceRequest(ratings=[{"player": "John", "score": 7}])

    with pytest.raises(HTTPException):
        # La firma ahora solo recibe payload y cliente
        asyncio.run(analyze_performance(payload, DummyAsyncClient()))


def test_predict_match_no_key(monkeypatch):
    monkeypatch.setattr(settings, 'openai_api_key', None)
    payload = MatchPredictionRequest(home_team=["A"], away_team=["B"])

    with pytest.raises(HTTPException):
        asyncio.run(predict_match(payload, DummyAsyncClient()))


def test_detect_errors_no_key(monkeypatch):
    monkeypatch.setattr(settings, 'openai_api_key', None)
    payload = ErrorDetectionRequest(lineup=["A", "B"], formation=None)

    with pytest.raises(HTTPException):
        asyncio.run(detect_errors(payload, DummyAsyncClient()))


def test_suggest_lineup_no_key(monkeypatch):
    monkeypatch.setattr(settings, 'openai_api_key', None)
    payload = LineupRequest(players=["A", "B"], formation="4-4-2")

    with pytest.raises(HTTPException):
        asyncio.run(suggest_lineup(payload, DummyAsyncClient()))


def test_suggest_tactics_no_key(monkeypatch):
    monkeypatch.setattr(settings, 'openai_api_key', None)
    payload = TacticsRequest(players=["A", "B"], style=None)

    with pytest.raises(HTTPException):
        asyncio.run(suggest_tactics(payload, DummyAsyncClient()))

