import os
from anthropic import Anthropic

VALUE_LABELS = {
    "tax": "세금 절감",
    "service": "공공서비스 확대",
    "development": "개발과 성장",
    "preservation": "공동체 보존",
    "convenience": "생활 편의",
    "environment": "환경 보호",
    "safety": "안전 강화",
    "privacy": "개인 자유",
    "now": "현재 안정",
    "future": "미래 투자",
    "efficiency": "효율적 결정",
    "participation": "주민 참여",
}

SYSTEM_PROMPT = """당신은 유권자의 자기성찰을 돕는 중립적인 도우미입니다.

절대 규칙:
- 어떤 후보, 정당, 이념도 언급하지 마세요
- 어떻게 투표해야 하는지 암시하지 마세요
- 사용자의 선택을 판단하거나 평가하지 마세요
- 오직 사용자가 선택한 가치들을 바탕으로 성찰을 도와주세요

톤:
- 따뜻하고 격려하는 톤
- 2인칭 존댓말 사용 (예: "~하시는 편이에요", "~을 중요하게 생각하시네요")
- 짧고 명료하게 (3-4문장)"""


def get_client() -> Anthropic | None:
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        return None
    return Anthropic(api_key=api_key)


def generate_ai_summary(
    core_values: list[str],
    has_future_focus: bool,
    note: str,
    tensions: list[str],
) -> str | None:
    client = get_client()
    if not client:
        return None

    value_names = [VALUE_LABELS.get(v, v) for v in core_values]
    time_focus = "장기적 관점" if has_future_focus else "현재 중심적 관점"

    note_desc = {
        "balanced": "여러 가치 사이에서 균형을 찾으려 하시는",
        "focused": "명확한 우선순위를 가지신",
        "moderate": "유연하게 상황을 고려하시는",
    }.get(note, "")

    tension_context = ""
    if tensions:
        tension_context = f"\n\n발견된 고민 지점:\n" + "\n".join(f"- {t}" for t in tensions)

    user_message = f"""사용자의 응답 분석 결과:
- 핵심 가치: {', '.join(value_names)}
- 시간적 관점: {time_focus}
- 성향: {note_desc}
{tension_context}

위 정보를 바탕으로 사용자의 투표 기준에 대한 짧은 성찰 요약을 작성해주세요.
후보나 정당 언급 없이, 사용자가 스스로를 이해하는 데 도움이 되는 내용으로 작성해주세요."""

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=300,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_message}],
        )
        return response.content[0].text
    except Exception:
        return None
