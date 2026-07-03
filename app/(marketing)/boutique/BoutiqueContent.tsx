"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Eye, Heart, ChevronDown, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/constants/products";
import { CATEGORY_LABELS } from "@/lib/constants/products";
import { useCartStore } from "@/lib/stores/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/ui/button";

import { staggerGrid, fadeUp } from "@/lib/animations/variants";

const PAGE_SIZE = 24;
const TOP_CATEGORIES = 6;

function humanize(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Détection d'emoji par mot-clé sur le nom de catégorie (fallback : 🏷️). */
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

        {product.compatible && (
          <div className="flex flex-wrap gap-1">
            {product.compatible.slice(0, 2).map((op) => (
              <span
                key={op}
                className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] font-mono"
              >
                {op}
              </span>
            ))}
          </div>
        )}

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
          <Button
            variant="primary"
            size="sm"
            disabled={product.stock === "out_of_stock"}
            onClick={() => addItem(product)}
            rightIcon={<ShoppingCart className="h-3.5 w-3.5" />}
            aria-label={`Ajouter ${product.name} au panier`}
          >
            {product.stock === "out_of_stock" ? "Indisponible" : "Ajouter"}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

type CategoryEntry = { id: string; count: number; label: string; emoji: string };

function CategoryDropdown({
  categories,
  active,
  onPick,
}: {
  categories: CategoryEntry[];
  active: string;
  onPick: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activeCat = categories.find((c) => c.id === active);
  const isHidden = activeCat && active !== "all" && !categories.slice(0, TOP_CATEGORIES + 1).find((c) => c.id === active);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
          isHidden
            ? "bg-cyan-500 text-primary-900"
            : "bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]"
        }`}
      >
        {isHidden ? (
          <>
            <span>{activeCat!.emoji}</span>
            {activeCat!.label}
          </>
        ) : (
          <>Plus de catégories</>
        )}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-[min(90vw,560px)] max-h-[60vh] overflow-y-auto rounded-2xl bg-primary-900/98 backdrop-blur-xl border border-[var(--border)] shadow-2xl p-3 z-40"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="menuitem"
                onClick={() => {
                  onPick(cat.id);
                  setOpen(false);
                }}
                aria-current={active === cat.id ? "true" : undefined}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-left transition-colors ${
                  active === cat.id
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span className="shrink-0">{cat.emoji}</span>
                <span className="flex-1 truncate">{cat.label}</span>
                <span className="text-[10px] opacity-60 font-mono shrink-0">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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

  // Fenêtre : 1 … p-1 p p+1 … totalPages
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

  // Debounce local pour la recherche (évite un push URL à chaque frappe)
  const [searchDraft, setSearchDraft] = useState(search);
  useEffect(() => setSearchDraft(search), [search]);

  const updateParams = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(Array.from(searchParams.entries()));
      for (const [k, v] of Object.entries(patch)) {
        if (v == null || v === "" || v === "all" || (k === "page" && v === "1") || (k === "sort" && v === "relevance")) {
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

  const topCategories = categories.slice(0, TOP_CATEGORIES + 1);
  const restCategories = categories.slice(TOP_CATEGORIES + 1);

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
    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [activeCategory, search, sortBy, products]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE);

  const gridTopRef = useRef<HTMLDivElement>(null);
  function goToPage(p: number) {
    updateParams({ page: String(p) });
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <section className="relative pt-24 pb-10 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(11,58,111,0.4) 0%, transparent 60%)",
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-dot opacity-20 pointer-events-none" />

        <div className="container-dago relative text-center">
          <Badge variant="cyan" className="mb-4">
            Boutique en ligne
          </Badge>
          <h1 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] tracking-tight mb-4">
            Équipements GPS
            <br />
            <span className="gradient-text-cyan">& Accessoires Tech</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-8">
            Traceurs GPS, routeurs WiFi 4G, montres connectées. Paiement Mvola,
            Orange Money, Airtel Money. Livraison à Antananarivo et en régions.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-2"
            aria-label="Moyens de paiement acceptés"
          >
            {["Mvola", "Orange Money", "Airtel Money", "Carte bancaire", "Livraison COD"].map(
              (m) => (
                <span
                  key={m}
                  className="text-xs px-2.5 py-1 rounded-lg glass border border-[var(--border)] text-[var(--text-tertiary)] font-mono"
                >
                  {m}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <div ref={gridTopRef} className="sticky top-16 z-30 bg-primary-900/95 backdrop-blur-xl backdrop-saturate-150 border-b border-[var(--border)] py-3">
        <div className="container-dago">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <nav
              aria-label="Filtrer par catégorie"
              className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide flex-1"
            >
              {topCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => updateParams({ cat: cat.id, page: "1" })}
                  aria-pressed={activeCategory === cat.id}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                    activeCategory === cat.id
                      ? "bg-cyan-500 text-primary-900"
                      : "bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]"
                  }`}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                  <span className="ml-1 text-[10px] opacity-60 font-mono">{cat.count}</span>
                </button>
              ))}
              {restCategories.length > 0 && (
                <CategoryDropdown
                  categories={categories}
                  active={activeCategory}
                  onPick={(id) => updateParams({ cat: id, page: "1" })}
                />
              )}
            </nav>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-52">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-tertiary)]" aria-hidden />
                <input
                  type="search"
                  placeholder="Rechercher..."
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
                className="h-9 px-3 rounded-xl text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="relevance">Pertinence</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <section className="section-py" aria-label={`${filtered.length} produit${filtered.length !== 1 ? "s" : ""}`}>
        <div className="container-dago">
          <p className="text-sm text-[var(--text-tertiary)] mb-6 font-mono">
            {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "all" && (
              <> dans <span className="text-[var(--text-primary)]">{categoryMeta(activeCategory).label}</span></>
            )}
            {search && (
              <> pour &laquo; <span className="text-cyan-400">{search}</span> &raquo;</>
            )}
            {totalPages > 1 && (
              <> · page <span className="text-[var(--text-primary)]">{clampedPage}</span>/{totalPages}</>
            )}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4" aria-hidden>📭</p>
              <p className="font-display font-semibold text-[var(--text-primary)] mb-2">
                Aucun produit trouvé
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                Essayez une autre catégorie ou contactez-nous pour des produits sur commande.
              </p>
            </div>
          ) : (
            <>
              <motion.div
                key={`${activeCategory}-${search}-${sortBy}-${clampedPage}`}
                variants={staggerGrid}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
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
      </section>

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
