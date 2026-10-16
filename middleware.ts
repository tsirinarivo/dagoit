import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MAINTENANCE_ALLOWLIST = [
  "/api/health",
  "/maintenance",
  "/favicon.ico",
  "/opengraph-image",
];

// Routes bloquées quand BOUTIQUE_ENABLED=false
const BOUTIQUE_ROUTES = ["/boutique", "/checkout", "/api/erp"];

function isAssetOrAllowed(pathname: string) {
  return (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/fonts/") ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/textures/") ||
    MAINTENANCE_ALLOWLIST.some((p) => pathname === p || pathname.startsWith(p + "/"))
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Maintenance globale — tout bloqué sauf health et assets
  if (process.env.MAINTENANCE_MODE === "true") {
    if (isAssetOrAllowed(pathname)) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = "/maintenance";
    const res = NextResponse.rewrite(url, { status: 503 });
    res.headers.set("Retry-After", "3600");
    res.headers.set("Cache-Control", "no-store");
    return res;
  }

  // 2. Boutique désactivée — redirection vers l'accueil
  if (process.env.NEXT_PUBLIC_BOUTIQUE_ENABLED === "false") {
    const isBoutique = BOUTIQUE_ROUTES.some(
      (p) => pathname === p || pathname.startsWith(p + "/"),
    );
    if (isBoutique) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url, { status: 307 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
