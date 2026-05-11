import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, Map, Bell, Users, FileText, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/atoms/Badge";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Plateforme de Tracking GPS Madagascar — DAGO IT",
  description:
    "Interface web et application mobile pour gérer votre flotte GPS en temps réel à Madagascar. Tableaux de bord, rapports automatiques, multi-utilisateurs. Accès depuis n'importe où.",
  keywords: [
    "plateforme tracking GPS Madagascar",
    "logiciel suivi flotte Madagascar",
    "application GPS véhicule Madagascar",
    "tableau de bord GPS Madagascar",
    "API tracking Madagascar",
  ],
  openGraph: {
    title: "Plateforme Tracking GPS — DAGO IT Madagascar",
    description: "Gérez votre flotte depuis le web ou l'app mobile. Disponible partout.",
  },
};

const FEATURES = [
  {
    icon: <Monitor className="h-6 w-6" />,
    title: "Interface web intuitive",
    description:
      "Tableau de bord complet accessible depuis n'importe quel navigateur. Carte satellite en temps réel, liste des véhicules, statuts et alertes en un coup d'œil.",
    color: "cyan",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Application mobile",
    description:
      "App Android et iOS gratuite pour nos abonnés. Suivez vos véhicules, recevez les alertes push et coupez le moteur d'une pression du doigt.",
    color: "lime",
  },
  {
    icon: <Map className="h-6 w-6" />,
    title: "Carte satellite Madagascar",
    description:
      "Fond de carte haute résolution de Madagascar avec les routes nationales, les pistes et les zones urbaines. Commutation entre vue carte, satellite et hybride.",
    color: "orange",
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Alertes configurables",
    description:
      "Paramétrez vos propres règles d'alerte : excès de vitesse, géofencing, démarrage hors horaires, batterie faible. Réception par SMS, email ou push.",
    color: "cyan",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Rapports automatiques",
    description:
      "Rapports kilométriques, temps de conduite, arrêts, consommation estimée. Génération PDF/CSV automatique. Envoi par email selon planning.",
    color: "lime",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Multi-utilisateurs",
    description:
      "Créez des profils pour vos gestionnaires, superviseurs et chauffeurs avec des niveaux d'accès différents. Log d'audit complet.",
    color: "orange",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "API REST ouverte",
    description:
      "Intégrez nos données GPS dans votre ERP, TMS ou logiciel RH. Documentation API complète. Support technique pour les intégrations personnalisées.",
    color: "cyan",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Données sécurisées",
    description:
      "Chiffrement SSL/TLS, authentification à deux facteurs, données hébergées localement à Madagascar. Conformité RGPD sur demande.",
    color: "lime",
  },
];

const SCREENS = [
  {
    title: "Vue cartographique temps réel",
    description: "Tous vos véhicules sur une carte satellite. Position, vitesse, direction et statut en un regard.",
    stat: "Mise à jour : 10 secondes",
  },
  {
    title: "Tableau de bord flotte",
    description: "KPIs clés : véhicules actifs, alertes du jour, km parcourus, consommation estimée.",
    stat: "Données consolidées",
  },
  {
    title: "Historique des trajets",
    description: "Rejouez n'importe quel trajet passé. Animé sur la carte avec vitesse et arrêts.",
    stat: "Jusqu'à 5 ans d'historique",
  },
  {
    title: "Centre d'alertes",
    description: "Toutes vos alertes centralisées avec horodatage, position et véhicule concerné.",
    stat: "Alertes en temps réel",
  },
];

