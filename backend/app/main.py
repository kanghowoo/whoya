from dotenv import load_dotenv

load_dotenv()

import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.models import Answers, SummaryResponse, StatsResponse
from app.scoring import calculate_scores, get_top_values, determine_note
from app.consistency import find_tensions
from app.llm import generate_ai_summary
from app.stats import record_answers, get_stats
from app.database import get_db, init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    # 시작 시 DB 테이블 생성
    init_db()
    yield


app = FastAPI(title="whoya API", version="0.1.0", lifespan=lifespan)

# CORS 설정 - 배포 시 환경변수로 오버라이드
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:3001"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/summarize", response_model=SummaryResponse)
def summarize(answers: Answers, db: Session = Depends(get_db)) -> SummaryResponse:
    # 익명 통계 기록
    record_answers(db, answers.model_dump())

    scores = calculate_scores(answers)
    core_values = get_top_values(scores, n=2)
    has_future_focus = "future" in scores
    note = determine_note(scores)
    tensions = find_tensions(answers)

    ai_summary = generate_ai_summary(
        core_values=core_values,
        has_future_focus=has_future_focus,
        note=note,
        tensions=tensions,
    )

    return SummaryResponse(
        core_values=core_values,
        has_future_focus=has_future_focus,
        note=note,
        tensions=tensions,
        ai_summary=ai_summary,
    )


@app.get("/stats", response_model=StatsResponse)
def stats(db: Session = Depends(get_db)) -> StatsResponse:
    data = get_stats(db)
    return StatsResponse(
        total=data["total"],
        percentages=data["percentages"],
    )


@app.get("/health")
def health():
    return {"status": "ok"}
