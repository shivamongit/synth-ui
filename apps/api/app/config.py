from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    openai_api_key: str = ""
    anthropic_api_key: str = ""
    cors_origins: list[str] = ["http://localhost:3000"]
    database_url: str = "sqlite+aiosqlite:///./synth_ui.db"
    default_model_openai: str = "gpt-4o"
    default_model_anthropic: str = "claude-3-5-sonnet-20241022"
    max_tokens: int = 4096

    class Config:
        env_file = ".env"


settings = Settings()
