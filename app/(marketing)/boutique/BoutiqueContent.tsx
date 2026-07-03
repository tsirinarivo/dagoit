"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Eye,
  Heart,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  RotateCcw,
} from "lucide-react";
import type { Product, ProductCategory } from "@/lib/constants/products";
import { CATEGORY_LABELS } from "@/lib/constants/products";
import { useCartStore } from "@/lib/stores/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/ui/button";

import { staggerGrid, fadeUp } from "@/lib/animations/variants";

const PAGE_SIZE = 24;

/* ─────────────────────────────────────────────
   Helpers catégories + emojis
   ───────────────────────────────────────────── */

function humanize(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function smartEmoji(slug: string): string {
  const s = slug.toLowerCase();
  const rules: Array<[RegExp, string]> = [
    [/smartphone|telephone|phone|mobile/, "📱"],
    [/audio|casque|ecouteur|son|enceinte|haut.?parleur/, "🎧"],
    [/ordinateur|laptop|pc|informatique/, "💻"],
    [/tablette|tablet|ipad/, "📱"],
    [/montre|watch/, "⌚"],
    [/cable|charg|adaptateur|prise/, "🔌"],
    [/batterie|power.?bank|pile/, "🔋"],
    [/televiseur|tv\b|ecran|monitor|display/, "📺"],
    [/stockage|disque|ssd|hdd|usb|memoire|carte.?memoire/, "💾"],
    [/appareil.?photo|camera|photo/, "📷"],
    [/imprimante|print|encre|toner/, "🖨️"],
    [/clavier|keyboard/, "⌨️"],
    [/souris|mouse/, "🖱️"],
    [/routeur|wifi|reseau|switch|network/, "📶"],
    [/gps|traceur|balise/, "📡"],
    [/alarme|securite|surveillance|camera.?ip/, "🔔"],
    [/console|jeu|gaming/, "🎮"],
    [/lampe|led|eclairage|lumiere/, "💡"],
    [/protection|coque|housse|verre.?trempe/, "🛡️"],
    [/accessoire/, "🔧"],
    [/divers|autres?/, "📦"],
  ];
  for (const [re, emoji] of rules) if (re.test(s)) return emoji;
  return "🏷️";
}

function categoryMeta(id: string): { label: string; emoji: string } {
  if (CATEGORY_LABELS[id]) return CATEGORY_LABELS[id];
  return { label: humanize(id), emoji: smartEmoji(id) };
}

/* ─────────────────────────────────────────────
   ProductCard
   ───────────────────────────────────────────── */

const BADGE_MAP = {
  new: { variant: "new" as const, label: "Nouveau" },
  promo: { variant: "promo" as const, label: "Promo" },
  bestseller: { variant: "bestseller" as const, label: "Best-seller" },
};

const STOCK_MAP = {
  in_stock: { variant: "online" as const, label: "En stock" },
  low_stock: { variant: "warning" as const, label: "Stock limité" },
  out_of_stock: { variant: "offline" as const, label: "Rupture" },
};

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const [wishlist, setWishlist] = useState(false);
  const stockInfo = STOCK_MAP[product.stock];

  return (
    <motion.article
      variants={fadeUp}
      className="group relative flex flex-col rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-cyan-500/30 transition-all duration-300 overflow-hidden hover:shadow-card"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary-800 to-primary-700 flex items-center justify-center overflow-hidden">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-4"
            unoptimized
          />
        ) : (
          <svg viewBox="0 0 200 140" className="h-28 w-auto opacity-20" fill="none">
            <rect x="20" y="20" width="160" height="100" rx="12" stroke="currentColor" strokeWidth="2" />
            <circle cx="100" cy="70" r="25" stroke="currentColor" strokeWidth="2" />
            <path d="M60 40 L100 15 L140 40" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5" role="list" aria-label="Étiquettes produit">
          {product.badges?.map((badge) => (
            <Badge key={badge} variant={BADGE_MAP[badge].variant} role="listitem">
              {BADGE_MAP[badge].label}
            </Badge>
          ))}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
          <Link
            href={`/boutique/${product.slug}`}
            aria-label={`Voir les détails de ${product.name}`}
            className="h-8 w-8 rounded-lg glass flex items-center justify-center text-[var(--text-secondary)] hover:text-cyan-500 transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={() => setWishlist(!wishlist)}
            aria-label={`${wishlist ? "Retirer de" : "Ajouter à"} la liste de souhaits`}
            aria-pressed={wishlist}
            className="h-8 w-8 rounded-lg glass flex items-center justify-center transition-colors"
          >
            <Heart
              className={`h-3.5 w-3.5 ${wishlist ? "fill-current text-red-400" : "text-[var(--text-secondary)] hover:text-red-400"}`}
            />
          </button>
        </div>

        <div className="absolute bottom-3 right-3">
          <Badge variant={stockInfo.variant} dot>
            {stockInfo.label}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-3 p-4">
        <div>
          <p className="text-xs text-[var(--text-tertiary)] font-mono mb-0.5">
            {product.brand}
          </p>
          <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] leading-snug line-clamp-2">
            <Link
              href={`/boutique/${product.slug}`}
              className="hover:text-cyan-400 transition-colors"
            >
              {product.name}
            </Link>
          </h3>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        <div className="flex items-end justify-between gap-3 pt-1">
          <div>
            {product.priceOld && (
              <p className="text-xs text-[var(--text-tertiary)] line-through font-mono">
                {formatPrice(product.priceOld)}
              </p>
            )}
            <p
              className={`font-mono font-bold text-base ${
                product.priceOld ? "text-orange-400" : "text-[var(--text-primary)]"
              }`}
            >
              {formatPrice(product.price)}
            </p>
          </div>
          {product.stock === "out_of_stock" ? (
            <span
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold bg-[var(--bg-tertiary)] border border-[var(--border)] text-[var(--text-tertiary)] cursor-not-allowed"
              aria-label={`${product.name} indisponible`}
            >
              <X className="h-3.5 w-3.5" />
              Indisponible
            </span>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => addItem(product)}
              rightIcon={<ShoppingCart className="h-3.5 w-3.5" />}
              aria-label={`Ajouter ${product.name} au panier`}
            >
              Ajouter
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   Pagination
   ───────────────────────────────────────────── */

function Pagination({
  page,
  totalPages,
  onPick,
}: {
  page: number;
  totalPages: number;
  onPick: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages: Array<number | "…"> = [];
  const push = (n: number | "…") => pages.push(n);
  push(1);
  const from = Math.max(2, page - 1);
  const to = Math.min(totalPages - 1, page + 1);
  if (from > 2) push("…");
  for (let i = from; i <= to; i++) push(i);
  if (to < totalPages - 1) push("…");
  if (totalPages > 1) push(totalPages);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 mt-10">
      <button
        onClick={() => onPick(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Page précédente"
        className="h-9 w-9 flex items-center justify-center rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e-${i}`} className="px-2 text-[var(--text-tertiary)] text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPick(p)}
            aria-current={p === page ? "page" : undefined}
            className={`h-9 min-w-9 px-3 rounded-lg text-xs font-mono transition-colors ${
              p === page
                ? "bg-cyan-500 text-primary-900 font-bold"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {p}
          </button>
        ),
      )}
      <button
        onClick={() => onPick(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Page suivante"
        className="h-9 w-9 flex items-center justify-center rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   Sidebar (contenu partagé desktop + mobile drawer)
   ───────────────────────────────────────────── */

type CategoryEntry = { id: string; count: number; label: string; emoji: string };

type SidebarProps = {
  categories: CategoryEntry[];
  activeCategory: string;
  minPrice: string;
  maxPrice: string;
  stockOnly: boolean;
  brands: Array<{ name: string; count: number }>;
  activeBrands: Set<string>;
  onCategory: (id: string) => void;
  onPrice: (min: string, max: string) => void;
  onStock: (v: boolean) => void;
  onBrand: (name: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
};

function SidebarInner({
  categories,
  activeCategory,
  minPrice,
  maxPrice,
  stockOnly,
  brands,
  activeBrands,
  onCategory,
  onPrice,
  onStock,
  onBrand,
  onReset,
  hasActiveFilters,
}: SidebarProps) {
  const [minDraft, setMinDraft] = useState(minPrice);
  const [maxDraft, setMaxDraft] = useState(maxPrice);
  useEffect(() => setMinDraft(minPrice), [minPrice]);
  useEffect(() => setMaxDraft(maxPrice), [maxPrice]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (minDraft !== minPrice || maxDraft !== maxPrice) onPrice(minDraft, maxDraft);
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minDraft, maxDraft]);

  return (
    <div className="flex flex-col gap-4">
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/5 border border-cyan-500/20 hover:bg-cyan-500/10 transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          Réinitialiser les filtres
        </button>
      )}

      {/* Catégories */}
      <section className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] px-4 pt-4 pb-2">
          Catégories
        </h3>
        <ul className="max-h-80 overflow-y-auto flex flex-col px-2 pb-3">
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <li key={cat.id}>
                <button
                  onClick={() => onCategory(cat.id)}
                  aria-current={active ? "true" : undefined}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors ${
                    active
                      ? "bg-cyan-500/10 text-cyan-300"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span className="shrink-0 text-sm">{cat.emoji}</span>
                  <span className="flex-1 text-left truncate">{cat.label}</span>
                  <span className="text-[10px] opacity-60 font-mono shrink-0">{cat.count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Prix */}
      <section className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
          Prix (Ar)
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Min"
            value={minDraft}
            onChange={(e) => setMinDraft(e.target.value)}
            aria-label="Prix minimum"
            className="w-full h-9 px-3 rounded-lg text-xs bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <span className="text-[var(--text-tertiary)] text-xs">—</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="Max"
            value={maxDraft}
            onChange={(e) => setMaxDraft(e.target.value)}
            aria-label="Prix maximum"
            className="w-full h-9 px-3 rounded-lg text-xs bg-[var(--bg)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </section>

      {/* Stock */}
      <section className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={stockOnly}
            onChange={(e) => onStock(e.target.checked)}
            className="h-4 w-4 accent-cyan-500 cursor-pointer"
          />
          <span className="text-xs text-[var(--text-secondary)]">
            En stock uniquement
          </span>
        </label>
      </section>

      {/* Marques */}
      {brands.length > 0 && (
        <section className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] px-4 pt-4 pb-2">
            Marques
          </h3>
          <ul className="max-h-64 overflow-y-auto flex flex-col px-2 pb-3">
            {brands.map((b) => {
              const checked = activeBrands.has(b.name);
              return (
                <li key={b.name}>
                  <label className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onBrand(b.name)}
                      className="h-3.5 w-3.5 accent-cyan-500 cursor-pointer"
                    />
                    <span className="flex-1 truncate">{b.name}</span>
                    <span className="text-[10px] opacity-60 font-mono shrink-0">{b.count}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main
   ───────────────────────────────────────────── */

export function BoutiqueContent({ products }: { products: Product[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = (searchParams.get("cat") ?? "all") as ProductCategory | "all";
  const search = searchParams.get("q") ?? "";
  const sortBy = (searchParams.get("sort") ?? "relevance") as
    | "relevance"
    | "price-asc"
    | "price-desc";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const stockOnly = searchParams.get("stock") === "in";
  const activeBrands = useMemo(() => {
    const v = searchParams.get("brand");
    return v ? new Set(v.split(",").filter(Boolean)) : new Set<string>();
  }, [searchParams]);

  const [searchDraft, setSearchDraft] = useState(search);
  useEffect(() => setSearchDraft(search), [search]);

  const [mobileOpen, setMobileOpen] = useState(false);

  const updateParams = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(Array.from(searchParams.entries()));
      for (const [k, v] of Object.entries(patch)) {
        if (
          v == null ||
          v === "" ||
          v === "all" ||
          (k === "page" && v === "1") ||
          (k === "sort" && v === "relevance")
        ) {
          next.delete(k);
        } else {
          next.set(k, v);
        }
      }
      const qs = next.toString();
      router.replace(qs ? `?${qs}` : "?", { scroll: false });
    },
    [router, searchParams],
  );

  useEffect(() => {
    if (searchDraft === search) return;
    const t = setTimeout(() => updateParams({ q: searchDraft, page: "1" }), 250);
    return () => clearTimeout(t);
  }, [searchDraft, search, updateParams]);

  const categories = useMemo<CategoryEntry[]>(() => {
    const counts = new Map<string, number>();
    for (const p of products) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    const list = Array.from(counts.entries())
      .map(([id, count]) => ({ id, count, ...categoryMeta(id) }))
      .sort((a, b) => b.count - a.count);
    return [{ id: "all", label: "Tous", emoji: "📦", count: products.length }, ...list];
  }, [products]);

  const brands = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      if (!p.brand) continue;
      counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [products]);

  const minP = parseFloat(minPrice);
  const maxP = parseFloat(maxPrice);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q),
      );
    }
    if (!Number.isNaN(minP)) result = result.filter((p) => p.price >= minP);
    if (!Number.isNaN(maxP)) result = result.filter((p) => p.price <= maxP);
    if (stockOnly) result = result.filter((p) => p.stock !== "out_of_stock");
    if (activeBrands.size > 0) result = result.filter((p) => activeBrands.has(p.brand));
    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [activeCategory, search, sortBy, products, minP, maxP, stockOnly, activeBrands]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE);

  const gridTopRef = useRef<HTMLDivElement>(null);
  function goToPage(p: number) {
    updateParams({ page: String(p) });
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const hasActiveFilters =
    activeCategory !== "all" ||
    !!search.trim() ||
    !!minPrice ||
    !!maxPrice ||
    stockOnly ||
    activeBrands.size > 0;

  const activeFilterCount =
    (activeCategory !== "all" ? 1 : 0) +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0) +
    (stockOnly ? 1 : 0) +
    activeBrands.size;

  function toggleBrand(name: string) {
    const next = new Set(activeBrands);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    const value = next.size > 0 ? Array.from(next).join(",") : null;
    updateParams({ brand: value, page: "1" });
  }

  function resetFilters() {
    router.replace("?", { scroll: false });
    setSearchDraft("");
  }

  const sidebarProps: SidebarProps = {
    categories,
    activeCategory,
    minPrice,
    maxPrice,
    stockOnly,
    brands,
    activeBrands,
    onCategory: (id) => updateParams({ cat: id, page: "1" }),
    onPrice: (min, max) =>
      updateParams({ minPrice: min || null, maxPrice: max || null, page: "1" }),
    onStock: (v) => updateParams({ stock: v ? "in" : null, page: "1" }),
    onBrand: toggleBrand,
    onReset: resetFilters,
    hasActiveFilters,
  };

  // Bloc scroll body quand drawer mobile ouvert
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(11,58,111,0.4) 0%, transparent 60%)",
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-dot opacity-20 pointer-events-none" />

        <div className="container-dago relative text-center">
          <Badge variant="cyan" className="mb-4">
            Boutique en ligne
          </Badge>
          <h1 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] tracking-tight mb-3">
            Équipements GPS
            <br />
            <span className="gradient-text-cyan">& Accessoires Tech</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm">
            Traceurs GPS, routeurs WiFi 4G, montres connectées. Paiement Mvola,
            Orange Money, Airtel Money. Livraison à Antananarivo et en régions.
          </p>
        </div>
      </section>

      {/* ── BARRE STICKY : recherche + tri + bouton filtres mobile ── */}
      <div
        ref={gridTopRef}
        className="sticky top-16 z-30 bg-primary-900/95 backdrop-blur-xl backdrop-saturate-150 border-b border-[var(--border)] py-3"
      >
        <div className="container-dago flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex items-center gap-2 h-9 px-3 rounded-xl text-xs font-medium bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
            aria-label="Ouvrir les filtres"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filtres
            {activeFilterCount > 0 && (
              <span className="h-4 min-w-4 px-1 rounded-full bg-cyan-500 text-primary-900 text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-tertiary)]"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Rechercher un produit, une marque…"
              value={searchDraft}
              onChange={(e) => setSearchDraft(e.target.value)}
              aria-label="Rechercher un produit"
              className="w-full h-9 pl-9 pr-8 rounded-xl text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchDraft && (
              <button
                onClick={() => setSearchDraft("")}
                aria-label="Effacer la recherche"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => updateParams({ sort: e.target.value, page: "1" })}
            aria-label="Trier les produits"
            className="h-9 px-3 rounded-xl text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] focus:outline-none focus:border-cyan-500 transition-colors shrink-0"
          >
            <option value="relevance">Pertinence</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>
      </div>

      {/* ── LAYOUT SIDEBAR + GRILLE ── */}
      <section className="section-py" aria-label={`${filtered.length} produits`}>
        <div className="container-dago flex gap-8">
          {/* Sidebar desktop */}
          <aside
            className="hidden lg:block w-64 shrink-0 self-start sticky top-32"
            aria-label="Filtres"
          >
            <SidebarInner {...sidebarProps} />
          </aside>

          {/* Grille */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[var(--text-tertiary)] mb-6 font-mono">
              {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "all" && (
                <>
                  {" "}
                  dans{" "}
                  <span className="text-[var(--text-primary)]">
                    {categoryMeta(activeCategory).label}
                  </span>
                </>
              )}
              {search && (
                <>
                  {" "}
                  pour &laquo; <span className="text-cyan-400">{search}</span> &raquo;
                </>
              )}
              {totalPages > 1 && (
                <>
                  {" "}
                  · page{" "}
                  <span className="text-[var(--text-primary)]">{clampedPage}</span>/
                  {totalPages}
                </>
              )}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4" aria-hidden>
                  📭
                </p>
                <p className="font-display font-semibold text-[var(--text-primary)] mb-2">
                  Aucun produit trouvé
                </p>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Essayez d'ajuster vos filtres ou de changer de catégorie.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/5 border border-cyan-500/20 hover:bg-cyan-500/10 transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            ) : (
              <>
                <motion.div
                  key={`${activeCategory}-${search}-${sortBy}-${clampedPage}-${minPrice}-${maxPrice}-${stockOnly}-${Array.from(activeBrands).join(",")}`}
                  variants={staggerGrid}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
                  role="list"
                  aria-label="Liste des produits"
                >
                  {pageItems.map((product) => (
                    <div key={product.id} role="listitem">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </motion.div>

                <Pagination page={clampedPage} totalPages={totalPages} onPick={goToPage} />
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── DRAWER MOBILE ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filtres"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 top-0 bottom-0 z-50 w-full max-w-sm flex flex-col bg-[var(--bg-secondary)] border-r border-[var(--border)] shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-cyan-500" />
                  <h2 className="text-sm font-display font-semibold text-[var(--text-primary)]">
                    Filtres
                  </h2>
                  {activeFilterCount > 0 && (
                    <span className="h-5 min-w-5 px-1.5 rounded-full bg-cyan-500 text-primary-900 text-[10px] font-bold flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Fermer les filtres"
                  className="h-8 w-8 flex items-center justify-center rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <SidebarInner {...sidebarProps} />
              </div>
              <div className="border-t border-[var(--border)] p-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Voir les {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── BANNIÈRE INFO LIVRAISON ── */}
      <section className="py-10 bg-primary-950 border-t border-[var(--border)]">
        <div className="container-dago">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            role="list"
            aria-label="Informations de livraison et paiement"
          >
            {[
              {
                icon: "🚚",
                title: "Livraison Antananarivo",
                desc: "Gratuite à partir de 100 000 Ar. Livraison J+1 à Tana.",
              },
              {
                icon: "💳",
                title: "Paiement mobile money",
                desc: "Mvola, Orange Money, Airtel Money. Paiement en boutique aussi disponible.",
              },
              {
                icon: "🛠️",
                title: "Installation incluse",
                desc: "Pour les traceurs GPS, installation par nos techniciens (25 000 Ar).",
              },
            ].map((item) => (
              <div
                key={item.title}
                role="listitem"
                className="flex items-start gap-4 p-5 rounded-2xl glass border border-[var(--border)]"
              >
                <span className="text-2xl" role="img" aria-hidden>
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
