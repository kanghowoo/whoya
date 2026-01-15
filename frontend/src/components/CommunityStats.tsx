"use client";

import { useEffect, useState } from "react";
import { fetchStats, StatsResponse } from "@/lib/api";
import { VALUE_LABELS, AnswerValue } from "@/logic/summary";

type CommunityStatsProps = {
  userValues: string[];
};

export default function CommunityStats({ userValues }: CommunityStatsProps) {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && !stats) {
      fetchStats().then(setStats).catch(console.error);
    }
  }, [isOpen, stats]);

  const getValueLabel = (value: string): string => {
    return VALUE_LABELS[value as AnswerValue] || value;
  };

  const topValues = stats
    ? Object.entries(stats.percentages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    : [];

  return (
    <div className="community-stats">
      <button
        className="community-stats-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "접기" : "다른 사람들은 어떻게 답했을까?"}
      </button>

      {isOpen && (
        <div className="community-stats-content">
          {!stats || stats.total === 0 ? (
            <p className="no-stats">아직 충분한 데이터가 없습니다.</p>
          ) : (
            <>
              <p className="stats-total">
                지금까지 <strong>{stats.total}명</strong>이 참여했어요
              </p>

              <div className="stats-bars">
                {topValues.map(([value, percentage]) => (
                  <div key={value} className="stat-bar">
                    <div className="stat-label">
                      <span className="stat-name">
                        {getValueLabel(value)}
                        {userValues.includes(value) && (
                          <span className="stat-you">나도 선택</span>
                        )}
                      </span>
                      <span className="stat-percent">{percentage}%</span>
                    </div>
                    <div className="stat-track">
                      <div
                        className={`stat-fill ${
                          userValues.includes(value) ? "highlighted" : ""
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="stats-notice">
                모든 응답은 익명으로 집계됩니다
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
