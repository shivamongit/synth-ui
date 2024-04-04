import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app
from app.models import GenerateRequest


@pytest.mark.asyncio
async def test_generate_requires_prompt():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post("/api/v1/generate", json={"prompt": ""})
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_generate_validates_framework():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/generate",
            json={"prompt": "A button", "framework": "invalid"},
        )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_generate_validates_temperature_range():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/generate",
            json={"prompt": "A button", "temperature": 5.0},
        )
    assert response.status_code == 422


def test_generate_request_model():
    req = GenerateRequest(prompt="A pricing card")
    assert req.framework.value == "react"
    assert req.styling.value == "tailwind"
    assert req.provider.value == "openai"
    assert req.temperature == 0.7
