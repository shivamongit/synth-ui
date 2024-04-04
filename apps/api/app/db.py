import aiosqlite
import os

DB_PATH = os.getenv("DB_PATH", "synth_ui.db")


async def init_db():
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS generations (
                id TEXT PRIMARY KEY,
                prompt TEXT NOT NULL,
                code TEXT NOT NULL,
                language TEXT NOT NULL,
                framework TEXT NOT NULL,
                styling TEXT NOT NULL,
                provider TEXT NOT NULL,
                tokens_used INTEGER DEFAULT 0,
                created_at TEXT NOT NULL
            )
        """)
        await db.commit()


async def save_generation(data: dict):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            """INSERT INTO generations (id, prompt, code, language, framework, styling, provider, tokens_used, created_at)
               VALUES (:id, :prompt, :code, :language, :framework, :styling, :provider, :tokens_used, :created_at)""",
            data,
        )
        await db.commit()


async def get_generations(limit: int = 50) -> list[dict]:
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            "SELECT * FROM generations ORDER BY created_at DESC LIMIT ?", (limit,)
        )
        rows = await cursor.fetchall()
        return [dict(row) for row in rows]
