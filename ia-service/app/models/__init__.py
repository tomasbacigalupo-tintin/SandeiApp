from pydantic import BaseModel, conint, constr
from typing import List, Optional

FormationStr = constr(regex=r"^\d{1,2}-\d{1,2}-\d{1,2}$")

class LineupRequest(BaseModel):
    players: List[str]
    formation: FormationStr

class TacticsRequest(BaseModel):
    players: List[str]
    style: Optional[str] = None

class Rating(BaseModel):
    player: str
    score: conint(ge=0, le=10)
    comment: Optional[str] = None

class PerformanceRequest(BaseModel):
    ratings: List[Rating]

class MatchPredictionRequest(BaseModel):
    home_team: List[str]
    away_team: List[str]

class ErrorDetectionRequest(BaseModel):
    lineup: List[str]
    formation: Optional[FormationStr] = None
