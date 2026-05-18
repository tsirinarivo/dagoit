import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Wifi, Globe, Utensils, MessageSquare } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Applications — DAGO IT Madagascar",
  description:
    "Applications métier développées par DAGO IT : ERP grossiste, plateforme transport, gestion restaurant, passerelle SMS. Solutions conçues pour Madagascar.",
};

const APPS = [
  {
    icon: Globe,
    name: "GrossistePPN",
    tagline: "ERP Grossiste Madagascar",
    href: "/applications/grossiste-ppn",
    badge: "PWA",
    badgeVariant: "cyan" as const,
    description:
      "Application de gestion complète pour grossistes alimentaires à Madagascar. Optimisée pour connexions lentes, utilisable partiellement hors ligne.",
    features: ["Stocks & inventaire", "Commandes & facturation", "Clients & fournisseurs", "Rapports & analytique"],
    color: "cyan",
  },
  {
    icon: Wifi,
    name: "TransHub",
    tagline: "Plateforme transport multi-coopératives",
    href: "/applications/transhub",
    badge: "transhub.mg",
    badgeVariant: "lime" as const,
    description:
      "Réservation de billets et envoi de colis pour Madagascar. Une seule app pour les voyageurs et les coopératives de transport.",
    features: ["Recherche & réservation", "Choix de siège", "Suivi colis", "Gestion coopérative"],
    color: "lime",
  },
  {
    icon: Utensils,
    name: "RestaurantOS",
    tagline: "Logiciel gestion bar & restaurant",
    href: "/applications/restaurant-os",
    badge: "Nouveau",
    badgeVariant: "orange" as const,
    description:
      "Système de gestion complet pour bar et restaurant à Madagascar. Interface en français, prix en Ariary.",
    features: ["Commandes & tables", "Caisse & paiements", "Stocks cuisine", "Rapports journaliers"],
    color: "orange",
  },
  {
    icon: MessageSquare,
    name: "SMS Gate",
    tagline: "Passerelle SMS via Android",
    href: "/applications/sms-gate",
    badge: "smsgate.mg",
    badgeVariant: "cyan" as const,
    description:
      "Envoyez des SMS depuis n'importe quel système via API REST, en utilisant un téléphone Android comme modem. Routage automatique par opérateur.",
    features: ["API REST authentifiée", "Multi-appareils", "Routage opérateur", "Webhooks temps réel"],
    color: "cyan",
  },
];

const COLOR_CLASSES: Record<string, { icon: string; dot: string; border: string }> = {
  cyan:   { icon: "text-cyan-400 bg-cyan-500/10",   dot: "bg-cyan-400",   border: "hover:border-cyan-500/40" },
  lime:   { icon: "text-lime-400 bg-lime-500/10",   dot: "bg-lime-400",   border: "hover:border-lime-500/40" },
  orange: { icon: "text-orange-400 bg-orange-500/10", dot: "bg-orange-400", border: "hover:border-orange-500/40" },
};

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <section className="container-dago mb-16">
        <div className="max-w-2xl">
          <Badge variant="default" className="mb-6">4 applications métier</Badge>
          <h1 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-4">
            Applications conçues pour{" "}
            <span className="gradient-text-cyan">Madagascar</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            DAGO IT développe et opère des applications métier adaptées aux réalités
            malgaches : connexions variables, paiements Mobile Money, interface en français.
          </p>
        </div>
      </section>

      <section className="container-dago mb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {APPS.map((app) => {
            const Icon = app.icon;
            const c = COLOR_CLASSES[app.color];
            return (
              <Link
                key={app.href}
                href={app.href}
                className={`group bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7 flex flex-col transition-all duration-300 ${c.border}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.icon}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant={app.badgeVariant}>{app.badge}</Badge>
                </div>

                <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-1">
                  {app.name}
                </h2>
                <p className="text-xs text-[var(--text-tertiary)] mb-3">{app.tagline}</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 flex-1">
                  {app.description}
                </p>

                <ul className="space-y-1.5 mb-6">
                  {app.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className={`flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all ${c.icon.split(" ")[0]}`}>
                  Découvrir <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
