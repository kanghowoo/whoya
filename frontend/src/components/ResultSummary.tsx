"use client";

import { VALUE_LABELS, AnswerValue } from "@/logic/summary";
import { SummaryResponse } from "@/lib/api";

type ResultSummaryProps = {
  data: SummaryResponse;
};

export default function ResultSummary({ data }: ResultSummaryProps) {
  const { core_values, has_future_focus, note, tensions, ai_summary } = data;

  const getValueLabel = (value: string): string => {
    return VALUE_LABELS[value as AnswerValue] || value;
  };

  const getNoteText = (note: string): string => {
    switch (note) {
      case "balanced":
        return "균형 잡힌 시각";
      case "focused":
        return "명확한 우선순위";
      case "moderate":
        return "유연한 관점";
      default:
        return "";
    }
  };

  return (
    <div className="result-summary">
      <h2>나의 투표 기준</h2>

      {/* AI 요약 또는 기본 요약 */}
      <div className="summary-text">
        {ai_summary ? (
          <p>{ai_summary}</p>
        ) : (
          <>
            <p>
              당신은 <strong>{getValueLabel(core_values[0])}</strong>을(를)
              중요하게 여기면서도,
            </p>
            {core_values[1] && (
              <p>
                <strong>{getValueLabel(core_values[1])}</strong> 역시 함께
                고려하는 편입니다.
              </p>
            )}
            <p>
              지역 이슈를 볼 때는{" "}
              {has_future_focus ? "장기적인 영향" : "현재의 필요"}을 기준으로
              판단하는 경향이 있습니다.
            </p>
          </>
        )}
      </div>

      {/* 핵심 가치 태그 */}
      {core_values.length > 0 && (
        <div className="value-tags">
          <h3>내가 중요하게 생각하는 가치</h3>
          <div className="tags">
            {core_values.map((value) => (
              <span key={value} className="tag">
                {getValueLabel(value)}
              </span>
            ))}
            {note && getNoteText(note) && (
              <span className="tag note">{getNoteText(note)}</span>
            )}
          </div>
        </div>
      )}

      {/* 일관성 분석 - 고민 지점 */}
      {tensions.length > 0 && (
        <div className="tensions">
          <h3>더 생각해볼 지점</h3>
          <ul>
            {tensions.map((tension, i) => (
              <li key={i}>{tension}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="disclaimer">
        <p>
          이 결과는 어떤 후보나 정당도 추천하지 않습니다.
          <br />
          오직 당신의 응답만을 바탕으로 생성되었습니다.
        </p>
      </div>
    </div>
  );
}