export default function TrackingPlatformPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Plateforme DAGO IT Tracking",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, Android, iOS",
            offers: { "@type": "Offer", price: "0", priceCurrency: "MGA", description: "Inclus avec l'abonnement GPS" },
            provider: { "@type": "LocalBusiness", name: "DAGO IT", url: "https://dago-it.com" },
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 70% at 30% 50%, rgba(163,255,18,0.1) 0%, transparent 60%), linear-gradient(to bottom, #060e1c, #0a1628)`,
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

        <div className="container-dago relative py-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <Badge variant="lime" dot pulse>Web + Mobile</Badge>
              <Badge variant="neutral">Inclus dans l'abonnement GPS</Badge>
            </div>

            <h1 className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.0] mb-5 text-balance">
              Plateforme de
              <br />
              <span className="gradient-text-cyan">tracking GPS</span>
              <br />
              clé en main
            </h1>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
              Interface web puissante et application mobile gratuite. Gérez toute votre flotte depuis votre bureau ou votre téléphone, partout dans le monde.{" "}
              <strong className="text-[var(--text-primary)]">Incluse sans supplément dans tous nos abonnements GPS.</strong>
            </p>

            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" magnetic rightIcon={<ArrowRight className="h-4 w-4" />} asChild>
                <Link href="/devis">Demander une démo</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/services/geolocalisation">Voir les abonnements GPS</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHIFFRES ── */}
      <section className="py-12 bg-primary-950 border-y border-[var(--border)]">
        <div className="container-dago">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-[var(--border)]">
            {[
              { value: "10s", label: "Actualisation GPS", detail: "Temps réel garanti" },
              { value: "100%", label: "Incluse", detail: "Avec abonnement GPS" },
              { value: "Web+App", label: "Plateformes", detail: "Android & iOS" },
              { value: "99.8%", label: "Disponibilité", detail: "Serveurs 24h/24" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center px-4 py-2 gap-1">
                <span className="font-display font-black text-3xl text-lime-400 font-mono">{s.value}</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{s.label}</span>
                <span className="text-xs text-[var(--text-tertiary)]">{s.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FONCTIONNALITÉS ── */}
      <section className="section-py" aria-labelledby="features-heading">
        <div className="container-dago">
          <div className="text-center mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-lime-500 mb-3">Fonctionnalités</p>
            <h2 id="features-heading" className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
              Tout pour piloter
              <br />
              <span className="gradient-text-cyan">votre flotte</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-lime-500/30 transition-all duration-200"
              >
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                    f.color === "cyan" ? "bg-cyan-500/10 text-cyan-500"
                    : f.color === "lime" ? "bg-lime-500/10 text-lime-500"
                    : "bg-orange-500/10 text-orange-500"
                  }`}
                  aria-hidden
                >
                  {f.icon}
                </div>
                <h3 className="font-display font-semibold text-sm text-[var(--text-primary)]">{f.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── VUES INTERFACE ── */}
      <section className="section-py bg-primary-950" aria-labelledby="screens-heading">
        <div className="container-dago">
          <div className="text-center mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-lime-500 mb-3">Interface</p>
            <h2 id="screens-heading" className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
              4 vues essentielles
              <br />
              <span className="gradient-text-cyan">pour votre flotte</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SCREENS.map((screen, i) => (
              <article
                key={screen.title}
                className="flex flex-col gap-3 p-6 rounded-2xl glass border border-[var(--border)] hover:border-lime-500/20 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--text-tertiary)]">0{i + 1}</span>
                  <span className="text-xs font-mono px-2 py-1 rounded-lg bg-lime-500/10 text-lime-500 border border-lime-500/20">
                    {screen.stat}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-[var(--text-primary)]">{screen.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{screen.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA DÉMO ── */}
      <section className="section-py">
        <div className="container-dago max-w-2xl text-center">
          <Badge variant="lime" className="mb-6">Démo gratuite</Badge>
          <h2 className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4">
            Voyez la plateforme{" "}
            <span className="gradient-text-cyan">en action</span>
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            Demandez une démo personnalisée avec vos propres véhicules de test. Un technicien vous présente toutes les fonctionnalités et répond à vos questions.
          </p>
          <Button variant="primary" size="xl" magnetic rightIcon={<ArrowRight className="h-5 w-5" />} asChild>
            <Link href="/devis">Demander une démo gratuite</Link>
          </Button>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
