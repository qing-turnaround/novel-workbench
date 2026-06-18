const BASE = "/api";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export interface Book {
  id: number;
  title: string;
  genre: string;
  premise: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Chapter {
  id: number;
  chapter_number: number;
  title: string;
  volume_id: number;
  word_count: number;
  status: string;
  summary: string;
  content: string;
  pov_character_id: number;
  created_at: string;
  updated_at: string;
}

export interface Character {
  id: number;
  name: string;
  role: string;
  faction: string;
  status: string;
  first_appearance: number;
  file_path: string;
}

export interface Foreshadowing {
  id: number;
  description: string;
  planted_chapter: number;
  resolved_chapter: number | null;
  status: string;
  priority: string;
  notes: string;
}

export interface WorldbuildingEntry {
  id: number;
  category: string;
  title: string;
  content: string;
}

export interface QualityAudit {
  id: number;
  chapter_id: number;
  chapter_number: number;
  chapter_title: string;
  audit_type: string;
  severity: string;
  description: string;
  resolved: number;
  created_at: string;
}

export interface WritingStat {
  date: string;
  chapters_written: number;
  words_written: number;
}

export interface StatTotals {
  total_chapters: number;
  total_words: number;
  writing_days: number;
}

export const api = {
  getBook: () => get<Book>("/book"),
  getChapters: (volume?: number) =>
    get<Chapter[]>(volume ? `/chapters?volume=${volume}` : "/chapters"),
  getChapter: (num: number) => get<Chapter>(`/chapters/${num}`),
  getCharacters: () => get<Character[]>("/characters"),
  getCharacterStates: (id: number) => get<any[]>(`/characters/${id}/states`),
  getCharacterChapters: (id: number) => get<any[]>(`/characters/${id}/chapters`),
  getForeshadowing: (status?: string) =>
    get<Foreshadowing[]>(status ? `/foreshadowing?status=${status}` : "/foreshadowing"),
  getWorldbuilding: (category?: string) =>
    get<WorldbuildingEntry[]>(
      category ? `/worldbuilding?category=${category}` : "/worldbuilding"
    ),
  getQualityAudits: (type?: string, severity?: string) => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (severity) params.set("severity", severity);
    const qs = params.toString();
    return get<QualityAudit[]>(`/quality${qs ? `?${qs}` : ""}`);
  },
  getQualitySummary: () => get<any>("/quality/summary"),
  getStats: (range?: string) =>
    get<WritingStat[]>(range ? `/stats?range=${range}` : "/stats"),
  getStatTotals: () => get<StatTotals>("/stats/totals"),
};
