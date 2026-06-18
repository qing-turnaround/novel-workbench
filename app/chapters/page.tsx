import Link from "next/link";
import db, { getBookId } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ChapterList({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const bookId = getBookId(params);
  if (!bookId) return <div className="text-gray-500">暂无小说项目</div>;

  const chapters = db.prepare(
    "SELECT id, chapter_number, title, volume_id, word_count, status FROM chapters WHERE book_id = ? ORDER BY chapter_number"
  ).all(bookId) as any[];

  const volumes = db.prepare("SELECT * FROM volumes WHERE book_id = ? ORDER BY volume_number").all(bookId) as any[];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">章节阅读</h2>

      {volumes.length > 0 ? (
        volumes.map((vol: any) => {
          const volChapters = chapters.filter((c) => c.volume_id === vol.id);
          return (
            <div key={vol.id}>
              <h3 className="mb-2 text-lg font-semibold text-gray-300">
                第{vol.volume_number}卷 {vol.title || ""}
              </h3>
              <div className="space-y-1">
                {volChapters.map((c: any) => (
                  <Link
                    key={c.chapter_number}
                    href={`/chapters/${c.chapter_number}?book=${bookId}`}
                    className={`flex items-center justify-between rounded px-4 py-2 text-sm transition ${
                      c.status === "planned"
                        ? "text-gray-600"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <span>第{c.chapter_number}章 {c.title || ""}</span>
                    <span className="flex gap-3 text-xs text-gray-500">
                      {c.word_count > 0 && <span>{c.word_count}字</span>}
                      <span>{c.status}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="space-y-1">
          {chapters.map((c: any) => (
            <Link
              key={c.chapter_number}
              href={`/chapters/${c.chapter_number}?book=${bookId}`}
              className="flex items-center justify-between rounded px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-800"
            >
              <span>第{c.chapter_number}章 {c.title || ""}</span>
              <span className="text-xs text-gray-500">{c.word_count}字</span>
            </Link>
          ))}
        </div>
      )}

      {chapters.length === 0 && <p className="text-gray-500">暂无章节</p>}
    </div>
  );
}
