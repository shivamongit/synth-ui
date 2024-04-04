from fastapi import APIRouter

from app.db import get_generations
from app.models import GenerateResponse

router = APIRouter()


@router.get("/history", response_model=list[GenerateResponse])
async def list_history(limit: int = 50):
    rows = await get_generations(limit=limit)
    return [GenerateResponse(**row) for row in rows]
