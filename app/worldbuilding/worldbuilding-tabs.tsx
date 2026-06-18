"use client";

import { useState } from "react";
import Markdown from "react-markdown";

const categories = [
  { key: "overview", label: "总览" },
  { key: "rules", label: "世界规则" },
  { key: "factions", label: "势力/阵营" },
  { key: "locations", label: "重要地点" },
  { key: "history", label: "历史" },
];

export default function WorldbuildingTabs({ entries }: { entries: any[] }) {
  const [active, setActive] = useState("overview");
  const filtered = entries.filter((e) => e.category === active);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">世界观</h2>

      <div className="flex gap-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`rounded px-4 py-2 text-sm ${
              active === c.key
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((entry) => (
          <div key={entry.id} className="rounded-lg bg-gray-900 p-6">
            {entry.title && <h3 className="mb-3 text-lg font-semibold">{entry.title}</h3>}
            <article className="prose prose-invert max-w-none">
              <Markdown>{entry.content || "暂无内容"}</Markdown>
            </article>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-gray-500">该分类暂无内容</p>}
      </div>
    </div>
  );
}
