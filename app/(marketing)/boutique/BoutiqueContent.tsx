"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Eye, Heart } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/constants/products";
import { useCartStore } from "@/lib/stores/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/ui/button";

import { staggerGrid, fadeUp } from "@/lib/animations/variants";

const CATEGORIES: Array<{ id: ProductCategory | "all"; label: string; emoji: string }> = [
  { id: "all", label: "Tous", emoji: "📦" },
  { id: "traceurs-gps", label: "Traceurs GPS", emoji: "📡" },
  { id: "routeurs-wifi", label: "Routeurs WiFi", emoji: "📶" },
  { id: "montres-connectees", label: "Montres", emoji: "⌚" },
  { id: "alarmes", label: "Alarmes", emoji: "🔔" },
  { id: "accessoires", label: "Accessoires", emoji: "🔧" },
];

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
      {/* Image placeholder stylé */}
      <div className="relative h-48 bg-gradient-to-br from-primary-800 to-primary-700 flex items-center justify-center overflow-hidden">
        {/* Placeholder SVG */}
        <svg viewBox="0 0 200 140" className="h-28 w-auto opacity-20" fill="none">
          <rect x="20" y="20" width="160" height="100" rx="12" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="70" r="25" stroke="currentColor" strokeWidth="2" />
          <path d="M60 40 L100 15 L140 40" stroke="currentColor" strokeWidth="2" />
        </svg>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5" role="list" aria-label="Étiquettes produit">
          {product.badges?.map((badge) => (
            <Badge key={badge} variant={BADGE_MAP[badge].variant} role="listitem">
              {BADGE_MAP[badge].label}
            </Badge>
          ))}
        </div>

        {/* Actions hover */}
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

        {/* Stock badge */}
        <div className="absolute bottom-3 right-3">
          <Badge variant={stockInfo.variant} dot>
            {stockInfo.label}
          </Badge>
        </div>
      </div>

      {/* Infos produit */}
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

        {/* Compatibilité */}
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

        {/* Prix + CTA */}
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

export function BoutiqueContent({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"relevance" | "price-asc" | "price-desc">("relevance");

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
          p.shortDescription.toLowerCase().includes(q)
      );
    }
    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [activeCategory, search, sortBy, products]);

  return (
    <>
      {/* ── HERO ── */}
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

          {/* Moyens de paiement */}
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
              )
            )}
          </div>
        </div>
      </section>

      {/* ── FILTRES ── */}
      <div className="sticky top-16 z-30 bg-primary-900/95 backdrop-blur-xl backdrop-saturate-150 border-b border-[var(--border)] py-3">
        <div className="container-dago">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Catégories */}
            <nav
              aria-label="Filtrer par catégorie"
              className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide flex-1"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={activeCategory === cat.id}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                    activeCategory === cat.id
                      ? "bg-cyan-500 text-primary-900"
                      : "bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]"
                  }`}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Recherche */}
              <div className="relative flex-1 sm:w-52">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-tertiary)]" aria-hidden />
                <input
                  type="search"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Rechercher un produit"
                  className="w-full h-9 pl-9 pr-4 rounded-xl text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Tri */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
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

      {/* ── GRILLE PRODUITS ── */}
      <section className="section-py" aria-label={`${filtered.length} produit${filtered.length !== 1 ? "s" : ""}`}>
        <div className="container-dago">
          {/* Résultats count */}
          <p className="text-sm text-[var(--text-tertiary)] mb-6 font-mono">
            {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "all" && (
              <> dans <span className="text-[var(--text-primary)]">{CATEGORIES.find((c) => c.id === activeCategory)?.label}</span></>
            )}
            {search && (
              <> pour &laquo; <span className="text-cyan-400">{search}</span> &raquo;</>
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
            <motion.div
              variants={staggerGrid}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              role="list"
              aria-label="Liste des produits"
            >
              {filtered.map((product) => (
                <div key={product.id} role="listitem">
                  <ProductCard product={product} />
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

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
