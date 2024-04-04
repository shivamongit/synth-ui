import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException

from app.config import settings
from app.db import save_generation
from app.models import GenerateRequest, GenerateResponse
from app.services.ai import generate_component_code

router = APIRouter()


@router.post("/generate", response_model=GenerateResponse)
async def generate(req: GenerateRequest):
    if req.provider == "openai" and not settings.openai_api_key:
        raise HTTPException(status_code=400, detail="OpenAI API key not configured")
    if req.provider == "anthropic" and not settings.anthropic_api_key:
        raise HTTPException(status_code=400, detail="Anthropic API key not configured")

    try:
        result = await generate_component_code(
            prompt=req.prompt,
            framework=req.framework.value,
            styling=req.styling.value,
            provider=req.provider.value,
            temperature=req.temperature,
            max_tokens=req.max_tokens,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")

    generation_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()

    lang_map = {"react": "tsx", "vue": "vue", "svelte": "svelte", "html": "html"}
    language = lang_map.get(req.framework.value, "tsx")

    record = {
        "id": generation_id,
        "prompt": req.prompt,
        "code": result["code"],
        "language": language,
        "framework": req.framework.value,
        "styling": req.styling.value,
        "provider": req.provider.value,
        "tokens_used": result.get("tokens_used", 0),
        "created_at": now,
    }

    await save_generation(record)

    return GenerateResponse(**record)
