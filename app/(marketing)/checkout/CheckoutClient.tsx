"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShoppingBag, AlertCircle } from "lucide-react";
import { useCartStore } from "@/lib/stores/cartStore";
import { submitOrder, newExternalId } from "@/lib/client/order";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils/formatPrice";

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; reference: string; total: number; duplicate: boolean }
  | { kind: "error"; message: string };

export function CheckoutClient() {
  const { items, total, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [externalId, setExternalId] = useState<string>("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [state, setState] = useState<State>({ kind: "idle" });

  // externalId généré au montage → stable si l'utilisateur double-clique
  useEffect(() => {
    setMounted(true);
    setExternalId(newExternalId());
  }, []);

  const clientTotal = total();
  const canSubmit =
    mounted &&
    items.length > 0 &&
    form.name.trim().length >= 2 &&
    form.phone.trim().length >= 8 &&
    state.kind !== "loading" &&
    state.kind !== "success";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setState({ kind: "loading" });
    const res = await submitOrder({
      externalId,
      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
      },
      items: items.map((i) => ({ sku: i.product.id, quantity: i.quantity })),
      notes: form.notes.trim() || undefined,
    });
    if (!res.ok) {
      setState({ kind: "error", message: res.error });
      return;
    }
    setState({
      kind: "success",
      reference: res.reference,
      total: res.total,
      duplicate: !!res.duplicate,
    });
    clearCart();
  }

  // Rendu succès
  if (state.kind === "success") {
    return (
      <div className="container-dago pt-28 pb-16 max-w-xl">
        <div className="flex flex-col items-center text-center gap-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-8">
          <div className="h-16 w-16 rounded-full bg-lime-500/10 flex items-center justify-center">
            <Check className="h-8 w-8 text-lime-400" />
          </div>
          <div>
            <h1 className="font-display font-black text-2xl mb-2">
              {state.duplicate ? "Commande déjà enregistrée" : "Commande enregistrée"}
            </h1>
            <p className="text-[var(--text-secondary)] text-sm">
              {state.duplicate
                ? "Cette commande avait déjà été soumise."
                : "Nous vous contactons rapidement pour organiser le paiement et la livraison."}
            </p>
          </div>

          <dl className="w-full grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border)] p-3">
              <dt className="text-xs font-mono text-[var(--text-tertiary)] mb-1">Référence</dt>
              <dd className="font-mono font-bold text-[var(--text-primary)]">{state.reference}</dd>
            </div>
            <div className="rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border)] p-3">
              <dt className="text-xs font-mono text-[var(--text-tertiary)] mb-1">Total</dt>
              <dd className="font-mono font-bold text-cyan-400">{formatPrice(state.total)}</dd>
            </div>
          </dl>

          <Button variant="primary" size="lg" className="w-full" asChild>
            <Link href="/boutique">
              Retour à la boutique
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Panier vide (après hydratation)
  if (mounted && items.length === 0) {
    return (
      <div className="container-dago pt-28 pb-16 max-w-xl">
        <div className="flex flex-col items-center text-center gap-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-8">
          <div className="h-16 w-16 rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center">
            <ShoppingBag className="h-7 w-7 text-[var(--text-tertiary)]" />
          </div>
          <div>
            <h1 className="font-display font-black text-2xl mb-2">Votre panier est vide</h1>
            <p className="text-[var(--text-secondary)] text-sm">
              Ajoutez d'abord des produits avant de finaliser la commande.
            </p>
          </div>
          <Button variant="primary" size="lg" asChild>
            <Link href="/boutique">Voir la boutique</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-dago pt-28 pb-16">
      <Link
        href="/boutique"
        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-cyan-500 transition-colors mb-6 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Retour à la boutique
      </Link>

      <h1 className="font-display font-black text-[clamp(1.8rem,4vw,2.8rem)] leading-tight mb-2">
        Finaliser <span className="gradient-text-cyan">votre commande</span>
      </h1>
      <p className="text-[var(--text-secondary)] mb-10 max-w-lg">
        Remplissez vos coordonnées — nous vous contactons pour arranger le paiement
        (Mvola, Orange Money, Airtel Money, carte ou espèces à la livraison).
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <div>
            <label htmlFor="name" className="block text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
              Nom complet <span className="text-orange-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full h-11 px-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="Rakoto Jean"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
              Téléphone <span className="text-orange-400">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full h-11 px-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="+261 32 05 767 77"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
              Email <span className="text-[var(--text-tertiary)]">(optionnel)</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full h-11 px-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="nom@exemple.com"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
              Notes <span className="text-[var(--text-tertiary)]">(optionnel — adresse, horaires, précisions)</span>
            </label>
            <textarea
              id="notes"
              rows={4}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              placeholder="Livraison au bureau après 14h…"
            />
          </div>

          {state.kind === "error" && (
            <div
              role="alert"
              className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300"
            >
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium mb-1">Impossible d'enregistrer la commande</p>
                <p className="text-red-300/80">{state.message}</p>
              </div>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!canSubmit}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            {state.kind === "loading" ? "Envoi en cours…" : "Valider la commande"}
          </Button>

          <p className="text-xs text-[var(--text-tertiary)] text-center">
            En validant, vous acceptez d'être recontacté au numéro fourni.
          </p>
        </form>

        {/* Récap panier */}
        <aside className="lg:sticky lg:top-28 rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5">
          <h2 className="font-display font-bold text-sm text-[var(--text-primary)] mb-4 uppercase tracking-wider">
            Récapitulatif
          </h2>

          {!mounted ? (
            <div className="h-24 flex items-center justify-center text-xs text-[var(--text-tertiary)]">
              Chargement…
            </div>
          ) : (
            <ul className="flex flex-col gap-3 mb-4" role="list">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-start gap-3 text-sm">
                  <span className="h-8 w-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                    ×{quantity}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[var(--text-primary)] font-medium truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] font-mono">
                      SKU : {product.id}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-[var(--text-secondary)] shrink-0">
                    {formatPrice(product.price * quantity)}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-[var(--border)] pt-4 flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">
              Estimation
            </span>
            <span className="font-display font-bold text-lg font-mono text-[var(--text-primary)]">
              {formatPrice(clientTotal)}
            </span>
          </div>
          <p className="text-[11px] text-[var(--text-tertiary)] mt-2 leading-relaxed">
            Le total définitif est calculé par notre système à la validation
            (taxes incluses).
          </p>
        </aside>
      </div>
    </div>
  );
}
