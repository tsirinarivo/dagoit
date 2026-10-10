import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "dagoit-web",
    time: new Date().toISOString(),
    maintenance: process.env.MAINTENANCE_MODE === "true",
  });
}
