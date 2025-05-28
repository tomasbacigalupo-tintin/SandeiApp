from fastapi.testclient import TestClient

from app.main import app, get_http_client


class FakeClient:
    async def post(self, *args, **kwargs):
        class Resp:
            def raise_for_status(self):
                pass

            def json(self):
                return {"choices": [{"message": {"content": "ok"}}]}

        return Resp()


async def fake_client_dep():
    yield FakeClient()


def test_analyze_performance():
    app.dependency_overrides[get_http_client] = fake_client_dep
    client = TestClient(app)
    response = client.post(
        "/ia/analyze_performance",
        json={"ratings": [{"player": "John", "score": 7}]},
    )
    assert response.status_code == 200
    assert response.json() == {"analysis": "ok"}
    app.dependency_overrides = {}
