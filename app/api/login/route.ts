import { NextRequest, NextResponse } from "next/server";

const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "novel2026";
const COOKIE_NAME = "novel_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (password !== AUTH_PASSWORD) {
    return NextResponse.json({ error: "wrong password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, AUTH_PASSWORD, {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
