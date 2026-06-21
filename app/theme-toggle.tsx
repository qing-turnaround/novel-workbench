"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = document.cookie.match(/theme=(dark|light)/);
    if (saved && saved[1] === "dark") {
      setDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.cookie = "theme=dark;path=/;max-age=31536000";
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.cookie = "theme=light;path=/;max-age=31536000";
    }
  }

  return (
    <button
      onClick={toggle}
      className="w-full rounded-md px-3 py-2 text-left text-sm transition-colors"
      style={{
        color: "var(--text-secondary)",
        backgroundColor: "transparent",
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--bg-sidebar-hover)"}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
    >
      {dark ? "☀ 日间" : "☾ 夜间"}
    </button>
  );
}
