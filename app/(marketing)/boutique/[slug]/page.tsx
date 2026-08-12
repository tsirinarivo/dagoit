import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Package, Truck, Shield, Wrench } from "lucide-react";
import { getCatalog, getProductBySlugFromCatalog } from "@/lib/erp";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Badge } from "@/components/atoms/Badge";
import { AddToCartButton } from "./AddToCartButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 120;

export async function generateStaticParams() {
  const products = await getCatalog();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugFromCatalog(slug);
  if (!product) return { title: "Produit introuvable" };

  return {
    title: `${product.name} — DAGO IT Boutique`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

const STOCK_MAP = {
  in_stock: { variant: "online" as const, label: "En stock — expédition sous 24h" },
  low_stock: { variant: "warning" as const, label: "Stock limité — commandez vite" },
  out_of_stock: { variant: "offline" as const, label: "Rupture de stock" },
};

const BADGE_MAP = {
  new: { variant: "new" as const, label: "Nouveau" },
  promo: { variant: "promo" as const, label: "Promo" },
  bestseller: { variant: "bestseller" as const, label: "Best-seller" },
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const products = await getCatalog();
  const productData = products.find((p) => p.slug === slug);
  if (!productData) notFound();
  const product = productData;

  const stockInfo = STOCK_MAP[product.stock];

  return (
    <>
      {/* Schema.org Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.shortDescription,
            brand: { "@type": "Brand", name: product.brand },
            offers: {
              "@type": "Offer",
              priceCurrency: "MGA",
              price: product.price,
              availability:
                product.stock === "in_stock"
                  ? "https://schema.org/InStock"
                  : product.stock === "low_stock"
                    ? "https://schema.org/LimitedAvailability"
                    : "https://schema.org/OutOfStock",
              seller: { "@type": "Organization", name: "DAGO IT" },
            },
          }),
        }}
      />

      <div className="container-dago pt-28 pb-16">
        {/* Fil d'Ariane */}
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-[var(--text-tertiary)] mb-8">
          <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
            Accueil
          </Link>
          <span aria-hidden>/</span>
          <Link href="/boutique" className="hover:text-[var(--text-primary)] transition-colors">
            Boutique
          </Link>
          <span aria-hidden>/</span>
          <span className="text-[var(--text-primary)] truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Retour */}
        <Link
          href="/boutique"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-cyan-500 transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Retour à la boutique
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* ── Galerie images (côté gauche) ── */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-28">
            {/* Image principale */}
            <div
              className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center overflow-hidden border border-[var(--border)]"
              aria-label={`Image principale de ${product.name}`}
            >
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6"
                  priority
                />
              ) : (
                <svg viewBox="0 0 300 300" className="h-48 w-auto opacity-20" fill="none" aria-hidden>
                  <rect x="40" y="60" width="220" height="180" rx="16" stroke="currentColor" strokeWidth="3" />
                  <circle cx="150" cy="150" r="50" stroke="currentColor" strokeWidth="3" />
                  <path d="M80 60 L150 20 L220 60" stroke="currentColor" strokeWidth="3" />
                  <circle cx="150" cy="150" r="10" fill="currentColor" opacity="0.5" />
                </svg>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badges?.map((badge) => (
                  <Badge key={badge} variant={BADGE_MAP[badge].variant}>
                    {BADGE_MAP[badge].label}
                  </Badge>
                ))}
              </div>

              {/* Scan lines décoratifs */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, transparent 0%, rgba(0,229,255,0.03) 50%, transparent 100%)",
                  backgroundSize: "100% 4px",
                }}
              />
            </div>

            {/* Vignettes (placeholders) */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((_, i) => (
                  <div
                    key={i}
                    className="h-16 w-16 rounded-xl bg-primary-700 border border-[var(--border)] flex items-center justify-center cursor-pointer hover:border-cyan-500/40 transition-colors"
                    aria-label={`Vue ${i + 1}`}
                  >
                    <span className="text-xs text-[var(--text-tertiary)] font-mono">{i + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Infos produit (côté droit) ── */}
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
              <p className="text-xs text-[var(--text-tertiary)] font-mono mb-1">
                {product.brand}
              </p>
              <h1 className="font-display font-black text-[clamp(1.8rem,4vw,2.8rem)] tracking-tight leading-tight mb-3">
                {product.name}
              </h1>

              {/* Stock */}
              <Badge variant={stockInfo.variant} dot>
                {stockInfo.label}
              </Badge>
            </div>

            {/* Prix */}
            <div>
              {product.priceOld && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-[var(--text-tertiary)] line-through font-mono">
                    {formatPrice(product.priceOld)}
                  </span>
                  <Badge variant="promo">
                    –{Math.round((1 - product.price / product.priceOld) * 100)}%
                  </Badge>
                </div>
              )}
              <p
                className={`font-display font-black text-4xl font-mono tracking-tight ${
                  product.priceOld ? "text-orange-400" : "text-[var(--text-primary)]"
                }`}
              >
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Description courte */}
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Opérateurs compatibles */}
            {product.compatible && (
              <div>
                <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                  Réseaux compatibles
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.compatible.map((op) => (
                    <span
                      key={op}
                      className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] font-mono"
                    >
                      <Check className="h-3 w-3 text-lime-500" />
                      {op}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA panier */}
            <div className="flex flex-col gap-3">
              <AddToCartButton product={product} />
              <Link
                href="/devis"
                className="text-sm text-center text-[var(--text-secondary)] hover:text-cyan-500 transition-colors underline underline-offset-2"
              >
                Commander en quantité (5+) → demander un devis
              </Link>
            </div>

            {/* Garanties */}
            <div
              className="grid grid-cols-2 gap-3"
              role="list"
              aria-label="Garanties et services"
            >
              {[
                { icon: <Shield className="h-4 w-4" />, label: "Garantie 1 an" },
                { icon: <Truck className="h-4 w-4" />, label: "Livraison J+1 Tana" },
                { icon: <Wrench className="h-4 w-4" />, label: "Installation dispo" },
                { icon: <Package className="h-4 w-4" />, label: "Retour 14 jours" },
              ].map((g) => (
                <div
                  key={g.label}
                  role="listitem"
                  className="flex items-center gap-2 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-secondary)]"
                >
                  <span className="text-cyan-500">{g.icon}</span>
                  {g.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Description & Specs ── */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Description longue */}
          <div>
            <h2 className="font-display font-bold text-xl mb-4 text-[var(--text-primary)]">
              Description
            </h2>
            <div className="prose prose-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
              {product.description}
            </div>
          </div>

          {/* Spécifications techniques */}
          <div>
            <h2 className="font-display font-bold text-xl mb-4 text-[var(--text-primary)]">
              Spécifications techniques
            </h2>
            <dl className="flex flex-col gap-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-start justify-between gap-4 py-2.5 border-b border-[var(--border)] last:border-0"
                >
                  <dt className="text-xs text-[var(--text-tertiary)] font-mono shrink-0">
                    {key}
                  </dt>
                  <dd className="text-sm text-[var(--text-primary)] text-right font-medium">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── Produits similaires ── */}
        <div className="mt-16">
          <h2 className="font-display font-bold text-xl mb-6 text-[var(--text-primary)]">
            Produits similaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {products.filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/boutique/${p.slug}`}
                  className="group flex flex-col gap-3 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-cyan-500/30 transition-all duration-200"
                >
                  <div className="h-24 rounded-xl bg-primary-700 flex items-center justify-center">
                    <svg viewBox="0 0 80 60" className="h-12 w-auto opacity-20" fill="none" aria-hidden>
                      <rect x="8" y="8" width="64" height="44" rx="6" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <p className="text-xs font-mono text-[var(--text-tertiary)]">{p.brand}</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {p.name}
                  </p>
                  <p className="font-mono font-bold text-sm text-[var(--text-primary)]">
                    {formatPrice(p.price)}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
