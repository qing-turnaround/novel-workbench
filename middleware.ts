import { NextRequest, NextResponse } from "next/server";

const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "novel2026";
const COOKIE_NAME = "novel_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/api/login") {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get(COOKIE_NAME);
  if (authCookie?.value === AUTH_PASSWORD) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
