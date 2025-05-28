from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, conint, conlist
from typing import List, Optional
import os

try:
    import openai
except Exception:  # pragma: no cover - openai may not be installed
    openai = None

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if openai and OPENAI_API_KEY:
    openai.api_key = OPENAI_API_KEY

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI"}


class LineupRequest(BaseModel):
    players: conlist(str, min_items=1, max_items=11)
    formation: str


@app.post("/ia/suggest_lineup")
async def suggest_lineup(payload: LineupRequest):
    """Suggest an optimal lineup based on the given formation."""
    if not openai:
        raise HTTPException(status_code=500, detail="OpenAI not available")
    prompt = (
        f"Suggest a lineup using formation {payload.formation} for players: "
        + ", ".join(payload.players)
    )
    try:
        resp = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a football tactical assistant."},
                {"role": "user", "content": prompt},
            ],
            timeout=30,
        )
        suggestion = resp.choices[0].message.content
        return {"lineup": suggestion}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


class Rating(BaseModel):
    player: str
    score: conint(ge=0, le=10)
    comment: Optional[str] = None


class PerformanceRequest(BaseModel):
    ratings: conlist(Rating, min_items=1)


@app.post("/ia/analyze_performance")
async def analyze_performance(payload: PerformanceRequest):
    if not openai:
        raise HTTPException(status_code=500, detail="OpenAI not available")

    prompt = "\n".join(
        [f'{r.player}: {r.score} - {r.comment or ""}' for r in payload.ratings]
    )

    try:
        resp = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Analyze team performance"},
                {"role": "user", "content": prompt},
            ],
            timeout=30,
        )
        analysis = resp.choices[0].message.content
        return {"analysis": analysis}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
