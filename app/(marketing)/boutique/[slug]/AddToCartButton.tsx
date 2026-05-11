"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/stores/cartStore";
import type { Product } from "@/lib/constants/products";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  async function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (product.stock === "out_of_stock") {
    return (
      <Button variant="secondary" size="lg" disabled className="w-full">
        Rupture de stock — me prévenir
      </Button>
    );
  }

  return (
    <div className="flex gap-3">
      {/* Quantité */}
      <div className="flex items-center gap-1 h-13 px-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Diminuer la quantité"
          className="h-7 w-7 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          –
        </button>
        <span className="w-8 text-center font-mono text-sm font-semibold text-[var(--text-primary)]">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => q + 1)}
          aria-label="Augmenter la quantité"
          className="h-7 w-7 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          +
        </button>
      </div>

      <Button
        variant={added ? "lime" : "primary"}
        size="lg"
        className="flex-1"
        onClick={handleAdd}
        rightIcon={
          added ? (
            <Check className="h-4 w-4" />
          ) : (
            <ShoppingCart className="h-4 w-4" />
          )
        }
        aria-label={`Ajouter ${qty} ${product.name} au panier`}
      >
        {added ? "Ajouté !" : "Ajouter au panier"}
      </Button>
    </div>
  );
}
