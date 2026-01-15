from sqlalchemy import Column, Integer, String, DateTime, func
from app.database import Base


class AnswerStat(Base):
    __tablename__ = "answer_stats"

    id = Column(Integer, primary_key=True, index=True)
    value = Column(String(50), unique=True, nullable=False, index=True)
    count = Column(Integer, default=0, nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=func.now())
