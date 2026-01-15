"use client";

import { Question } from "@/data/questions";
import { AnswerValue } from "@/logic/summary";

type QuestionCardProps = {
  question: Question;
  selectedValues: AnswerValue[];
  onSelect: (values: AnswerValue[]) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
};

export default function QuestionCard({
  question,
  selectedValues,
  onSelect,
  onNext,
  onPrev,
  isFirst,
  isLast,
}: QuestionCardProps) {
  const handleOptionClick = (value: AnswerValue) => {
    if (question.multiSelect) {
      const maxSelect = question.maxSelect ?? 2;
      if (selectedValues.includes(value)) {
        onSelect(selectedValues.filter((v) => v !== value));
      } else if (selectedValues.length < maxSelect) {
        onSelect([...selectedValues, value]);
      }
    } else {
      onSelect([value]);
    }
  };

  const canProceed = selectedValues.length > 0;

  return (
    <div className="question-card">
      <p className="question-text">{question.text}</p>

      <div className="options">
        {question.options.map((option) => (
          <button
            key={option.value}
            className={`option-button ${
              selectedValues.includes(option.value) ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="nav-buttons">
        {!isFirst && (
          <button className="nav-button prev" onClick={onPrev}>
            이전
          </button>
        )}
        <button
          className="nav-button next"
          onClick={onNext}
          disabled={!canProceed}
        >
          {isLast ? "결과 보기" : "다음"}
        </button>
      </div>
    </div>
  );
}
