import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MAINTENANCE_ALLOWLIST = [
  "/api/health",
  "/maintenance",
  "/favicon.ico",
  "/opengraph-image",
];

export function middleware(req: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;

  // Laisser passer les assets statiques Next et notre allowlist
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/fonts/") ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/textures/") ||
    MAINTENANCE_ALLOWLIST.some((p) => pathname === p || pathname.startsWith(p + "/"))
  ) {
    return NextResponse.next();
  }

  // Rewrite vers /maintenance, status 503 (SEO-safe)
  const url = req.nextUrl.clone();
  url.pathname = "/maintenance";
  const res = NextResponse.rewrite(url, { status: 503 });
  res.headers.set("Retry-After", "3600");
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
