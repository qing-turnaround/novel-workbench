import { useEffect, useState } from "react";
import { api, type Character } from "../lib/api";

export default function CharacterGraph() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selected, setSelected] = useState<Character | null>(null);
  const [states, setStates] = useState<any[]>([]);
  const [appearances, setAppearances] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getCharacters().then(setCharacters).catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    if (selected) {
      Promise.all([
        api.getCharacterStates(selected.id),
        api.getCharacterChapters(selected.id),
      ]).then(([s, a]) => {
        setStates(s);
        setAppearances(a);
      });
    }
  }, [selected]);

  if (error) return <div className="text-red-400">Error: {error}</div>;

  const roleColors: Record<string, string> = {
    protagonist: "bg-blue-600",
    antagonist: "bg-red-600",
    supporting: "bg-green-600",
    minor: "bg-gray-600",
  };

  return (
    <div className="flex gap-6">
      <div className="w-64 shrink-0 space-y-2">
        <h3 className="mb-3 text-lg font-semibold">角色列表</h3>
        {characters.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c)}
            className={`flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm transition ${
              selected?.id === c.id
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <span
              className={`inline-block h-2 w-2 rounded-full ${roleColors[c.role] || "bg-gray-500"}`}
            />
            <span>{c.name}</span>
            <span className="ml-auto text-xs text-gray-500">{c.status}</span>
          </button>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        {selected ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold">{selected.name}</h2>
              <div className="mt-1 flex gap-3 text-sm text-gray-400">
                <span>{selected.role}</span>
                {selected.faction && <span>| {selected.faction}</span>}
                <span>| {selected.status}</span>
                {selected.first_appearance && (
                  <span>| 首次出场：第{selected.first_appearance}章</span>
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">出场章节 ({appearances.length})</h3>
              {appearances.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {appearances.map((a: any) => (
                    <span
                      key={a.chapter_number}
                      className={`rounded px-2 py-1 text-xs ${
                        a.role_in_chapter === "主要"
                          ? "bg-blue-900 text-blue-300"
                          : a.role_in_chapter === "次要"
                            ? "bg-gray-800 text-gray-300"
                            : "bg-gray-900 text-gray-500"
                      }`}
                    >
                      第{a.chapter_number}章
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">暂无出场记录</p>
              )}
            </div>

            <div>
              <h3 className="mb-2 font-semibold">状态变迁</h3>
              {states.length > 0 ? (
                <div className="space-y-2">
                  {states.map((s: any, i: number) => (
                    <div
                      key={i}
                      className="flex gap-3 rounded bg-gray-900 p-3 text-sm"
                    >
                      <span className="shrink-0 text-gray-500">
                        第{s.chapter_number}章
                      </span>
                      <span className="shrink-0 rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-400">
                        {s.change_type}
                      </span>
                      <span>{s.description}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">暂无状态变更记录</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">从左侧选择角色查看详情</p>
        )}
      </div>
    </div>
  );
}
