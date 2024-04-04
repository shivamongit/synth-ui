import time
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes import generate, health, history

start_time = time.time()


@asynccontextmanager
async def lifespan(app: FastAPI):
    from app.db import init_db
    await init_db()
    yield


app = FastAPI(
    title="Synth UI API",
    description="AI-powered UI component generator backend",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api/v1", tags=["health"])
app.include_router(generate.router, prefix="/api/v1", tags=["generate"])
app.include_router(history.router, prefix="/api/v1", tags=["history"])
