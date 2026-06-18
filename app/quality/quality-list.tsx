"use client";

import { useState } from "react";

const severityColors: Record<string, string> = {
  error: "bg-red-900 text-red-300",
  warning: "bg-yellow-900 text-yellow-300",
  info: "bg-blue-900 text-blue-300",
};

const typeLabels: Record<string, string> = {
  consistency: "一致性",
  pacing: "节奏",
  foreshadowing: "伏笔",
  "anti-ai": "反AI味",
  "character-arc": "角色弧线",
};

export default function QualityList({
  audits,
  summary,
}: {
  audits: any[];
  summary: any;
}) {
  const [filterType, setFilterType] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");

  const filtered = audits.filter((a) => {
    if (filterType && a.audit_type !== filterType) return false;
    if (filterSeverity && a.severity !== filterSeverity) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">质量审计</h2>

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded bg-gray-900 p-4 text-center">
          <div className="text-2xl font-bold">{summary.total}</div>
          <div className="text-sm text-gray-400">总发现</div>
        </div>
        <div className="rounded bg-red-950 p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{summary.errors}</div>
          <div className="text-sm text-red-600">错误</div>
        </div>
        <div className="rounded bg-yellow-950 p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{summary.warnings}</div>
          <div className="text-sm text-yellow-600">警告</div>
        </div>
        <div className="rounded bg-green-950 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {summary.total - summary.unresolved}
          </div>
          <div className="text-sm text-green-600">已修复</div>
        </div>
      </div>

      <div className="flex gap-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded bg-gray-800 px-3 py-2 text-sm text-gray-300"
        >
          <option value="">所有类型</option>
          {Object.entries(typeLabels).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="rounded bg-gray-800 px-3 py-2 text-sm text-gray-300"
        >
          <option value="">所有级别</option>
          <option value="error">错误</option>
          <option value="warning">警告</option>
          <option value="info">提示</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((a) => (
          <div
            key={a.id}
            className={`rounded-lg p-4 ${a.resolved ? "bg-gray-900 opacity-60" : "bg-gray-900"}`}
          >
            <div className="flex items-start gap-3">
              <span className={`shrink-0 rounded px-2 py-0.5 text-xs ${severityColors[a.severity] || ""}`}>
                {a.severity}
              </span>
              <span className="shrink-0 rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-400">
                {typeLabels[a.audit_type] || a.audit_type}
              </span>
              {a.chapter_number && (
                <span className="shrink-0 text-xs text-gray-500">第{a.chapter_number}章</span>
              )}
              {a.resolved === 1 && (
                <span className="shrink-0 rounded bg-green-900 px-2 py-0.5 text-xs text-green-400">已修复</span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-300">{a.description}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-gray-500">暂无审计记录</p>}
      </div>
    </div>
  );
}
