import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedPrefixes = ["/userpage/dashboard", "/userpage/mytasks", "/userpage/task"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (protectedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    const sessionCookie = req.cookies.get("connect.sid");

    if (!sessionCookie) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/userpage/dashboard/:path*",
    "/userpage/mytasks/:path*",
    "/userpage/task/:path*",
  ],
};
