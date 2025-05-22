from fastapi.testclient import TestClient
import types
import sys

from app.main import app

client = TestClient(app)

class FakeChatCompletion:
    @staticmethod
    def create(**kwargs):
        return types.SimpleNamespace(choices=[types.SimpleNamespace(message=types.SimpleNamespace(content="ok"))])


def test_analyze_performance(monkeypatch):
    fake_openai = types.SimpleNamespace(ChatCompletion=FakeChatCompletion)
    monkeypatch.setitem(sys.modules, 'openai', fake_openai)
    response = client.post(
        "/ia/analyze_performance",
        json={"ratings": [{"player": "John", "score": 7}]},
    )
    assert response.status_code == 200
    assert response.json() == {"analysis": "ok"}
