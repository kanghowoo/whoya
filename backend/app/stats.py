from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db_models import AnswerStat, Submission


def record_answers(db: Session, answers: dict) -> None:
    """응답을 데이터베이스에 기록"""
    # 제출 기록
    db.add(Submission())

    # 각 응답 값 카운트 증가
    for key, value in answers.items():
        if value is None or value == "unknown":
            continue

        values_to_record = value if isinstance(value, list) else [value]

        for v in values_to_record:
            if v == "unknown":
                continue

            # Upsert: 있으면 count +1, 없으면 새로 생성
            stat = db.query(AnswerStat).filter(AnswerStat.value == v).first()
            if stat:
                stat.count += 1
            else:
                db.add(AnswerStat(value=v, count=1))

    db.commit()


def get_stats(db: Session) -> dict:
    """현재까지의 통계 반환"""
    total = db.query(func.count(Submission.id)).scalar() or 0

    if total == 0:
        return {"total": 0, "percentages": {}}

    # 전체 값 합계
    total_values = db.query(func.sum(AnswerStat.count)).scalar() or 0

    if total_values == 0:
        return {"total": total, "percentages": {}}

    # 상위 값들의 비율 계산
    stats = db.query(AnswerStat).order_by(AnswerStat.count.desc()).limit(10).all()

    percentages = {}
    for stat in stats:
        percentages[stat.value] = round((stat.count / total_values) * 100, 1)

    return {
        "total": total,
        "percentages": percentages,
    }
