import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import NavLink from "./nav-link";

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
  return (
    <html lang="zh-CN">
      <body className="flex h-screen bg-gray-950 text-gray-100">
        <nav className="w-52 shrink-0 border-r border-gray-800 bg-gray-900 p-4">
          <h1 className="mb-6 text-lg font-bold text-white">Novel Workbench</h1>
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <NavLink href={l.href}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </body>
    </html>
  );
}
