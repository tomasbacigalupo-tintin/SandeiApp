import asyncio
from app.schemas import ErrorDetectionRequest
from app.config import settings
from app.routers.ia_router import detect_errors


class DummyAsyncClient:
    async def post(self, *args, **kwargs):
        return DummyResponse()


class DummyResponse:
    async def json(self):
        return {"report": "ok"}


def test_detect_errors(monkeypatch):
    # Simulamos que la API key está configurada
    monkeypatch.setattr(settings, 'OPENAI_API_KEY', 'test-key')

    payload = ErrorDetectionRequest(lineup=["A", "B"], formation=None)

    # Llamamos solo con payload y cliente; la dependencia de verify_token se ignora por defecto
    result = asyncio.run(detect_errors(payload, DummyAsyncClient()))

    assert result == {"report": "ok"}
