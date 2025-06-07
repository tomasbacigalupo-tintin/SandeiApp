from __future__ import annotations

from typing import Callable, Awaitable, Dict, List

from fastapi import APIRouter, Depends, HTTPException
import httpx

from ..models import (
    LineupRequest,
    TacticsRequest,
    PerformanceRequest,
    MatchPredictionRequest,
    ErrorDetectionRequest,
)
from ..services.ai_logic import fetch_chat_completion, get_ai_logic
from ..utils.http_client import get_http_client
from ..utils.security import verify_token
from ..utils.config import settings

router = APIRouter(prefix="/ia", tags=["ia"])


@router.post("/suggest_lineup")
async def suggest_lineup(
    payload: LineupRequest,
    client: httpx.AsyncClient = Depends(get_http_client),
    ai_logic: Callable[[List[Dict[str, str]], httpx.AsyncClient], Awaitable[str]] = Depends(get_ai_logic),
    _: None = Depends(verify_token),
) -> Dict[str, str]:
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI not available")
    prompt = (
        f"Suggest a lineup using formation {payload.formation} for players: " + ", ".join(payload.players)
    )
    messages = [
        {"role": "system", "content": "You are a football tactical assistant."},
        {"role": "user", "content": prompt},
    ]
    suggestion = await ai_logic(messages, client)
    return {"lineup": suggestion}


@router.post("/suggest_tactics")
async def suggest_tactics(
    payload: TacticsRequest,
    client: httpx.AsyncClient = Depends(get_http_client),
    ai_logic: Callable[[List[Dict[str, str]], httpx.AsyncClient], Awaitable[str]] = Depends(get_ai_logic),
    _: None = Depends(verify_token),
) -> Dict[str, str]:
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI not available")
    style_part = f" with style {payload.style}" if payload.style else ""
    prompt = "Suggest tactical instructions" + style_part + " for players: " + ", ".join(payload.players)
    messages = [
        {"role": "system", "content": "You are a football tactical assistant."},
        {"role": "user", "content": prompt},
    ]
    tactics = await ai_logic(messages, client)
    return {"tactics": tactics}


@router.post("/analyze_performance")
async def analyze_performance(
    payload: PerformanceRequest,
    client: httpx.AsyncClient = Depends(get_http_client),
    ai_logic: Callable[[List[Dict[str, str]], httpx.AsyncClient], Awaitable[str]] = Depends(get_ai_logic),
    _: None = Depends(verify_token),
) -> Dict[str, str]:
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI not available")

    prompt = "\n".join([f"{r.player}: {r.score} - {r.comment or ''}" for r in payload.ratings])
    messages = [
        {"role": "system", "content": "Analyze team performance"},
        {"role": "user", "content": prompt},
    ]
    analysis = await ai_logic(messages, client)
    return {"analysis": analysis}


@router.post("/predict_match")
async def predict_match(
    payload: MatchPredictionRequest,
    client: httpx.AsyncClient = Depends(get_http_client),
    ai_logic: Callable[[List[Dict[str, str]], httpx.AsyncClient], Awaitable[str]] = Depends(get_ai_logic),
    _: None = Depends(verify_token),
) -> Dict[str, str]:
    if not settings.OPENAI_API_KEY:
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
    prediction = await ai_logic(messages, client)
    return {"prediction": prediction}


@router.post("/detect_errors")
async def detect_errors(
    payload: ErrorDetectionRequest,
    client: httpx.AsyncClient = Depends(get_http_client),
    ai_logic: Callable[[List[Dict[str, str]], httpx.AsyncClient], Awaitable[str]] = Depends(get_ai_logic),
    _: None = Depends(verify_token),
) -> Dict[str, str]:
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI not available")
    formation_part = f" with formation {payload.formation}" if payload.formation else ""
    prompt = "Identify any issues in the lineup" + formation_part + ": " + ", ".join(payload.lineup)
    messages = [
        {"role": "system", "content": "You are a football analyst."},
        {"role": "user", "content": prompt},
    ]
    report = await ai_logic(messages, client)
    return {"report": report}

