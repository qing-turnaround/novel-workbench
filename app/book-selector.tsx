"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function BookSelector({ books }: { books: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentBook = searchParams.get("book") || (books[0]?.id?.toString() ?? "");

  if (books.length === 0) {
    return <p className="px-2 text-xs" style={{ color: "var(--text-muted)" }}>暂无小说项目</p>;
  }

  return (
    <select
      value={currentBook}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("book", e.target.value);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }}
      className="w-full rounded-md border px-2 py-1.5 text-sm outline-none"
      style={{
        backgroundColor: "var(--bg-page)",
        borderColor: "var(--border-color)",
        color: "var(--text-primary)",
      }}
    >
      {books.map((b: any) => (
        <option key={b.id} value={b.id}>
          {b.title}
        </option>
      ))}
    </select>
  );
}
