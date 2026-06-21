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

  if (!bookId) return <div style={{ color: "var(--text-muted)" }}>暂无小说项目</div>;

  const book = db.prepare("SELECT title FROM book WHERE id = ?").get(bookId) as any;
  const chapter = db.prepare("SELECT * FROM chapters WHERE book_id = ? AND chapter_number = ?").get(bookId, num) as any;
  if (!chapter) return <div style={{ color: "var(--text-muted)" }}>章节不存在</div>;

  const total = (db.prepare("SELECT MAX(chapter_number) as max FROM chapters WHERE book_id = ?").get(bookId) as any).max;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-reading)" }}>
      <div className="mx-auto max-w-[800px]">
        <div className="flex items-center justify-between border-b px-6 py-3" style={{ borderColor: "var(--chapter-top-border)" }}>
          <Link href={`/chapters?book=${bookId}`} className="flex items-center gap-2 text-sm" style={{ color: "var(--accent)" }}>
            <span>&lt;</span>
            <span>{book?.title || "返回"}</span>
          </Link>
        </div>

        <div className="px-6 pt-10 pb-4">
          <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            第{chapter.chapter_number}章 {chapter.title}
          </h2>
          <div className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            本章字数：{chapter.word_count}字
          </div>
        </div>

        <div className="px-6 pt-4 pb-16">
          {chapter.content ? (
            <ChapterContent content={chapter.content} />
          ) : (
            <p style={{ color: "var(--text-muted)" }}>章节内容为空</p>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 px-6 pb-16">
          {num > 1 && (
            <Link
              href={`/chapters/${num - 1}?book=${bookId}`}
              className="flex-1 rounded-lg py-3 text-center text-sm transition"
              style={{ backgroundColor: "var(--btn-secondary-bg)", color: "var(--btn-secondary-text)" }}
            >
              上一章
            </Link>
          )}
          <Link
            href={`/chapters?book=${bookId}`}
            className="rounded-lg px-8 py-3 text-center text-sm transition"
            style={{ backgroundColor: "var(--btn-secondary-bg)", color: "var(--btn-secondary-text)" }}
          >
            目录
          </Link>
          {num < total && (
            <Link
              href={`/chapters/${num + 1}?book=${bookId}`}
              className="flex-1 rounded-lg py-3 text-center text-sm text-white transition"
              style={{ backgroundColor: "var(--accent)" }}
            >
              下一章
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
