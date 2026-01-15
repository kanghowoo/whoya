"use client";

import { useState } from "react";
import { regions, Region, NEC_LINKS } from "@/data/regions";

export default function VotingGuide() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleRegionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const region = regions.find((r) => r.code === e.target.value) || null;
    setSelectedRegion(region);
  };

  return (
    <div className="voting-guide">
      <button
        className="voting-guide-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "접기" : "내 지역 투표 정보 보기"}
      </button>

      {isOpen && (
        <div className="voting-guide-content">
          <div className="region-selector">
            <label htmlFor="region">거주 지역 선택</label>
            <select
              id="region"
              onChange={handleRegionSelect}
              value={selectedRegion?.code || ""}
            >
              <option value="">시/도를 선택하세요</option>
              {regions.map((region) => (
                <option key={region.code} value={region.code}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>

          {selectedRegion && (
            <div className="voting-positions">
              <h4>{selectedRegion.name} 투표 대상</h4>
              <p className="positions-count">
                총 <strong>{selectedRegion.positions.length}표</strong>를
                행사합니다
              </p>
              <ul>
                {selectedRegion.positions.map((position, i) => (
                  <li key={i}>
                    <span className="position-name">{position.name}</span>
                    <span className="position-desc">{position.description}</span>
                  </li>
                ))}
              </ul>

              <div className="nec-links">
                <a
                  href={NEC_LINKS.policy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nec-link"
                >
                  후보자 공약 보기
                </a>
                <a
                  href={NEC_LINKS.candidates}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nec-link"
                >
                  후보자 정보 보기
                </a>
              </div>
            </div>
          )}

          <p className="nec-notice">
            모든 후보 정보는 중앙선거관리위원회 공식 사이트에서 확인하실 수
            있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
