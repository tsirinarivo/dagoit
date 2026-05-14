import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Utensils, LayoutGrid, CreditCard, Package, BarChart3, Users, Clock, Smartphone } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "RestaurantOS — Logiciel Bar & Restaurant Madagascar · DAGO IT",
  description:
    "Système de gestion complet pour bar et restaurant à Madagascar. Interface en français, prix en Ariary. Commandes, caisse, stocks, rapports journaliers.",
};

const FEATURES = [
  { icon: LayoutGrid, title: "Gestion des tables", description: "Plan de salle interactif. Ouvrez et fermez les tables, transférez des commandes, gérez les couverts.", color: "orange" },
  { icon: Utensils, title: "Prise de commande", description: "Interface tactile rapide pour la saisie des commandes. Envoi direct en cuisine ou au bar. Modification en temps réel.", color: "lime" },
  { icon: CreditCard, title: "Caisse & paiements", description: "Encaissement en Ariary. Mobile Money (MVola, Orange, Airtel), espèces, ticket. Reçu imprimable ou par SMS.", color: "orange" },
  { icon: Package, title: "Stocks cuisine", description: "Gestion des ingrédients et matières premières. Alertes seuil minimum. Déduction automatique à chaque vente.", color: "lime" },
  { icon: Users, title: "Gestion du personnel", description: "Profils serveurs et barmen. Attribution des tables par serveur. Suivi des ventes par employé.", color: "orange" },
  { icon: BarChart3, title: "Rapports journaliers", description: "Chiffre d'affaires du jour, semaine, mois. Top des plats vendus, heures de pointe, marges par catégorie.", color: "lime" },
  { icon: Clock, title: "Historique des commandes", description: "Retrouvez toute commande passée. Annulations, remboursements, tickets perdus. Traçabilité complète.", color: "orange" },
  { icon: Smartphone, title: "Interface tactile", description: "Conçu pour tablette et smartphone. Fonctionne en réseau local, même sans Internet. Données en temps réel.", color: "lime" },
];

const PLANS = [
  {
    name: "Solo",
    price: "35 000",
    ideal: "1 poste, jusqu'à 20 tables",
    features: ["Commandes & caisse", "Gestion des tables", "Rapports journaliers", "Support email"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "65 000",
    ideal: "3 postes, tables illimitées",
    features: ["Tout Solo", "Gestion stocks cuisine", "Multi-postes (salle + bar + cuisine)", "Gestion du personnel", "Support WhatsApp"],
    highlight: true,
  },
  {
    name: "Chaîne",
    price: "Sur devis",
    ideal: "Plusieurs établissements",
    features: ["Tout Pro", "Multi-sites", "Tableau de bord centralisé", "Formation sur site", "Support dédié"],
    highlight: false,
  },
];

export default function RestaurantOSPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at 30% 50%, rgba(255,107,53,0.1) 0%, transparent 60%), linear-gradient(to bottom, #060e1c, #0a1628)" }} />
        <div className="container-dago relative py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <Badge variant="orange" dot>Nouveau</Badge>
              <Badge variant="neutral">Bar & Restaurant</Badge>
            </div>
            <h1 className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.0] mb-5">
              RestaurantOS
              <br />
              <span className="text-orange-400">Gérez votre salle,</span>
              <br />
              <span className="gradient-text-cyan">votre bar, votre cuisine.</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
              Système de gestion complet pour bar et restaurant à Madagascar.
              Interface en français, prix en Ariary, pensé pour fonctionner
              même sans connexion Internet stable.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />} asChild>
                <Link href="/devis?app=restaurant-os">Demander une démo</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="#plans">Voir les tarifs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-dago py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-3">Fonctionnalités</p>
          <h2 className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
            Tout ce dont un établissement a besoin
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            const colors = {
              orange: "text-orange-400 bg-orange-500/10",
              lime: "text-lime-400 bg-lime-500/10",
            };
            const c = colors[f.color as keyof typeof colors];
            return (
              <div key={f.title} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 hover:border-orange-500/20 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${c}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="container-dago pb-20">
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-3">Tarifs</p>
          <h2 className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">Abonnement mensuel</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`rounded-2xl border p-6 flex flex-col ${plan.highlight ? "border-orange-500/40 bg-orange-500/5" : "border-[var(--border)] bg-[var(--surface)]"}`}>
              {plan.highlight && <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-3">Recommandé</p>}
              <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-1">{plan.name}</h3>
              <p className="text-xs text-[var(--text-tertiary)] mb-4">{plan.ideal}</p>
              <p className="font-mono font-black text-3xl text-orange-400 mb-1">
                {plan.price === "Sur devis" ? plan.price : plan.price + " Ar"}
              </p>
              {plan.price !== "Sur devis" && <p className="text-xs text-[var(--text-tertiary)] mb-5">/mois</p>}
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/devis?app=restaurant-os&plan=${plan.name.toLowerCase()}`}
                className={`text-center py-2.5 rounded-xl text-sm font-semibold transition-colors ${plan.highlight ? "bg-orange-500 text-[#060e1c] hover:bg-orange-400" : "border border-[var(--border)] text-[var(--text-primary)] hover:border-orange-500/30"}`}
              >
                Choisir {plan.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-dago pb-20">
        <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-2">
              Vous gérez un bar ou un restaurant ?
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Demandez une démo gratuite. Nos équipes vous accompagnent lors de l&apos;installation et de la formation du personnel.
            </p>
          </div>
          <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />} asChild>
            <Link href="/devis?app=restaurant-os">Demander une démo</Link>
          </Button>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
