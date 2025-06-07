from pydantic import BaseModel, Field, conint
from typing import List, Optional

class LineupRequest(BaseModel):
    players: List[str] = Field(..., min_items=1)
    formation: str

class TacticsRequest(BaseModel):
    players: List[str] = Field(..., min_items=1)
    style: Optional[str] = None

class ErrorDetectionRequest(BaseModel):
    lineup: List[str] = Field(..., min_items=1)
    formation: Optional[str] = None

class Rating(BaseModel):
    player: str
    score: conint(ge=0, le=10)
    comment: Optional[str] = None

class PerformanceRequest(BaseModel):
    ratings: List[Rating] = Field(..., min_items=1)

class MatchPredictionRequest(BaseModel):
    home_team: List[str] = Field(..., min_items=1)
    away_team: List[str] = Field(..., min_items=1)
