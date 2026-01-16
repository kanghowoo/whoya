"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import { Answers, AnswerValue } from "@/logic/summary";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";

export default function QuestionsPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue[]>>({});

  const currentQuestion = questions[currentIndex];
  const questionId = currentQuestion.id as string;
  const selectedValues = answers[questionId] ?? [];

  const handleSelect = (values: AnswerValue[]) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: values,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Convert answers to the format expected by generateSummary
      const formattedAnswers: Answers = {
        q1: answers.q1?.[0],
        q2: answers.q2?.[0],
        q3: answers.q3?.[0],
        q4: answers.q4?.[0],
        q5: answers.q5?.[0],
        q6: answers.q6,
        q7: answers.q7?.[0],
      };

      // Store in sessionStorage for result page
      sessionStorage.setItem("whoya_answers", JSON.stringify(formattedAnswers));
      router.push("/result");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <main className="container">
      <div className="questions-page">
        <ProgressBar current={currentIndex + 1} total={questions.length} />

        <QuestionCard
          question={currentQuestion}
          selectedValues={selectedValues}
          onSelect={handleSelect}
          onNext={handleNext}
          onPrev={handlePrev}
          isFirst={currentIndex === 0}
          isLast={currentIndex === questions.length - 1}
        />
      </div>
    </main>
  );
}
