import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Markdown from "react-markdown";
import { api, type Chapter } from "../lib/api";

export default function ChapterReader() {
  const { number } = useParams();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [current, setCurrent] = useState<Chapter | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getChapters().then(setChapters).catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    if (number) {
      api
        .getChapter(parseInt(number))
        .then(setCurrent)
        .catch((e) => setError(e.message));
    } else {
      setCurrent(null);
    }
  }, [number]);

  if (error) return <div className="text-red-400">Error: {error}</div>;

  return (
    <div className="flex gap-6">
      <div className="w-56 shrink-0 space-y-1">
        <h3 className="mb-3 text-lg font-semibold">章节列表</h3>
        {chapters.map((c) => (
          <Link
            key={c.chapter_number}
            to={`/chapters/${c.chapter_number}`}
            className={`block rounded px-3 py-1.5 text-sm transition ${
              Number(number) === c.chapter_number
                ? "bg-blue-600 text-white"
                : c.status === "planned"
                  ? "text-gray-600"
                  : "text-gray-400 hover:bg-gray-800"
            }`}
          >
            第{c.chapter_number}章{" "}
            <span className="text-xs">{c.title || ""}</span>
          </Link>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        {current ? (
          <div>
            <div className="mb-4 border-b border-gray-800 pb-4">
              <h2 className="text-xl font-bold">
                第{current.chapter_number}章 {current.title}
              </h2>
              <div className="mt-1 text-sm text-gray-500">
                {current.word_count}字 &middot; {current.status}
                {current.updated_at && ` &middot; ${current.updated_at}`}
              </div>
            </div>
            {current.content ? (
              <article className="prose prose-invert max-w-none leading-8">
                <Markdown>{current.content}</Markdown>
              </article>
            ) : (
              <p className="text-gray-500">章节内容为空（可能尚未写作）</p>
            )}
            <div className="mt-8 flex gap-4">
              {current.chapter_number > 1 && (
                <Link
                  to={`/chapters/${current.chapter_number - 1}`}
                  className="rounded bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700"
                >
                  上一章
                </Link>
              )}
              <Link
                to={`/chapters/${current.chapter_number + 1}`}
                className="rounded bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700"
              >
                下一章
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">从左侧选择章节开始阅读</p>
        )}
      </div>
    </div>
  );
}
