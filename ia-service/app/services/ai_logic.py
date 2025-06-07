from __future__ import annotations

import asyncio
from typing import Callable, Awaitable, List, Dict

import httpx
from ..utils.config import settings


async def fetch_chat_completion(
    messages: List[Dict[str, str]],
    client: httpx.AsyncClient,
    max_retries: int = 3,
    backoff: float = 1.0,
) -> str:
    url = "https://api.openai.com/v1/chat/completions"
    headers = {"Authorization": f"Bearer {settings.OPENAI_API_KEY}"}
    payload = {"model": "gpt-3.5-turbo", "messages": messages}
    for attempt in range(max_retries):
        try:
            response = await client.post(url, json=payload, headers=headers, timeout=30)
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"]
        except Exception:
            if attempt == max_retries - 1:
                raise
            await asyncio.sleep(backoff)
            backoff *= 2


def get_ai_logic() -> Callable[[List[Dict[str, str]], httpx.AsyncClient], Awaitable[str]]:
    return fetch_chat_completion
