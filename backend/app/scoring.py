from collections import Counter
from app.models import Answers


def calculate_scores(answers: Answers) -> dict[str, int]:
    score: Counter[str] = Counter()

    def add(key: str | None, weight: int = 1):
        if key and key != "unknown":
            score[key] += weight

    add(answers.q1)
    add(answers.q2)
    add(answers.q3)
    add(answers.q4)
    add(answers.q5)
    add(answers.q7)

    if answers.q6:
        for v in answers.q6:
            add(v, weight=2)

    return dict(score)


def get_top_values(scores: dict[str, int], n: int = 2) -> list[str]:
    sorted_items = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return [k for k, _ in sorted_items[:n]]


def determine_note(scores: dict[str, int]) -> str:
    if not scores:
        return "undetermined"

    values = list(scores.values())
    if len(values) < 2:
        return "focused"

    top_two = sorted(values, reverse=True)[:2]
    if top_two[0] - top_two[1] <= 1:
        return "balanced"
    elif top_two[0] >= 3:
        return "focused"
    return "moderate"
