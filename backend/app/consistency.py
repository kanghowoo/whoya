from app.models import Answers

# 잠재적 긴장 관계 정의
TENSION_PAIRS: list[tuple[str, str, str]] = [
    ("tax", "service", "세금 절감을 원하시면서 공공서비스 확대도 원하셨어요. 예산은 한정되어 있는데, 어떤 것이 더 우선일까요?"),
    ("development", "preservation", "개발과 공동체 보존 사이에서 고민이 있으신 것 같아요. 어떤 상황에서 어느 쪽을 택하실 건가요?"),
    ("convenience", "environment", "생활 편의와 환경 보호 모두 중요하게 생각하시네요. 둘이 충돌할 때는 어떻게 판단하실 건가요?"),
    ("efficiency", "participation", "빠른 결정과 주민 참여 모두 가치 있게 보셨어요. 시간이 급할 때는 어느 쪽을 선택하실 건가요?"),
    ("now", "future", "현재 안정과 미래 투자 사이에서 균형을 찾고 계시네요."),
]

# Q1(세금/서비스)과 Q6(우선순위) 간 긴장
Q1_Q6_TENSIONS: list[tuple[str, list[str], str]] = [
    ("tax", ["service", "environment"], "세금 인상에는 부정적이시면서, 공공서비스나 환경 분야 투자를 원하셨어요. 재원 마련에 대해 어떻게 생각하세요?"),
]


def find_tensions(answers: Answers) -> list[str]:
    tensions: list[str] = []

    all_values = set()
    for v in [answers.q1, answers.q2, answers.q3, answers.q4, answers.q5, answers.q7]:
        if v and v != "unknown":
            all_values.add(v)
    if answers.q6:
        all_values.update(v for v in answers.q6 if v != "unknown")

    # 기본 긴장 관계 체크
    for val1, val2, message in TENSION_PAIRS:
        if val1 in all_values and val2 in all_values:
            tensions.append(message)

    # Q1-Q6 특수 긴장 체크
    for q1_val, q6_vals, message in Q1_Q6_TENSIONS:
        if answers.q1 == q1_val and answers.q6:
            if any(v in q6_vals for v in answers.q6):
                tensions.append(message)

    return tensions[:2]  # 최대 2개만 반환
