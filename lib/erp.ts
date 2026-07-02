import "server-only";
import type { Product, ProductCategory } from "@/lib/constants/products";
import { PRODUCTS } from "@/lib/constants/products";
import { PRODUCT_OVERRIDES } from "@/lib/constants/product-overrides";

export type ErpProduct = {
  sku: string;
  name: string;
  description: string | null;
  brand: string | null;
  category: string | null;
  imageUrl: string | null;
  sellingPrice: number;
  taxRate: number;
  stock: number;
  barcode: string | null;
};

type ErpInventoryResponse = { data: ErpProduct[] };

export type CreateOrderInput = {
  externalId: string;
  customer?: { name: string; phone: string; email?: string };
  items: Array<{ sku: string; quantity: number }>;
  notes?: string;
};

export type ErpOrderOk = {
  ok: true;
  reference: string;
  total: number;
  duplicate?: boolean;
};
export type ErpOrderErr = { ok: false; status: number; error: string };
export type ErpOrderResponse = ErpOrderOk | ErpOrderErr;

function baseUrl() {
  const v = process.env.ERP_API_BASE;
  if (!v) throw new Error("ERP_API_BASE not configured");
  return v.replace(/\/$/, "");
}
function token() {
  const v = process.env.ERP_API_TOKEN;
  if (!v) throw new Error("ERP_API_TOKEN not configured");
  return v;
}

const CATEGORY_MAP: Record<string, ProductCategory> = {
  "traceurs-gps": "traceurs-gps",
  "gps": "traceurs-gps",
  "traceur-gps": "traceurs-gps",
  "routeurs-wifi": "routeurs-wifi",
  "routeur-wifi": "routeurs-wifi",
  "wifi": "routeurs-wifi",
  "montres-connectees": "montres-connectees",
  "montres": "montres-connectees",
  "montre": "montres-connectees",
  "alarmes": "alarmes",
  "alarme": "alarmes",
  "accessoires": "accessoires",
  "accessoire": "accessoires",
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function toProduct(e: ErpProduct): Product {
  const catKey = (e.category ?? "").toLowerCase().trim();
  const category = CATEGORY_MAP[catKey] ?? "accessoires";
  const desc = e.description ?? "";
  const base: Product = {
    id: e.sku,
    slug: slugify(`${e.name}-${e.sku}`),
    name: e.name,
    brand: e.brand ?? "DAGO IT",
    category,
    price: e.sellingPrice,
    stock: e.stock > 5 ? "in_stock" : e.stock > 0 ? "low_stock" : "out_of_stock",
    images: e.imageUrl ? [e.imageUrl] : [],
    shortDescription: desc.length > 140 ? desc.slice(0, 137) + "…" : desc,
    description: desc,
    specs: {},
  };
  const overrides = PRODUCT_OVERRIDES[e.sku];
  if (!overrides) return base;
  return {
    ...base,
    ...overrides,
    specs: { ...base.specs, ...(overrides.specs ?? {}) },
    images: overrides.images?.length ? overrides.images : base.images,
  };
}

export async function getCatalog(): Promise<Product[]> {
  // Kill switch : ERP_CATALOG_ENABLED=false → on affiche uniquement les 5 produits curatés.
  if (process.env.ERP_CATALOG_ENABLED !== "true") {
    return PRODUCTS;
  }
  try {
    const res = await fetch(`${baseUrl()}/api/v1/inventory`, {
      headers: { Authorization: `Bearer ${token()}` },
      next: { revalidate: 120 },
    });
    if (!res.ok) {
      console.error("[erp] getCatalog failed", res.status, await res.text().catch(() => ""));
      return PRODUCTS;
    }
    const json = (await res.json()) as ErpInventoryResponse;
    const items = (json.data ?? []).map(toProduct);
    return items.length ? items : PRODUCTS;
  } catch (err) {
    console.error("[erp] getCatalog exception", err);
    return PRODUCTS;
  }
}

export async function getProductBySlugFromCatalog(slug: string): Promise<Product | undefined> {
  const products = await getCatalog();
  return products.find((p) => p.slug === slug);
}

export async function createErpOrder(input: CreateOrderInput): Promise<ErpOrderResponse> {
  try {
    const res = await fetch(`${baseUrl()}/api/v1/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
      cache: "no-store",
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) {
      const error =
        (body && (body.error || body.message)) || `ERP responded with ${res.status}`;
      return { ok: false, status: res.status, error: String(error) };
    }
    return {
      ok: true,
      reference: String(body.reference),
      total: Number(body.total),
      duplicate: !!body.duplicate,
    };
  } catch (err) {
    return {
      ok: false,
      status: 502,
      error: err instanceof Error ? err.message : "ERP unreachable",
    };
  }
}
