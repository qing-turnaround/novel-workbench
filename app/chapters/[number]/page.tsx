import Link from "next/link";
import db, { getBookId } from "@/lib/db";
import ChapterContent from "./chapter-content";

export const dynamic = "force-dynamic";

export default async function ChapterPage({
  params,
  searchParams,
}: {
  params: Promise<{ number: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { number } = await params;
  const sp = await searchParams;
  const bookId = getBookId(sp);
  const num = parseInt(number);

  if (!bookId) return <div className="text-gray-500">暂无小说项目</div>;

  const book = db.prepare("SELECT title FROM book WHERE id = ?").get(bookId) as any;
  const chapter = db.prepare("SELECT * FROM chapters WHERE book_id = ? AND chapter_number = ?").get(bookId, num) as any;
  if (!chapter) return <div className="text-gray-500">章节不存在</div>;

  const total = (db.prepare("SELECT MAX(chapter_number) as max FROM chapters WHERE book_id = ?").get(bookId) as any).max;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0ede4" }}>
      <div className="mx-auto max-w-[800px]">
        <div className="flex items-center justify-between border-b px-6 py-3" style={{ borderColor: "#d9d5cc" }}>
          <Link href={`/chapters?book=${bookId}`} className="flex items-center gap-2 text-sm" style={{ color: "#946a3c" }}>
            <span>&lt;</span>
            <span>{book?.title || "返回"}</span>
          </Link>
        </div>

        <div className="px-6 pt-10 pb-4">
          <h2 className="text-xl font-bold" style={{ color: "#2a2a2a" }}>
            第{chapter.chapter_number}章 {chapter.title}
          </h2>
          <div className="mt-2 text-sm" style={{ color: "#999" }}>
            本章字数：{chapter.word_count}字
          </div>
        </div>

        <div className="px-6 pt-4 pb-16">
          {chapter.content ? (
            <ChapterContent content={chapter.content} />
          ) : (
            <p style={{ color: "#999" }}>章节内容为空</p>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 px-6 pb-16">
          {num > 1 && (
            <Link
              href={`/chapters/${num - 1}?book=${bookId}`}
              className="flex-1 rounded-lg py-3 text-center text-sm transition"
              style={{ backgroundColor: "#e8e4db", color: "#666" }}
            >
              上一章
            </Link>
          )}
          <Link
            href={`/chapters?book=${bookId}`}
            className="rounded-lg px-8 py-3 text-center text-sm transition"
            style={{ backgroundColor: "#e8e4db", color: "#666" }}
          >
            目录
          </Link>
          {num < total && (
            <Link
              href={`/chapters/${num + 1}?book=${bookId}`}
              className="flex-1 rounded-lg py-3 text-center text-sm text-white transition"
              style={{ backgroundColor: "#f54e00" }}
            >
              下一章
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
