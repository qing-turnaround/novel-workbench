"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function BookSelector({ books }: { books: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentBook = searchParams.get("book") || (books[0]?.id?.toString() ?? "");

  if (books.length === 0) {
    return <p className="text-xs text-gray-500">暂无小说项目</p>;
  }

  return (
    <select
      value={currentBook}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("book", e.target.value);
        router.push(`${pathname}?${params.toString()}`);
      }}
      className="w-full rounded bg-gray-800 px-2 py-1.5 text-sm text-gray-300 outline-none"
    >
      {books.map((b: any) => (
        <option key={b.id} value={b.id}>
          {b.title}
        </option>
      ))}
    </select>
  );
}
