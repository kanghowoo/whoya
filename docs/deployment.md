# whoya 배포 가이드

## 아키텍처

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Vercel    │────▶│  Railway    │────▶│  Supabase   │
│  (Frontend) │     │  (Backend)  │     │ (PostgreSQL)│
│   Next.js   │     │   FastAPI   │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
     무료              ~$5/월              무료
```

---

## 1. Supabase 설정

1. [Supabase](https://supabase.com) 로그인
2. New Project 생성
3. Project Settings → Database → Connection string (URI) 복사
4. 형식: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`

---

## 2. Railway Backend 배포

1. [Railway](https://railway.app) 로그인
2. New Project → Deploy from GitHub Repo
3. Repository 선택 후 Root Directory: `backend` 설정
4. Variables 탭에서 환경변수 추가:

```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
ANTHROPIC_API_KEY=sk-... (선택)
```

5. Deploy 클릭
6. 배포 완료 후 도메인 확인 (예: `whoya-backend.up.railway.app`)

---

## 3. Vercel Frontend 배포

1. [Vercel](https://vercel.com) 로그인
2. New Project → Import Git Repository
3. Root Directory: `frontend` 설정
4. Environment Variables 추가:

```
NEXT_PUBLIC_API_URL=https://whoya-backend.up.railway.app
```

5. Deploy 클릭

---

## 4. CORS 업데이트

Backend Railway 환경변수에서 `ALLOWED_ORIGINS`를 실제 Vercel 도메인으로 업데이트:

```
ALLOWED_ORIGINS=https://whoya.vercel.app
```

---

## 환경변수 요약

### Backend (Railway)

| 변수 | 필수 | 설명 |
|------|------|------|
| `DATABASE_URL` | ✅ | Supabase PostgreSQL 연결 문자열 |
| `ALLOWED_ORIGINS` | ✅ | 프론트엔드 도메인 (쉼표 구분) |
| `ANTHROPIC_API_KEY` | ❌ | AI 요약 기능용 |

### Frontend (Vercel)

| 변수 | 필수 | 설명 |
|------|------|------|
| `NEXT_PUBLIC_API_URL` | ✅ | 백엔드 API URL |

---

## 로컬 개발

```bash
# Backend (SQLite 사용 - DB 설정 불필요)
cd backend
cp .env.example .env
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Frontend
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

---

## 비용 예상

| 서비스 | 비용 |
|--------|------|
| Vercel | 무료 (Hobby) |
| Railway | ~$5/월 (또는 무료 크레딧) |
| Supabase | 무료 (Free tier) |
| **총합** | **~$5/월** |

---

## 배포 체크리스트

- [ ] Supabase 프로젝트 생성
- [ ] Railway에 backend 배포
- [ ] Railway 환경변수 설정 (DATABASE_URL, ALLOWED_ORIGINS)
- [ ] Vercel에 frontend 배포
- [ ] Vercel 환경변수 설정 (NEXT_PUBLIC_API_URL)
- [ ] CORS 도메인 업데이트
- [ ] 전체 흐름 테스트
