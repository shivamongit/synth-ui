import time

from fastapi import APIRouter

from app.config import settings
from app.models import HealthResponse

router = APIRouter()

start_time = time.time()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        providers={
            "openai": bool(settings.openai_api_key),
            "anthropic": bool(settings.anthropic_api_key),
        },
        uptime=time.time() - start_time,
    )
