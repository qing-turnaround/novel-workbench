import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { api, type WorldbuildingEntry } from "../lib/api";

const categories = [
  { key: "overview", label: "总览" },
  { key: "rules", label: "世界规则" },
  { key: "factions", label: "势力/阵营" },
  { key: "locations", label: "重要地点" },
  { key: "history", label: "历史" },
];

export default function WorldbuildingBrowser() {
  const [entries, setEntries] = useState<WorldbuildingEntry[]>([]);
  const [activeCategory, setActiveCategory] = useState("overview");
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getWorldbuilding(activeCategory)
      .then(setEntries)
      .catch((e) => setError(e.message));
  }, [activeCategory]);

  if (error) return <div className="text-red-400">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">世界观</h2>

      <div className="flex gap-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCategory(c.key)}
            className={`rounded px-4 py-2 text-sm ${
              activeCategory === c.key
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="rounded-lg bg-gray-900 p-6">
            {entry.title && (
              <h3 className="mb-3 text-lg font-semibold">{entry.title}</h3>
            )}
            <article className="prose prose-invert max-w-none">
              <Markdown>{entry.content || "暂无内容"}</Markdown>
            </article>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-gray-500">该分类暂无内容</p>
        )}
      </div>
    </div>
  );
}
