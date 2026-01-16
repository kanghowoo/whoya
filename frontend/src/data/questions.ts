import { AnswerValue } from "@/logic/summary";

export type QuestionOption = {
  label: string;
  value: AnswerValue;
};

export type Question = {
  id: string;
  text: string;
  options: QuestionOption[];
  multiSelect?: boolean;
  maxSelect?: number;
};

export const questions: Question[] = [
  {
    id: "q1",
    text: "우리 동네 공공서비스(도서관, 체육시설, 돌봄센터 등)가 더 많아지면 좋겠다. 그 비용을 위해 세금이 조금 오르는 건 괜찮다.",
    options: [
      { label: "그렇다", value: "service" },
      { label: "아니다", value: "tax" },
      { label: "잘 모르겠다", value: "unknown" },
    ],
  },
  {
    id: "q2",
    text: "오래된 동네가 재개발되면 깔끔해지지만, 원래 살던 분들이 떠나야 할 수도 있다. 나는 이런 변화를 어떻게 생각하나?",
    options: [
      { label: "개발이 더 중요하다", value: "development" },
      { label: "기존 주민 보호가 더 중요하다", value: "preservation" },
      { label: "상황에 따라 다르다", value: "unknown" },
    ],
  },
  {
    id: "q3",
    text: "우리 동네에 주차장이 부족하다. 작은 공원 하나를 없애고 주차장을 만드는 것에 대해 어떻게 생각하나?",
    options: [
      { label: "주차장이 더 필요하다", value: "convenience" },
      { label: "공원을 지켜야 한다", value: "environment" },
      { label: "잘 모르겠다", value: "unknown" },
    ],
  },
  {
    id: "q4",
    text: "골목에 CCTV가 많아지면 안전해지지만, 감시받는 느낌이 들 수도 있다. 나는 어느 쪽이 더 신경 쓰이나?",
    options: [
      { label: "안전이 더 중요하다", value: "safety" },
      { label: "사생활이 더 중요하다", value: "privacy" },
      { label: "둘 다 비슷하게 중요하다", value: "unknown" },
    ],
  },
  {
    id: "q5",
    text: "우리 지역에 큰 도로나 전철이 새로 생기면 편해지지만, 공사 중 소음과 불편을 몇 년간 감수해야 한다. 나는 이런 투자를 어떻게 생각하나?",
    options: [
      { label: "장기적 발전이 더 중요하다", value: "future" },
      { label: "지금의 생활 안정이 더 중요하다", value: "now" },
      { label: "규모에 따라 다르다", value: "unknown" },
    ],
  },
  {
    id: "q6",
    text: "지역 예산이 한정되어 있다면, 다음 중 가장 먼저 투자해야 할 분야는? (최대 2개 선택)",
    options: [
      { label: "교육·보육", value: "service" },
      { label: "일자리·경제", value: "development" },
      { label: "교통·주거", value: "convenience" },
      { label: "환경·안전", value: "environment" },
    ],
    multiSelect: true,
    maxSelect: 2,
  },
  {
    id: "q7",
    text: "중요한 지역 사안을 결정할 때, 어떤 방식이 더 나을까?",
    options: [
      { label: "전문가와 공무원이 빠르게 결정", value: "efficiency" },
      { label: "주민들이 참여해서 천천히 결정", value: "participation" },
      { label: "사안에 따라 다르다", value: "unknown" },
    ],
  },
];
