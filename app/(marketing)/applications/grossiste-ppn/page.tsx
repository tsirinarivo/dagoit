import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Wifi, Package, Users, FileText, BarChart3, ShoppingCart, Truck, Database } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "GrossistePPN — ERP Grossiste Madagascar · DAGO IT",
  description:
    "Application de gestion complète pour grossistes alimentaires à Madagascar. PWA optimisée connexions lentes, utilisable hors ligne. Stocks, commandes, facturation, clients.",
};

const FEATURES = [
  { icon: Package, title: "Gestion des stocks", description: "Inventaire en temps réel, alertes seuil minimum, suivi par lot et date de péremption. Mouvements de stock tracés.", color: "cyan" },
  { icon: ShoppingCart, title: "Commandes & ventes", description: "Saisie rapide des commandes, gestion des bons de livraison, historique client, conditions tarifaires par client.", color: "lime" },
  { icon: FileText, title: "Facturation", description: "Génération automatique de factures et reçus. Suivi des paiements, relances, encaissements Mobile Money et espèces.", color: "orange" },
  { icon: Users, title: "Clients & fournisseurs", description: "Carnet d'adresses complet. Historique des achats, encours client, conditions de crédit, segmentation.", color: "cyan" },
  { icon: Truck, title: "Approvisionnements", description: "Bons de commande fournisseurs, suivi des réceptions, rapprochement factures, gestion des retours.", color: "lime" },
  { icon: BarChart3, title: "Rapports & analytique", description: "Tableau de bord des ventes, marges par produit, produits les plus vendus, analyse par client ou période.", color: "orange" },
  { icon: Wifi, title: "Mode hors ligne", description: "PWA : fonctionne partiellement sans connexion. Synchronisation automatique à la reconnexion. Pensé pour les réseaux malgaches.", color: "cyan" },
  { icon: Database, title: "Données sécurisées", description: "Hébergé sur nos serveurs locaux à Antananarivo. Sauvegardes quotidiennes. Accès multi-utilisateurs avec rôles.", color: "lime" },
];

const PLANS = [
  {
    name: "Starter",
    price: "45 000",
    ideal: "1–2 utilisateurs",
    features: ["Stocks & ventes", "Facturation basique", "1 dépôt", "Support email"],
    highlight: false,
  },
  {
    name: "Business",
    price: "85 000",
    ideal: "3–10 utilisateurs",
    features: ["Tout Starter", "Multi-dépôts", "Approvisionnements", "Rapports avancés", "Support WhatsApp"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Sur devis",
    ideal: "10+ utilisateurs",
    features: ["Tout Business", "Multi-sites", "API d'intégration", "Formation sur site", "Support dédié"],
    highlight: false,
  },
];

export default function GrossistePPNPage() {
  return (
    <>
      <main className="min-h-screen pt-24 pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at 30% 50%, rgba(0,229,255,0.12) 0%, transparent 60%), linear-gradient(to bottom, #060e1c, #0a1628)" }} />
          <div className="container-dago relative py-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-5">
                <Badge variant="cyan" dot>PWA · Hors ligne</Badge>
                <Badge variant="neutral">ERP Alimentaire</Badge>
              </div>
              <h1 className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.0] mb-5">
                GrossistePPN
                <br />
                <span className="gradient-text-cyan">ERP pour grossistes</span>
              </h1>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
                Application de gestion complète pour grossistes alimentaires à Madagascar.
                Optimisée pour connexions lentes, utilisable partiellement hors ligne.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />} asChild>
                  <Link href="/devis?app=grossiste-ppn">Demander une démo</Link>
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
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">Fonctionnalités</p>
            <h2 className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
              Tout ce dont un grossiste a besoin
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              const colors = { cyan: "text-cyan-400 bg-cyan-500/10", lime: "text-lime-400 bg-lime-500/10", orange: "text-orange-400 bg-orange-500/10" };
              const c = colors[f.color as keyof typeof colors];
              return (
                <div key={f.title} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 hover:border-cyan-500/20 transition-colors">
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
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">Tarifs</p>
            <h2 className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">Abonnement mensuel</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`rounded-2xl border p-6 flex flex-col ${plan.highlight ? "border-cyan-500/40 bg-cyan-500/5" : "border-[var(--border)] bg-[var(--surface)]"}`}>
                {plan.highlight && <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">Recommandé</p>}
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-1">{plan.name}</h3>
                <p className="text-xs text-[var(--text-tertiary)] mb-4">{plan.ideal}</p>
                <p className="font-mono font-black text-3xl text-cyan-400 mb-1">
                  {plan.price === "Sur devis" ? plan.price : plan.price + " Ar"}
                </p>
                {plan.price !== "Sur devis" && <p className="text-xs text-[var(--text-tertiary)] mb-5">/mois</p>}
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/devis?app=grossiste-ppn&plan=${plan.name.toLowerCase()}`} className={`text-center py-2.5 rounded-xl text-sm font-semibold transition-colors ${plan.highlight ? "bg-cyan-500 text-[#060e1c] hover:bg-cyan-400" : "border border-[var(--border)] text-[var(--text-primary)] hover:border-cyan-500/30"}`}>
                  Choisir {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <FinalCTA />
      </main>
    </>
  );
}
