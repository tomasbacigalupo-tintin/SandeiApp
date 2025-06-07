from fastapi import APIRouter, Depends, HTTPException
import httpx

from ..services.openai_client import fetch_chat_completion
from ..schemas import (
    LineupRequest,
    TacticsRequest,
    ErrorDetectionRequest,
    Rating,
    PerformanceRequest,
    MatchPredictionRequest,
)
from ..dependencies import get_http_client, verify_token
from ..config import OPENAI_API_KEY

router = APIRouter(prefix="/ia", tags=["ia"])

@router.post("/suggest_lineup")
async def suggest_lineup(
    payload: LineupRequest,
    client: httpx.AsyncClient = Depends(get_http_client),
    _: None = Depends(verify_token),
):
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

@router.post("/suggest_tactics")
async def suggest_tactics(
    payload: TacticsRequest,
    client: httpx.AsyncClient = Depends(get_http_client),
    _: None = Depends(verify_token),
):
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

@router.post("/analyze_performance")
async def analyze_performance(
    payload: PerformanceRequest,
    client: httpx.AsyncClient = Depends(get_http_client),
    _: None = Depends(verify_token),
):
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI not available")

    prompt = "\n".join([
        f"{r.player}: {r.score} - {r.comment or ''}" for r in payload.ratings
    ])
    messages = [
        {"role": "system", "content": "Analyze team performance"},
        {"role": "user", "content": prompt},
    ]
    try:
        analysis = await fetch_chat_completion(messages, client)
        return {"analysis": analysis}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@router.post("/predict_match")
async def predict_match(
    payload: MatchPredictionRequest,
    client: httpx.AsyncClient = Depends(get_http_client),
    _: None = Depends(verify_token),
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

@router.post("/detect_errors")
async def detect_errors(
    payload: ErrorDetectionRequest,
    client: httpx.AsyncClient = Depends(get_http_client),
    _: None = Depends(verify_token),
):
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI not available")

    formation_part = f" with formation {payload.formation}" if payload.formation else ""
    prompt = (
        "Identify any issues in the lineup" + formation_part + ": "
        + ", ".join(payload.lineup)
    )
    messages = [
        {"role": "system", "content": "You are a football analyst."},
        {"role": "user", "content": prompt},
    ]
    try:
        report = await fetch_chat_completion(messages, client)
        return {"report": report}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
