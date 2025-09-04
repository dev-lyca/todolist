import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedPrefixes = ["/userpage/dashboard", "/userpage/mytasks", "/userpage/task"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (protectedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    try {
      const res = await fetch(`/api/auth/user`, {
        method: "GET",
        headers: {
          cookie: req.headers.get("cookie") || "",
        },
      });

      if (res.status !== 200) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
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
