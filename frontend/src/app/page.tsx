import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <div className="landing">
        <h1>whoya</h1>
        <p className="tagline">나는 어떤 기준으로 투표하는 사람일까?</p>

        <div className="intro">
          <p>
            지방선거, 누구를 뽑아야 할지 모르겠다면
            <br />
            먼저 <strong>나의 기준</strong>부터 알아보세요.
          </p>
        </div>

        <Link href="/questions" className="start-button">
          시작하기
        </Link>

        <div className="notice">
          <p>7개 질문 / 약 2-3분 소요</p>
          <p>로그인 없음 / 데이터 저장 없음</p>
        </div>

        <div className="disclaimer-landing">
          <p>
            이 서비스는 어떤 후보나 정당도 추천하지 않습니다.
            <br />
            오직 당신의 자기성찰을 돕기 위한 도구입니다.
          </p>
        </div>
      </div>
    </main>
  );
}
