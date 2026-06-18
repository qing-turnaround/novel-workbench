import { useEffect, useState } from "react";
import { api, type Foreshadowing } from "../lib/api";

export default function ForeshadowingBoard() {
  const [items, setItems] = useState<Foreshadowing[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [error, setError] = useState("");

  useEffect(() => {
    const status = filter === "all" ? undefined : filter;
    api.getForeshadowing(status).then(setItems).catch((e) => setError(e.message));
  }, [filter]);

  if (error) return <div className="text-red-400">Error: {error}</div>;

  const planted = items.filter((i) => i.status === "planted");
  const resolved = items.filter((i) => i.status === "resolved");
  const abandoned = items.filter((i) => i.status === "abandoned");

  const priorityColors: Record<string, string> = {
    urgent: "border-red-500 bg-red-950",
    normal: "border-yellow-600 bg-yellow-950",
    minor: "border-gray-600 bg-gray-900",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">伏笔追踪</h2>
        <div className="flex gap-2">
          {["all", "planted", "resolved", "abandoned"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded px-3 py-1 text-sm ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {f === "all" ? "全部" : f === "planted" ? "未兑现" : f === "resolved" ? "已兑现" : "已放弃"}
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
        {items.map((item) => (
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
              {item.resolved_chapter && (
                <span>兑现：第{item.resolved_chapter}章</span>
              )}
              <span>优先级：{item.priority}</span>
            </div>
            {item.notes && (
              <p className="mt-2 text-sm text-gray-500">{item.notes}</p>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-gray-500">暂无伏笔记录</p>
        )}
      </div>
    </div>
  );
}
