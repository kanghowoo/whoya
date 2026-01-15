# whoya (후야)

> 나는 어떤 기준으로 투표하는 사람일까?

A neutral, non-partisan voter self-reflection tool for Korea's 9th Nationwide Local Elections.

---

## Problem

In local elections, voters face a dual challenge:

1. **Information gap**: Candidate information is scattered, incomplete, or hard to compare
2. **Criteria gap**: Voters often don't have a clear sense of what issues actually matter most to _them_

Most election tools focus on solving the first problem—providing candidate comparisons, pledge summaries, or voting guides. But even with perfect information, voters struggle to make confident decisions when they haven't clarified their own priorities.

**whoya focuses on the second problem: helping voters understand themselves.**

---

## Why Existing Solutions Fall Short

| Existing Approach          | Limitation                                                        |
| -------------------------- | ----------------------------------------------------------------- |
| Candidate comparison sites | Assume voters already know what criteria to compare               |
| Political compass quizzes  | Often feel ideological or leading; focused on left/right spectrum |
| News coverage              | Fragmented, often focuses on scandals rather than policy          |
| Party platforms            | Dense, hard to parse for local-level relevance                    |

None of these help a voter answer: _"What do I actually care about in my local government?"_

---

## Hypothesis

> If we help voters articulate and reflect on their own priorities through guided, neutral questions, they will feel more confident and prepared for local elections—without us telling them how to vote.

We believe:

- Many voters _want_ to vote thoughtfully but lack a structured way to think through local issues
- Self-reflection increases voting confidence more than more candidate information
- A neutral tool can gain trust precisely because it doesn't push any agenda

---

## MVP Scope

### ✅ Included (3-day build)

- **Priority reflection flow**: 5-7 guided questions about local election topics (welfare, transportation, housing, environment, safety, education, local economy)
- **AI-assisted question generation**: Use AI to help users dig deeper into _why_ they care about certain issues
- **Consistency check**: Simple logic to surface contradictions (e.g., "You said taxes should decrease but services should expand—can you reflect on this?")
- **Summary output**: A shareable personal reflection summary (not a recommendation)
  - 각 응답에서 선택된 가치(세금/서비스, 개발/보존 등)를 점수화하여 집계합니다.
  - 우선순위 질문(Q6)은 가중치 2배로 반영하여 핵심 관심사를 강조합니다.
  - 가장 높은 점수의 가치 2개를 추출해 "당신이 중요하게 여기는 것" 문장을 생성합니다.
  - 시간 축(현재 vs 미래) 응답을 기반으로 판단 성향 문장을 추가합니다.
  - 어떤 후보나 정책도 언급하지 않으며, 오직 사용자 응답만 반영합니다.
- **Mobile-first web UI**: Simple, fast, accessible

### ❌ Explicitly Excluded

- Candidate recommendations or comparisons
- Political party information or endorsements
- Voting predictions or polling data
- User accounts or persistent data storage
- Any content that could be perceived as persuasion

---

## Target Users

**Primary**: Korean voters aged 20-45 who:

- Want to vote in local elections but feel uninformed or uncertain
- Are uncomfortable with overtly political tools
- Have 5-10 minutes to reflect before election day

**Secondary**: First-time voters or those who typically skip local elections due to confusion

---

## Success Metrics (3-day validation)

| Metric           | Target  | How to Measure                            |
| ---------------- | ------- | ----------------------------------------- |
| Completion rate  | >60%    | Users who finish the full reflection flow |
| Share rate       | >10%    | Users who share their summary             |
| Time on site     | 4-8 min | Average session duration                  |
| Return intent    | >40%    | "Would you use this again?" survey        |
| Trust perception | >70%    | "Did this feel neutral?" survey           |

---

## Design Principles

1. **Neutrality above all**: No language that favors any party, candidate, or ideology
2. **Reflection, not persuasion**: Questions guide thinking, never suggest answers
3. **Transparency**: Clearly explain that AI assists with question depth, not opinion formation
4. **Minimal data**: Collect nothing beyond anonymous usage metrics
5. **Accessible**: Works on any device, no login required

---

## Tech Approach (planned)

- Static web app (React or vanilla JS)
- AI integration via Claude API for deeper reflection prompts
- No backend database—all reflection happens client-side
- Optional: Anonymous analytics via simple event tracking

---

## Political Risk Mitigation

| Risk           | Mitigation                                                                           |
| -------------- | ------------------------------------------------------------------------------------ |
| Perceived bias | No candidate names, party references, or policy recommendations appear anywhere      |
| Legal concerns | Tool only facilitates self-reflection; makes no electoral claims                     |
| Misinformation | No factual claims about candidates or policies; only user's own input reflected back |
| Data privacy   | No personal data collected; no login; session-only storage                           |

---

## What whoya Is NOT

- ❌ A voting guide
- ❌ A candidate recommender
- ❌ A political compass or ideology test
- ❌ A fact-checking service
- ❌ An opinion generator

---

## What whoya IS

- ✅ A mirror for your own thinking
- ✅ A structured way to prepare for election day
- ✅ A tool that respects your autonomy as a voter

whoya does not present candidate pledges directly.
Instead, it helps users clarify their own criteria before engaging with official pledge information from external sources.

## License

MIT

---

_whoya: 투표 전, 나를 먼저 알아가는 시간._
