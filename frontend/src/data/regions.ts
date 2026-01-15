export type VotingPosition = {
  name: string;
  description: string;
};

export type Region = {
  code: string;
  name: string;
  positions: VotingPosition[];
  necUrl: string;
};

// 제9회 전국동시지방선거 기준 투표 대상
const METRO_POSITIONS: VotingPosition[] = [
  { name: "시·도지사", description: "광역자치단체장" },
  { name: "시·도의원 (지역구)", description: "광역의회 지역구 의원" },
  { name: "시·도의원 (비례대표)", description: "광역의회 비례대표 의원" },
  { name: "구청장/군수", description: "기초자치단체장" },
  { name: "구·군의원 (지역구)", description: "기초의회 지역구 의원" },
  { name: "구·군의원 (비례대표)", description: "기초의회 비례대표 의원" },
  { name: "교육감", description: "시·도 교육행정 책임자" },
];

const PROVINCE_POSITIONS: VotingPosition[] = [
  { name: "도지사", description: "광역자치단체장" },
  { name: "도의원 (지역구)", description: "광역의회 지역구 의원" },
  { name: "도의원 (비례대표)", description: "광역의회 비례대표 의원" },
  { name: "시장/군수", description: "기초자치단체장" },
  { name: "시·군의원 (지역구)", description: "기초의회 지역구 의원" },
  { name: "시·군의원 (비례대표)", description: "기초의회 비례대표 의원" },
  { name: "교육감", description: "도 교육행정 책임자" },
];

// 세종시는 기초의회 없음
const SEJONG_POSITIONS: VotingPosition[] = [
  { name: "시장", description: "세종특별자치시장" },
  { name: "시의원 (지역구)", description: "시의회 지역구 의원" },
  { name: "시의원 (비례대표)", description: "시의회 비례대표 의원" },
  { name: "교육감", description: "시 교육행정 책임자" },
];

// 제주도는 기초의회 없음
const JEJU_POSITIONS: VotingPosition[] = [
  { name: "도지사", description: "제주특별자치도지사" },
  { name: "도의원 (지역구)", description: "도의회 지역구 의원" },
  { name: "도의원 (비례대표)", description: "도의회 비례대표 의원" },
  { name: "교육감", description: "도 교육행정 책임자" },
];

const NEC_BASE_URL = "https://info.nec.go.kr";

export const regions: Region[] = [
  {
    code: "seoul",
    name: "서울특별시",
    positions: METRO_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "busan",
    name: "부산광역시",
    positions: METRO_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "daegu",
    name: "대구광역시",
    positions: METRO_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "incheon",
    name: "인천광역시",
    positions: METRO_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "gwangju",
    name: "광주광역시",
    positions: METRO_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "daejeon",
    name: "대전광역시",
    positions: METRO_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "ulsan",
    name: "울산광역시",
    positions: METRO_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "sejong",
    name: "세종특별자치시",
    positions: SEJONG_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "gyeonggi",
    name: "경기도",
    positions: PROVINCE_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "gangwon",
    name: "강원특별자치도",
    positions: PROVINCE_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "chungbuk",
    name: "충청북도",
    positions: PROVINCE_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "chungnam",
    name: "충청남도",
    positions: PROVINCE_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "jeonbuk",
    name: "전북특별자치도",
    positions: PROVINCE_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "jeonnam",
    name: "전라남도",
    positions: PROVINCE_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "gyeongbuk",
    name: "경상북도",
    positions: PROVINCE_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "gyeongnam",
    name: "경상남도",
    positions: PROVINCE_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
  {
    code: "jeju",
    name: "제주특별자치도",
    positions: JEJU_POSITIONS,
    necUrl: `${NEC_BASE_URL}/main/showDocument.xhtml?electionId=0020220601&topMenuId=VC&secondMenuId=VCCP09`,
  },
];

export const NEC_LINKS = {
  policy: "https://policy.nec.go.kr",
  candidates: "https://info.nec.go.kr",
  main: "https://www.nec.go.kr",
};
