from typing import Literal, Optional
from pydantic import BaseModel

AnswerValue = Literal[
    "tax",
    "service",
    "development",
    "preservation",
    "convenience",
    "environment",
    "safety",
    "privacy",
    "now",
    "future",
    "efficiency",
    "participation",
    "unknown",
]


class Answers(BaseModel):
    q1: Optional[AnswerValue] = None
    q2: Optional[AnswerValue] = None
    q3: Optional[AnswerValue] = None
    q4: Optional[AnswerValue] = None
    q5: Optional[AnswerValue] = None
    q6: Optional[list[AnswerValue]] = None
    q7: Optional[AnswerValue] = None


class SummaryResponse(BaseModel):
    core_values: list[str]
    has_future_focus: bool
    note: str
    tensions: list[str] = []
    ai_summary: Optional[str] = None


class StatsResponse(BaseModel):
    total: int
    percentages: dict[str, float]
