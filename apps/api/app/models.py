from pydantic import BaseModel, Field
from enum import Enum


class Framework(str, Enum):
    REACT = "react"
    VUE = "vue"
    SVELTE = "svelte"
    HTML = "html"


class Styling(str, Enum):
    TAILWIND = "tailwind"
    CSS_MODULES = "css-modules"
    STYLED_COMPONENTS = "styled-components"
    VANILLA = "vanilla"


class Provider(str, Enum):
    OPENAI = "openai"
    ANTHROPIC = "anthropic"


class GenerateRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=2000)
    framework: Framework = Framework.REACT
    styling: Styling = Styling.TAILWIND
    provider: Provider = Provider.OPENAI
    temperature: float = Field(default=0.7, ge=0.0, le=2.0)
    max_tokens: int = Field(default=4096, ge=100, le=16384)


class GenerateResponse(BaseModel):
    id: str
    code: str
    language: str
    framework: str
    styling: str
    provider: str
    tokens_used: int
    created_at: str


class HealthResponse(BaseModel):
    status: str
    version: str
    providers: dict[str, bool]
    uptime: float
