from fastapi import FastAPI, HTTPException, status, Depends
from pydantic import BaseModel
from typing import List, Optional
import os
import httpx
import asyncio

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


async def fetch_chat_completion(
    messages: List[dict],
    client: httpx.AsyncClient,
    max_retries: int = 3,
    backoff: float = 1.0,
) -> str:
    url = "https://api.openai.com/v1/chat/completions"
    headers = {"Authorization": f"Bearer {OPENAI_API_KEY}"}
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


client: httpx.AsyncClient | None = None

async def get_http_client() -> httpx.AsyncClient:
    assert client is not None
    return client

app = FastAPI()

@app.on_event("startup")
async def startup() -> None:
    global client
    client = httpx.AsyncClient()

@app.on_event("shutdown")
async def shutdown() -> None:
    assert client is not None
    await client.aclose()

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI"}


class LineupRequest(BaseModel):
    players: List[str]
    formation: str


class TacticsRequest(BaseModel):
    players: List[str]
    style: Optional[str] = None


@app.post("/ia/suggest_lineup")
async def suggest_lineup(
    payload: LineupRequest, client: httpx.AsyncClient = Depends(get_http_client)
):
    """Suggest an optimal lineup based on the given formation."""
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI not available")
    prompt = (
        f"Suggest a lineup using formation {payload.formation} for players: "
        + ", ".join(payload.players)
    )
    messages = [
        {"role": "system", "content": "You are a football tactical assistant."},
        {"role": "user", "content": prompt},
    ]
    try:
        suggestion = await fetch_chat_completion(messages, client)
        return {"lineup": suggestion}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/ia/suggest_tactics")
async def suggest_tactics(
    payload: TacticsRequest, client: httpx.AsyncClient = Depends(get_http_client)
):
    """Suggest tactical instructions based on the given players."""
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI not available")
    style_part = f" with style {payload.style}" if payload.style else ""
    prompt = (
        "Suggest tactical instructions" + style_part + " for players: "
        + ", ".join(payload.players)
    )
    messages = [
        {"role": "system", "content": "You are a football tactical assistant."},
        {"role": "user", "content": prompt},
    ]
    try:
        tactics = await fetch_chat_completion(messages, client)
        return {"tactics": tactics}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


class Rating(BaseModel):
    player: str
    score: int
    comment: Optional[str] = None


class PerformanceRequest(BaseModel):
    ratings: List[Rating]


@app.post("/ia/analyze_performance")
async def analyze_performance(
    payload: PerformanceRequest, client: httpx.AsyncClient = Depends(get_http_client)
):
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI not available")

    prompt = "\n".join(
        [f'{r.player}: {r.score} - {r.comment or ""}' for r in payload.ratings]
    )

    messages = [
        {"role": "system", "content": "Analyze team performance"},
        {"role": "user", "content": prompt},
    ]
    try:
        analysis = await fetch_chat_completion(messages, client)
        return {"analysis": analysis}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


class MatchPredictionRequest(BaseModel):
    home_team: List[str]
    away_team: List[str]


@app.post("/ia/predict_match")
async def predict_match(
    payload: MatchPredictionRequest, client: httpx.AsyncClient = Depends(get_http_client)
):
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI not available")

    prompt = (
        "Predict the result of a football match between the home team: "
        + ", ".join(payload.home_team)
        + " and the away team: "
        + ", ".join(payload.away_team)
    )

    messages = [
        {"role": "system", "content": "You are a football match predictor."},
        {"role": "user", "content": prompt},
    ]
    try:
        prediction = await fetch_chat_completion(messages, client)
        return {"prediction": prediction}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
