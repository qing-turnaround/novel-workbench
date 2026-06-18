"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function StatsCharts({
  stats,
  totals,
}: {
  stats: any[];
  totals: any;
}) {
  const [range, setRange] = useState(30);

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - range);
  const cutoffStr = cutoff.toISOString().slice(0, 10);
  const filtered = stats.filter((s) => s.date >= cutoffStr);

  const avgWords =
    totals.writing_days > 0
      ? Math.round(totals.total_words / totals.writing_days)
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">写作统计</h2>
        <div className="flex gap-2">
          {[7, 30, 90].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded px-3 py-1 text-sm ${
                range === r
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {r}天
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded bg-gray-900 p-4 text-center">
          <div className="text-2xl font-bold">{totals.total_words.toLocaleString()}</div>
          <div className="text-sm text-gray-400">总字数</div>
        </div>
        <div className="rounded bg-gray-900 p-4 text-center">
          <div className="text-2xl font-bold">{totals.writing_days}</div>
          <div className="text-sm text-gray-400">写作天数</div>
        </div>
        <div className="rounded bg-gray-900 p-4 text-center">
          <div className="text-2xl font-bold">{avgWords.toLocaleString()}</div>
          <div className="text-sm text-gray-400">日均字数</div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">每日字数</h3>
        {filtered.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filtered}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                tickFormatter={(v) => v.slice(5)}
              />
              <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#F3F4F6" }}
              />
              <Bar dataKey="words_written" fill="#3B82F6" name="字数" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">暂无写作记录</p>
        )}
      </div>

      <div>
        <h3 className="mb-3 font-semibold">每日章节</h3>
        {filtered.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={filtered}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                tickFormatter={(v) => v.slice(5)}
              />
              <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#F3F4F6" }}
              />
              <Bar dataKey="chapters_written" fill="#10B981" name="章节数" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">暂无写作记录</p>
        )}
      </div>
    </div>
  );
}
