"use client";

export type SubmitOrderInput = {
  externalId: string;
  customer?: { name: string; phone: string; email?: string };
  items: Array<{ sku: string; quantity: number }>;
  notes?: string;
};

export type SubmitOrderResult =
  | { ok: true; reference: string; total: number; duplicate?: boolean }
  | { ok: false; error: string };

export async function submitOrder(input: SubmitOrderInput): Promise<SubmitOrderResult> {
  try {
    const res = await fetch("/api/erp/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.ok) {
      return { ok: false, error: json?.error || `HTTP ${res.status}` };
    }
    return { ok: true, reference: json.reference, total: json.total, duplicate: !!json.duplicate };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "network_error" };
  }
}

export function newExternalId() {
  const now = new Date();
  const stamp =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    "-" +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0");
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `WEB-${stamp}-${rnd}`;
}
