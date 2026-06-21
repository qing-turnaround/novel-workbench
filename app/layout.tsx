import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import NavLink from "./nav-link";
import BookSelector from "./book-selector";
import ThemeToggle from "./theme-toggle";
import db from "@/lib/db";

export const metadata: Metadata = {
  title: "Novel Workbench",
};

const links = [
  { href: "/", label: "仪表板" },
  { href: "/chapters", label: "章节阅读" },
  { href: "/characters", label: "角色图谱" },
  { href: "/foreshadowing", label: "伏笔追踪" },
  { href: "/worldbuilding", label: "世界观" },
  { href: "/quality", label: "质量审计" },
  { href: "/stats", label: "写作统计" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const books = db
    .prepare("SELECT id, title, genre, status, dir_name FROM book ORDER BY updated_at DESC")
    .all() as any[];

  return (
    <html lang="zh-CN">
      <body>
        <nav
          className="fixed left-0 top-0 z-50 h-full w-48 overflow-y-auto border-r px-3 py-5"
          style={{ backgroundColor: "var(--bg-sidebar)", borderColor: "var(--border-color)" }}
        >
          <h1 className="mb-4 px-2 text-base font-bold" style={{ color: "var(--text-primary)" }}>
            Novel Workbench
          </h1>
          <Suspense><BookSelector books={books} /></Suspense>
          <ul className="mt-3 space-y-0.5">
            {links.map((l) => (
              <li key={l.href}>
                <NavLink href={l.href}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-3" style={{ borderColor: "var(--border-color)" }}>
            <ThemeToggle />
          </div>
        </nav>
        <main className="ml-48 min-h-screen p-6">{children}</main>
      </body>
    </html>
  );
}
