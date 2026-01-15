// src/logic/summary.ts

export type AnswerValue =
  | "tax"
  | "service"
  | "development"
  | "preservation"
  | "convenience"
  | "environment"
  | "safety"
  | "privacy"
  | "now"
  | "future"
  | "efficiency"
  | "participation"
  | "unknown";

export type Answers = {
  q1?: AnswerValue;
  q2?: AnswerValue;
  q3?: AnswerValue;
  q4?: AnswerValue;
  q5?: AnswerValue;
  q6?: AnswerValue[]; // priority (max 2)
  q7?: AnswerValue;
};

export const VALUE_LABELS: Record<AnswerValue, string> = {
  tax: "세금 절감",
  service: "공공서비스 확대",
  development: "개발과 성장",
  preservation: "공동체 보존",
  convenience: "생활 편의",
  environment: "환경 보호",
  safety: "안전 강화",
  privacy: "개인 자유",
  now: "현재 안정",
  future: "미래 투자",
  efficiency: "효율적 결정",
  participation: "주민 참여",
  unknown: "미정",
};

export function generateSummary(answers: Answers): string {
  const score: Record<string, number> = {};

  const add = (key?: AnswerValue, weight = 1) => {
    if (!key || key === "unknown") return;
    score[key] = (score[key] || 0) + weight;
  };

  add(answers.q1);
  add(answers.q2);
  add(answers.q3);
  add(answers.q4);
  add(answers.q5);
  add(answers.q7);

  answers.q6?.forEach((v) => add(v, 2));

  const top = Object.entries(score)
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k);

  return `
당신은 ${top[0] ?? "여러 가치"}를 중요하게 여기면서도,
${top[1] ?? "다양한 관점"} 역시 함께 고려하는 편입니다.

지역 이슈를 볼 때는 단기적인 편의보다
${
  top.includes("future") ? "장기적인 영향" : "현재의 필요"
}을 기준으로 판단하는 경향이 있습니다.
`.trim();
}
