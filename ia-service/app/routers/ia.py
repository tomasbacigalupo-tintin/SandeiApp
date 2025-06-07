from __future__ import annotations

from typing import Callable, Awaitable, Dict, List
import logging

from fastapi import APIRouter, Depends, HTTPException
import httpx

from ..config import settings
from ..services.openai_client import fetch_chat_completion
from ..schemas import (
    LineupRequest,
    TacticsRequest,
    PerformanceRequest,
    MatchPredictionRequest,
    ErrorDetectionRequest,
)
from ..utils.dependencies import get_http_client, verify_token

router = APIRouter(prefix="/ia", tags=["ia"])
logger = logging.getLogger(__name__)


def ensure_openai_api_key() -> None:
    if not settings.OPENAI_API_KEY:
        logger.error("OpenAI API key not configured")
        raise HTTPException(status_code=500, detail="OpenAI not available")


async def call_ai(
    messages: List[Dict[str, str]], client: httpx.AsyncClient
) -> str:
    try:
        return await fetch_chat_completion(messages, client)
    except httpx.HTTPError as e:
        logger.error("HTTP error calling AI service: %s", e)
        raise HTTPException(status_code=502, detail="Error communicating with AI service")
    except Exception as e:
        logger.exception("Unexpected error during AI processing")
        raise HTTPException(status_code=500, detail="Internal AI processing error")



def build_messages(system: str, user: str) -> List[Dict[str, str]]:
    return [
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ]


@router.post("/suggest_lineup")
async def suggest_lineup(
    payload: LineupRequest,
    client: httpx.AsyncClient = Depends(get_http_client),
    _: None = Depends(verify_token),
) -> Dict[str, str]:
    ensure_openai_api_key()
    prompt = (
        f"Suggest a lineup using formation {payload.formation} for players: {', '.join(payload.players)}"
    )
    messages = build_messages(
        "You are a football tactical assistant.", prompt
    )
    lineup = await call_ai(messages, client)
    return {"lineup": lineup}


@router.post("/suggest_tactics")
async def suggest_tactics(
    payload: TacticsRequest,
    client: httpx.AsyncClient = Depends(get_http_client),
    _: None = Depends(verify_token),
) -> Dict[str, str]:
    ensure_openai_api_key()
    style_part = f" with style {payload.style}" if payload.style else ""
    prompt = (
        f"Suggest tactical instructions{style_part} for players: {', '.join(payload.players)}"
    )
    messages = build_messages(
        "You are a football tactical assistant.", prompt
    )
    tactics = await call_ai(messages, client)
    return {"tactics": tactics}


@router.post("/analyze_performance")
async def analyze_performance(
    payload: PerformanceRequest,
    client: httpx.AsyncClient = Depends(get_http_client),
    _: None = Depends(verify_token),
) -> Dict[str, str]:
    ensure_openai_api_key()
    ratings_str = "\n".join(
        f"{r.player}: {r.score} - {r.comment or ''}" for r in payload.ratings
    )
    messages = build_messages(
        "Analyze team performance", ratings_str
    )
    analysis = await call_ai(messages, client)
    return {"analysis": analysis}


@router.post("/predict_match")
async def predict_match(
    payload: MatchPredictionRequest,
    client: httpx.AsyncClient = Depends(get_http_client),
    _: None = Depends(verify_token),
) -> Dict[str, str]:
    ensure_openai_api_key()
    prompt = (
        f"Predict the result of a football match between the home team: {', '.join(payload.home_team)}"
        f" and the away team: {', '.join(payload.away_team)}"
    )
    messages = build_messages(
        "You are a football match predictor.", prompt
    )
    prediction = await call_ai(messages, client)
    return {"prediction": prediction}


@router.post("/detect_errors")
async def detect_errors(
    payload: ErrorDetectionRequest,
    client: httpx.AsyncClient = Depends(get_http_client),
    _: None = Depends(verify_token),
) -> Dict[str, str]:
    ensure_openai_api_key()
    formation_part = f" with formation {payload.formation}" if payload.formation else ""
    prompt = (
        f"Identify any issues in the lineup{formation_part}: {', '.join(payload.lineup)}"
    )
    messages = build_messages(
        "You are a football analyst.", prompt
    )
    report = await call_ai(messages, client)
    return {"report": report}
