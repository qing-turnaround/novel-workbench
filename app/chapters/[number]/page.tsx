import Link from "next/link";
import db from "@/lib/db";
import ChapterContent from "./chapter-content";

export const dynamic = "force-dynamic";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const num = parseInt(number);

  const chapter = db.prepare("SELECT * FROM chapters WHERE chapter_number = ?").get(num) as any;
  if (!chapter) {
    return <div className="text-gray-500">章节不存在</div>;
  }

  const total = (db.prepare("SELECT MAX(chapter_number) as max FROM chapters").get() as any).max;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 border-b border-gray-800 pb-4">
        <h2 className="text-xl font-bold">
          第{chapter.chapter_number}章 {chapter.title}
        </h2>
        <div className="mt-1 text-sm text-gray-500">
          {chapter.word_count}字 &middot; {chapter.status}
          {chapter.updated_at && ` · ${chapter.updated_at}`}
        </div>
      </div>

      {chapter.content ? (
        <ChapterContent content={chapter.content} />
      ) : (
        <p className="text-gray-500">章节内容为空（可能尚未写作）</p>
      )}

      {chapter.summary && (
        <div className="mt-8 rounded bg-gray-900 p-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-400">章节摘要</h3>
          <p className="text-sm text-gray-300">{chapter.summary}</p>
        </div>
      )}

      <div className="mt-8 flex gap-4">
        {num > 1 && (
          <Link
            href={`/chapters/${num - 1}`}
            className="rounded bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700"
          >
            上一章
          </Link>
        )}
        <Link
          href="/chapters"
          className="rounded bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700"
        >
          目录
        </Link>
        {num < total && (
          <Link
            href={`/chapters/${num + 1}`}
            className="rounded bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700"
          >
            下一章
          </Link>
        )}
      </div>
    </div>
  );
}
