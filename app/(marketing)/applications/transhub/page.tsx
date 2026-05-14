import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Ticket, Package, Users, BarChart3, CreditCard, ExternalLink } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "TransHub — Plateforme Transport Madagascar · DAGO IT",
  description:
    "Plateforme multi-coopératives de réservation de billets de transport et d'envoi de colis pour Madagascar. Voyageurs et coopératives sur une seule application.",
};

const VOYAGEUR_FEATURES = [
  { icon: MapPin, title: "Recherche de trajets", description: "Trouvez les départs disponibles entre deux villes. Horaires, coopératives, places disponibles en temps réel." },
  { icon: Ticket, title: "Choix de siège", description: "Sélectionnez votre siège sur le plan du véhicule. Réservation confirmée instantanément." },
  { icon: CreditCard, title: "Paiement intégré", description: "Payez via Mobile Money (MVola, Orange Money, Airtel Money) ou espèces au guichet." },
  { icon: Package, title: "Suivi de colis", description: "Envoyez un colis avec une coopérative partenaire. Suivi en temps réel jusqu'à la livraison." },
];

const COOPERATIVE_FEATURES = [
  { icon: Users, title: "Gestion de flotte", description: "Gérez vos véhicules, chauffeurs, et capacités. Affectation automatique aux lignes." },
  { icon: MapPin, title: "Lignes & départs", description: "Configurez vos lignes, horaires, prix par siège. Ouvrez et fermez les départs en temps réel." },
  { icon: Package, title: "Gestion des colis", description: "Réception, pesage, étiquetage, remise. Traçabilité complète de chaque envoi." },
  { icon: BarChart3, title: "Caisse & analytique", description: "Tableau de bord des recettes, rapport par ligne, par chauffeur, par période. Export PDF/CSV." },
];

export default function TransHubPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at 30% 50%, rgba(163,255,18,0.08) 0%, transparent 60%), linear-gradient(to bottom, #060e1c, #0a1628)" }} />
        <div className="container-dago relative py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <Badge variant="lime" dot pulse>En production</Badge>
              <a href="https://transhub.mg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-lime-400 hover:text-lime-300 transition-colors">
                transhub.mg <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <h1 className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.0] mb-5">
              TransHub
              <br />
              <span className="text-lime-400">Voyagez à travers</span>
              <br />
              <span className="gradient-text-cyan">Madagascar en quelques taps.</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
              Plateforme multi-coopératives de réservation de billets de transport et d'envoi
              de colis. Une seule application pour les voyageurs et les coopératives.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="lime" size="lg" rightIcon={<ExternalLink className="h-4 w-4" />} asChild>
                <a href="https://transhub.mg" target="_blank" rel="noopener noreferrer">Accéder à TransHub</a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/devis?app=transhub">Intégrer votre coopérative</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Voyageurs */}
      <section className="container-dago py-16">
        <div className="mb-10">
          <Badge variant="lime" className="mb-4">Pour les voyageurs</Badge>
          <h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">
            Réservez votre billet en quelques secondes
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VOYAGEUR_FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 hover:border-lime-500/20 transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lime-400 bg-lime-500/10">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Coopératives */}
      <section className="container-dago pb-16">
        <div className="mb-10">
          <Badge variant="cyan" className="mb-4">Pour les coopératives</Badge>
          <h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">
            Gérez votre coopérative de A à Z
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COOPERATIVE_FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 hover:border-cyan-500/20 transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-cyan-400 bg-cyan-500/10">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA coopérative */}
      <section className="container-dago pb-20">
        <div className="bg-lime-500/5 border border-lime-500/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-2">
              Vous gérez une coopérative de transport ?
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Rejoignez TransHub et accédez à des milliers de voyageurs. Onboarding accompagné par DAGO IT.
            </p>
          </div>
          <Button variant="lime" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />} asChild>
            <Link href="/devis?app=transhub">Intégrer ma coopérative</Link>
          </Button>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
