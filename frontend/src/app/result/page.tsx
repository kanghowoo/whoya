"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Answers } from "@/logic/summary";
import { fetchSummary, SummaryResponse } from "@/lib/api";
import { generateResultImage } from "@/lib/imageGenerator";
import ResultSummary from "@/components/ResultSummary";
import VotingGuide from "@/components/VotingGuide";
import CommunityStats from "@/components/CommunityStats";

export default function ResultPage() {
  const router = useRouter();
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("whoya_answers");
    if (!stored) {
      router.push("/");
      return;
    }

    const answers: Answers = JSON.parse(stored);

    fetchSummary(answers)
      .then(setData)
      .catch(() => setError("결과를 불러오는데 실패했습니다."));
  }, [router]);

  const handleShare = async () => {
    if (!data) return;

    const shareText = `나의 투표 기준을 알아봤어요!\n\n나도 해보기: ${window.location.origin}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "whoya - 나의 투표 기준",
          text: shareText,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("클립보드에 복사되었습니다!");
    }
  };

  const handleImageShare = async () => {
    if (!data || isGeneratingImage) return;

    setIsGeneratingImage(true);

    try {
      const blob = await generateResultImage(
        data.core_values,
        data.has_future_focus
      );

      // 모바일에서 이미지 공유 지원 확인
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], "whoya-result.png", { type: "image/png" });
        const shareData = { files: [file] };

        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          setIsGeneratingImage(false);
          return;
        }
      }

      // 폴백: 이미지 다운로드
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "whoya-result.png";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Image generation failed:", err);
    }

    setIsGeneratingImage(false);
  };

  const handleRetry = () => {
    sessionStorage.removeItem("whoya_answers");
    router.push("/questions");
  };

  if (error) {
    return (
      <main className="container">
        <div className="error">
          <p>{error}</p>
          <button className="action-button retry" onClick={handleRetry}>
            다시 시도하기
          </button>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="container">
        <div className="loading">분석 중...</div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="result-page">
        <ResultSummary data={data} />

        <CommunityStats userValues={data.core_values} />

        <VotingGuide />

        <div className="result-actions">
          <button
            className="action-button share-image"
            onClick={handleImageShare}
            disabled={isGeneratingImage}
          >
            {isGeneratingImage ? "이미지 생성 중..." : "이미지로 저장/공유"}
          </button>
          <button className="action-button share" onClick={handleShare}>
            텍스트로 공유
          </button>
          <button className="action-button retry" onClick={handleRetry}>
            다시 해보기
          </button>
          <Link href="/" className="action-button home">
            처음으로
          </Link>
        </div>
      </div>
    </main>
  );
}
