import asyncio
from app.schemas import ErrorDetectionRequest
from app.config import settings
from app.routers.ia import detect_errors


class DummyAsyncClient:
    async def post(self, *args, **kwargs):
        return DummyResponse()


class DummyResponse:
    def raise_for_status(self):
        pass

    def json(self):
        return {"report": "ok"}


def test_detect_errors(monkeypatch):
    # Simulamos que la API key está configurada
    monkeypatch.setattr(settings, 'openai_api_key', 'test-key')

    payload = ErrorDetectionRequest(lineup=["A", "B"], formation=None)

    # Llamamos solo con payload y cliente; la dependencia de verify_token se ignora por defecto
    result = asyncio.run(detect_errors(payload, DummyAsyncClient()))

    assert result == {"report": "ok"}
