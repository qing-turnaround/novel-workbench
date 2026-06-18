"use client";

import { useState } from "react";

const priorityColors: Record<string, string> = {
  urgent: "border-red-500 bg-red-950",
  normal: "border-yellow-600 bg-yellow-950",
  minor: "border-gray-600 bg-gray-900",
};

export default function ForeshadowingList({ items }: { items: any[] }) {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);
  const planted = items.filter((i) => i.status === "planted");
  const resolved = items.filter((i) => i.status === "resolved");
  const abandoned = items.filter((i) => i.status === "abandoned");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">伏笔追踪</h2>
        <div className="flex gap-2">
          {[
            { key: "all", label: "全部" },
            { key: "planted", label: "未兑现" },
            { key: "resolved", label: "已兑现" },
            { key: "abandoned", label: "已放弃" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded px-3 py-1 text-sm ${
                filter === f.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="rounded bg-yellow-950 p-3">
          <div className="text-2xl font-bold text-yellow-400">{planted.length}</div>
          <div className="text-sm text-yellow-600">未兑现</div>
        </div>
        <div className="rounded bg-green-950 p-3">
          <div className="text-2xl font-bold text-green-400">{resolved.length}</div>
          <div className="text-sm text-green-600">已兑现</div>
        </div>
        <div className="rounded bg-gray-900 p-3">
          <div className="text-2xl font-bold text-gray-400">{abandoned.length}</div>
          <div className="text-sm text-gray-600">已放弃</div>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`rounded border-l-4 p-4 ${priorityColors[item.priority] || priorityColors.normal}`}
          >
            <div className="flex items-start justify-between">
              <p className="font-medium">{item.description}</p>
              <span
                className={`ml-3 shrink-0 rounded px-2 py-0.5 text-xs ${
                  item.status === "planted"
                    ? "bg-yellow-800 text-yellow-300"
                    : item.status === "resolved"
                      ? "bg-green-800 text-green-300"
                      : "bg-gray-700 text-gray-400"
                }`}
              >
                {item.status}
              </span>
            </div>
            <div className="mt-2 flex gap-4 text-sm text-gray-400">
              <span>埋下：第{item.planted_chapter}章</span>
              {item.resolved_chapter && <span>兑现：第{item.resolved_chapter}章</span>}
              <span>优先级：{item.priority}</span>
            </div>
            {item.notes && <p className="mt-2 text-sm text-gray-500">{item.notes}</p>}
          </div>
        ))}
        {filtered.length === 0 && <p className="text-gray-500">暂无伏笔记录</p>}
      </div>
    </div>
  );
}
