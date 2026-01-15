import { Answers } from "@/logic/summary";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type SummaryResponse = {
  core_values: string[];
  has_future_focus: boolean;
  note: string;
  tensions: string[];
  ai_summary: string | null;
};

export type StatsResponse = {
  total: number;
  percentages: Record<string, number>;
};

export async function fetchSummary(answers: Answers): Promise<SummaryResponse> {
  const response = await fetch(`${API_BASE_URL}/summarize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answers),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch summary");
  }

  return response.json();
}

export async function fetchStats(): Promise<StatsResponse> {
  const response = await fetch(`${API_BASE_URL}/stats`);

  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }

  return response.json();
}
