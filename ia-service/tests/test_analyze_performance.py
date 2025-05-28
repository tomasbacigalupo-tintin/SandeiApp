import asyncio
import types
import sys

import os

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
from app.main import analyze_performance, PerformanceRequest

class FakeChatCompletion:
    @staticmethod
    def create(**kwargs):
        return types.SimpleNamespace(choices=[types.SimpleNamespace(message=types.SimpleNamespace(content="ok"))])


def test_analyze_performance(monkeypatch):
    fake_openai = types.SimpleNamespace(ChatCompletion=FakeChatCompletion)
    monkeypatch.setitem(sys.modules, 'openai', fake_openai)
    import app.main as main
    monkeypatch.setattr(main, 'openai', fake_openai)
    payload = PerformanceRequest(ratings=[{"player": "John", "score": 7}])
    result = asyncio.run(analyze_performance(payload))
    assert result == {"analysis": "ok"}
