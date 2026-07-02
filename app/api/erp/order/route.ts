import { NextResponse } from "next/server";
import { createErpOrder, type CreateOrderInput } from "@/lib/erp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = Partial<{
  externalId: unknown;
  customer: unknown;
  items: unknown;
  notes: unknown;
}>;

function bad(msg: string, status = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status });
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return bad("invalid_json");
  }

  if (typeof body.externalId !== "string" || body.externalId.trim().length === 0) {
    return bad("externalId required (string)");
  }
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return bad("items required (non-empty array)");
  }

  const items: CreateOrderInput["items"] = [];
  for (const raw of body.items) {
    const it = raw as { sku?: unknown; quantity?: unknown };
    if (typeof it.sku !== "string" || !it.sku.trim()) return bad("item.sku must be a non-empty string");
    if (typeof it.quantity !== "number" || !Number.isFinite(it.quantity) || it.quantity < 1) {
      return bad("item.quantity must be a positive number");
    }
    items.push({ sku: it.sku, quantity: Math.floor(it.quantity) });
  }

  let customer: CreateOrderInput["customer"] | undefined;
  if (body.customer && typeof body.customer === "object") {
    const c = body.customer as { name?: unknown; phone?: unknown; email?: unknown };
    if (typeof c.name === "string" && typeof c.phone === "string" && c.name && c.phone) {
      customer = {
        name: c.name,
        phone: c.phone,
        email: typeof c.email === "string" && c.email ? c.email : undefined,
      };
    }
  }

  const result = await createErpOrder({
    externalId: body.externalId.trim(),
    customer,
    items,
    notes: typeof body.notes === "string" ? body.notes : undefined,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.status || 400 });
  }
  return NextResponse.json(result, { status: 201 });
}
