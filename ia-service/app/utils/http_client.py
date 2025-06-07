from __future__ import annotations

import httpx

_client: httpx.AsyncClient | None = None


async def startup_client() -> None:
    global _client
    _client = httpx.AsyncClient()


async def shutdown_client() -> None:
    global _client
    if _client is not None:
        await _client.aclose()
        _client = None


def get_http_client() -> httpx.AsyncClient:
    assert _client is not None
    return _client
