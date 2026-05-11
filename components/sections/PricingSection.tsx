"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import { GPS_PLANS } from "@/lib/constants/plans";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/atoms/Badge";
import { useUIStore } from "@/lib/stores/uiStore";
import { fadeUp, staggerGrid, defaultViewport } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

const ACCENT = {
  cyan: {
    border: "border-cyan-500/30",
    text: "text-cyan-500",
    bg: "bg-cyan-500/10",
    button: "primary" as const,
  },
  lime: {
    border: "border-lime-500/50",
    text: "text-lime-500",
    bg: "bg-lime-500/10",
    button: "lime" as const,
  },
  orange: {
    border: "border-orange-500/30",
    text: "text-orange-500",
    bg: "bg-orange-500/10",
    button: "orange" as const,
  },
  primary: {
    border: "border-[var(--border)]",
    text: "text-[var(--text-secondary)]",
    bg: "bg-[var(--surface)]",
    button: "secondary" as const,
  },
};

export function PricingSection() {
  const { pricingBillingPeriod, setPricingBillingPeriod } = useUIStore();
  const isAnnual = pricingBillingPeriod === "annual";
  const savings = isAnnual ? 2 : 0; // 2 mois offerts en annuel

  return (
    <section
      className="section-py relative overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      {/* Fond décoratif */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 60% at 50% 100%, rgba(0,229,255,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 30% 40% at 80% 20%, rgba(163,255,18,0.03) 0%, transparent 50%)
          `,
        }}
      />

      <div className="container-dago relative">
        {/* En-tête */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center mb-10"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">
            Tarifs GPS
          </p>
          <h2
            id="pricing-heading"
            className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] tracking-tight mb-4"
          >
            Des offres pour chaque
            <br />
            <span className="gradient-text-cyan">taille de flotte</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-8">
            Matériel traceur GPS inclus (250 000 à 280 000 Ar selon le plan).
            Installation par nos techniciens à Antananarivo.
          </p>

          {/* Toggle mensuel / annuel */}
          <div
            className="inline-flex items-center rounded-xl bg-[var(--surface)] border border-[var(--border)] p-1 gap-1"
            role="group"
            aria-label="Période de facturation"
          >
            <button
              onClick={() => setPricingBillingPeriod("monthly")}
              aria-pressed={!isAnnual}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                !isAnnual
                  ? "bg-cyan-500 text-primary-900"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              Mensuel
            </button>
            <button
              onClick={() => setPricingBillingPeriod("annual")}
              aria-pressed={isAnnual}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5",
                isAnnual
                  ? "bg-lime-500 text-primary-900"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              Annuel
              <span className="text-xs font-mono font-bold bg-lime-500/20 text-lime-500 px-1.5 py-0.5 rounded-full">
                -2 mois
              </span>
            </button>
          </div>
        </motion.div>

        {/* Grille de plans */}
        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
          role="list"
          aria-label="Plans GPS DAGO IT"
        >
          {GPS_PLANS.map((plan) => {
            const accent = ACCENT[plan.color];
            const price = isAnnual
              ? Math.floor(plan.priceAnnual / 12)
              : plan.priceMonthly;

            return (
              <motion.div
                key={plan.id}
                variants={fadeUp}
                role="listitem"
                className={cn(
                  "relative flex flex-col rounded-2xl border transition-all duration-300",
                  "glass",
                  plan.popular
                    ? `${accent.border} shadow-glow-${plan.color === "lime" ? "lime" : "cyan"}`
                    : "border-[var(--border)] hover:border-cyan-500/20"
                )}
              >
                {plan.popular && (
                  <div
                    aria-label="Plan recommandé"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-500 text-primary-900 text-xs font-bold"
                  >
                    <Sparkles className="h-3 w-3" aria-hidden />
                    Recommandé
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6">
                  {/* Header plan */}
                  <div className="mb-5">
                    <h3 className={`font-display font-bold text-xl ${accent.text} mb-1`}>
                      {plan.name}
                    </h3>
                    <p className="text-xs text-[var(--text-tertiary)]">{plan.tagline}</p>
                  </div>

                  {/* Prix */}
                  <div className="mb-2">
                    <div className="flex items-end gap-1.5">
                      <span className="font-mono font-black text-3xl text-[var(--text-primary)] tracking-tight">
                        {formatPrice(price).replace(" Ar", "")}
                      </span>
                      <span className="text-sm text-[var(--text-tertiary)] mb-1">
                        Ar/mois
                      </span>
                    </div>
                    {isAnnual && (
                      <p className="text-xs text-lime-500 font-mono mt-1">
                        {formatPrice(plan.priceAnnual)}/an — économisez{" "}
                        {formatPrice(plan.priceMonthly * savings)}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-[var(--text-tertiary)] mb-5">
                    + {formatPrice(plan.hardwarePrice)} matériel (achat unique)
                    <br />
                    Idéal : {plan.ideal}
                  </p>

                  {/* CTA */}
                  <Button
                    variant={plan.popular ? accent.button : "secondary"}
                    size="md"
                    className="w-full mb-6"
                    asChild
                  >
                    <Link href={`/devis?plan=${plan.id}`}>
                      Choisir {plan.name}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>

                  {/* Liste de features */}
                  <ul className="flex flex-col gap-2.5 text-sm" role="list" aria-label={`Fonctionnalités incluses dans ${plan.name}`}>
                    {plan.features.map((feature) => (
                      <li
                        key={feature.label}
                        className={cn(
                          "flex items-start gap-2.5",
                          !feature.included && "opacity-40"
                        )}
                        aria-label={`${feature.label}${feature.included ? "" : " — non inclus"}`}
                      >
                        {feature.included ? (
                          <Check
                            className={`h-4 w-4 shrink-0 mt-0.5 ${accent.text}`}
                            aria-hidden
                          />
                        ) : (
                          <X
                            className="h-4 w-4 shrink-0 mt-0.5 text-[var(--text-tertiary)]"
                            aria-hidden
                          />
                        )}
                        <span className="text-[var(--text-secondary)]">
                          {feature.label}
                          {feature.note && (
                            <span className="block text-xs text-[var(--text-tertiary)] mt-0.5">
                              {feature.note}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Note de bas de section */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center text-sm text-[var(--text-tertiary)] mt-8"
        >
          Tous les prix sont hors taxes. La pose du matériel est facturée{" "}
          <span className="text-[var(--text-primary)]">25 000 Ar</span> à
          Antananarivo. Devis gratuit pour les flottes de 5 véhicules et plus.
        </motion.p>
      </div>
    </section>
  );
}
