import asyncio
from app.main import app


async def call_app(origin: str):
    scope = {
        "type": "http",
        "method": "GET",
        "path": "/",
        "raw_path": b"/",
        "headers": [(b"origin", origin.encode()), (b"host", b"testserver")],
        "query_string": b"",
        "server": ("testserver", 80),
        "client": ("testclient", 50000),
        "scheme": "http",
        "http_version": "1.1",
    }
    messages = []

    async def receive() -> dict:
        return {"type": "http.request", "body": b"", "more_body": False}

    async def send(message: dict) -> None:
        messages.append(message)

    await app(scope, receive, send)
    return messages


def test_cors_headers():
    messages = asyncio.run(call_app("http://localhost:5173"))
    start = next(m for m in messages if m["type"] == "http.response.start")
    headers = dict(start["headers"])
    assert headers[b"access-control-allow-origin"] == b"http://localhost:5173"
