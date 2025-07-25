import asyncio
from app.schemas import PerformanceRequest
from app.config import settings
from app.routers.ia import analyze_performance


class DummyAsyncClient:
    async def post(self, *args, **kwargs):
        return DummyResponse()


class DummyResponse:
    def raise_for_status(self):
        pass

    def json(self):
        return {"analysis": "ok"}


def test_analyze_performance(monkeypatch):
    # Simulamos que la API key está configurada
    monkeypatch.setattr(settings, 'openai_api_key', 'test-key')

    payload = PerformanceRequest(ratings=[{"player": "John", "score": 7}])

    # Llamamos a la función solo con payload y cliente; verify_token se ignora
    result = asyncio.run(analyze_performance(payload, DummyAsyncClient()))

    assert result == {"analysis": "ok"}
