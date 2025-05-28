import pytest
from pydantic import ValidationError

import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
from app.main import Rating, LineupRequest


def test_rating_score_range():
    with pytest.raises(ValidationError):
        Rating(player="John", score=11)


def test_lineup_request_players_length():
    with pytest.raises(ValidationError):
        LineupRequest(players=["p"] * 12, formation="4-4-2")
