"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      setError("密码错误");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="w-80 rounded-lg bg-gray-900 p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-xl font-bold text-white">
          Novel Workbench
        </h1>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          placeholder="请输入密码"
          className="w-full rounded bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
          autoFocus
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          className="mt-4 w-full rounded bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-500"
        >
          进入
        </button>
      </form>
    </div>
  );
}
