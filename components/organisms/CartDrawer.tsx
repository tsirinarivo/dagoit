"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/stores/cartStore";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils/formatPrice";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useCartStore();
  const cartTotal = total();

  // Fermer avec Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    if (isOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden
          />

          {/* Drawer */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Votre panier"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col bg-[var(--bg-secondary)] border-l border-[var(--border)] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-cyan-500" />
                <h2 className="text-base font-display font-semibold text-[var(--text-primary)]">
                  Panier
                </h2>
                {items.length > 0 && (
                  <span className="ml-1 h-5 w-5 rounded-full bg-cyan-500 text-primary-900 text-xs font-bold flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                aria-label="Fermer le panier"
                className="h-8 w-8 flex items-center justify-center rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Contenu */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
                  <div className="h-16 w-16 rounded-2xl bg-[var(--surface)] flex items-center justify-center">
                    <ShoppingBag className="h-7 w-7 text-[var(--text-tertiary)]" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-[var(--text-primary)] mb-1">
                      Votre panier est vide
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Découvrez nos produits GPS et accessoires.
                    </p>
                  </div>
                  <Button variant="primary" size="md" onClick={closeCart} asChild>
                    <Link href="/boutique">Voir la boutique</Link>
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col gap-4" role="list">
                  {items.map(({ product, quantity }) => (
                    <li
                      key={product.id}
                      className="flex gap-4 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]"
                    >
                      {/* Image placeholder */}
                      <div className="h-16 w-16 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center shrink-0 overflow-hidden">
                        <svg viewBox="0 0 64 64" className="h-10 w-10 opacity-30" fill="none">
                          <rect x="8" y="16" width="48" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
                          <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2" />
                          <path d="M20 16 L32 8 L44 16" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)] mb-2">
                          {product.brand}
                        </p>
                        <p className="text-sm font-mono font-semibold text-cyan-400">
                          {formatPrice(product.price * quantity)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeItem(product.id)}
                          aria-label={`Retirer ${product.name}`}
                          className="text-[var(--text-tertiary)] hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => quantity > 1 && updateQuantity(product.id, quantity - 1)}
                            aria-label="Diminuer la quantité"
                            disabled={quantity <= 1}
                            className="h-6 w-6 rounded-md bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-mono w-5 text-center text-[var(--text-primary)]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            aria-label="Augmenter la quantité"
                            className="h-6 w-6 rounded-md bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer panier */}
            {items.length > 0 && (
              <div className="border-t border-[var(--border)] px-6 py-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-secondary)]">Total</span>
                  <span className="font-display font-bold text-xl text-[var(--text-primary)] font-mono">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-tertiary)]">
                  Livraison gratuite à Antananarivo. Frais selon zone pour les régions.
                </p>
                <Button variant="primary" size="lg" className="w-full" onClick={closeCart} asChild>
                  <Link href="/devis">
                    Procéder au paiement
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <button
                  onClick={closeCart}
                  className="text-sm text-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-2"
                >
                  Continuer les achats
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
