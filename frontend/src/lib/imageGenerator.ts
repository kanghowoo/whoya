import { VALUE_LABELS, AnswerValue } from "@/logic/summary";

const getValueLabel = (value: string): string => {
  return VALUE_LABELS[value as AnswerValue] || value;
};

export async function generateResultImage(
  coreValues: string[],
  hasFutureFocus: boolean
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  // 카드 크기 (인스타그램 스토리 비율에 가깝게)
  canvas.width = 600;
  canvas.height = 800;

  // 배경
  ctx.fillStyle = "#fafafa";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 상단 헤더 배경
  ctx.fillStyle = "#2563eb";
  ctx.fillRect(0, 0, canvas.width, 120);

  // 로고
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 36px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("whoya", canvas.width / 2, 70);

  ctx.font = "16px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText("나는 어떤 기준으로 투표하는 사람일까?", canvas.width / 2, 100);

  // 메인 카드 배경
  const cardX = 30;
  const cardY = 150;
  const cardWidth = canvas.width - 60;
  const cardHeight = 500;

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 16);
  ctx.fill();

  // 그림자 효과
  ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 4;
  ctx.fill();
  ctx.shadowColor = "transparent";

  // 카드 타이틀
  ctx.fillStyle = "#1a1a1a";
  ctx.font = "bold 24px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("나의 투표 기준", canvas.width / 2, cardY + 50);

  // 핵심 가치 태그들
  const valueLabels = coreValues.map(getValueLabel);
  let tagY = cardY + 100;

  ctx.font = "14px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillStyle = "#666666";
  ctx.fillText("내가 중요하게 생각하는 가치", canvas.width / 2, tagY);

  tagY += 40;

  // 태그 배경과 텍스트
  valueLabels.forEach((label, index) => {
    const tagWidth = ctx.measureText(label).width + 40;
    const tagX = canvas.width / 2 - tagWidth / 2;

    ctx.fillStyle = "#dbeafe";
    ctx.beginPath();
    ctx.roundRect(tagX, tagY + index * 50, tagWidth, 36, 18);
    ctx.fill();

    ctx.fillStyle = "#2563eb";
    ctx.font = "bold 16px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, canvas.width / 2, tagY + index * 50 + 24);
  });

  // 시간 관점
  const focusY = tagY + valueLabels.length * 50 + 40;
  ctx.fillStyle = "#f8fafc";
  ctx.beginPath();
  ctx.roundRect(cardX + 20, focusY, cardWidth - 40, 80, 8);
  ctx.fill();

  ctx.fillStyle = "#1a1a1a";
  ctx.font = "15px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textAlign = "center";
  const focusText = hasFutureFocus
    ? "장기적인 영향을 기준으로 판단하는 편"
    : "현재의 필요를 기준으로 판단하는 편";
  ctx.fillText(focusText, canvas.width / 2, focusY + 45);

  // 면책 조항
  const disclaimerY = cardY + cardHeight - 60;
  ctx.fillStyle = "#fef3c7";
  ctx.beginPath();
  ctx.roundRect(cardX + 20, disclaimerY, cardWidth - 40, 40, 8);
  ctx.fill();

  ctx.fillStyle = "#92400e";
  ctx.font = "12px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText(
    "이 결과는 어떤 후보나 정당도 추천하지 않습니다",
    canvas.width / 2,
    disclaimerY + 25
  );

  // 하단 CTA
  ctx.fillStyle = "#666666";
  ctx.font = "14px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText("나도 해보기 →", canvas.width / 2, 720);

  ctx.fillStyle = "#2563eb";
  ctx.font = "bold 16px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText("whoya.kr", canvas.width / 2, 750);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob!);
    }, "image/png");
  });
}
