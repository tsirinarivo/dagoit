import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/atoms/Badge";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Nos Réalisations — DAGO IT Madagascar",
  description:
    "Découvrez les projets réalisés par DAGO IT : flottes GPS, sites web, systèmes d'alarme à Madagascar. Études de cas et résultats concrets.",
  openGraph: {
    title: "Réalisations DAGO IT — Projets Tech Madagascar",
    description: "GPS, hébergement, alarmes : nos projets à Madagascar.",
  },
};

const PROJECTS = [
  {
    sector: "Santé",
    service: "GPS & Tracking",
    color: "cyan",
    challenge: "Coordonner 12 ambulances sur Antananarivo. Temps de réponse trop long, dispatch manuel par radio.",
    solution: "Déploiement de traceurs GPS sur l'ensemble de la flotte. Plateforme de dispatch en temps réel. Alertes SMS automatiques au coordinateur.",
    results: [
      "–32% de temps de réponse moyen",
      "Dispatch optimisé : ambulance la plus proche envoyée automatiquement",
      "Réduction de 18% de la consommation de carburant",
      "0 véhicule non localisé depuis le déploiement",
    ],
    tag: "12 véhicules",
  },
  {
    sector: "Transport & Logistique",
    service: "GPS & Tracking",
    color: "lime",
    challenge: "Flotte de 35 camions sur les routes nationales. Détournements de carburant, retards non justifiés, litiges clients.",
    solution: "Traceurs GPS longue portée avec rapport kilométrique automatique. Alertes dépassement de vitesse et sortie de route. Rapports clients automatisés.",
    results: [
      "–24% de consommation carburant",
      "Élimination des détours non autorisés",
      "Rapports clients automatiques : 0 litige en 8 mois",
      "ROI atteint en 4 mois",
    ],
    tag: "35 camions",
  },
  {
    sector: "Tourisme & Hôtellerie",
    service: "Hébergement Web",
    color: "orange",
    challenge: "Site WordPress lent, hébergé en Europe. Temps de chargement >8 secondes depuis Madagascar. Perte de réservations.",
    solution: "Migration vers notre infrastructure locale. Optimisation images, cache LiteSpeed, CDN régional. Refonte du tunnel de réservation.",
    results: [
      "Temps de chargement : 8.2s → 1.1s",
      "+67% de taux de conversion réservations",
      "Score Lighthouse : 94/100",
      "0 downtime depuis la migration",
    ],
    tag: "Migration complète",
  },
  {
    sector: "Immobilier",
    service: "Alarme & Sécurité",
    color: "cyan",
    challenge: "8 agences à sécuriser. Incidents répétés la nuit, matériel informatique volé, besoin de contrôle d'accès centralisé.",
    solution: "Système d'alarme multizone sur chaque site. Centrale communicante IP+GSM. Alertes SMS au responsable sécurité. Badges RFID par employé.",
    results: [
      "0 intrusion depuis l'installation",
      "Contrôle d'accès 100% tracé",
      "Réponse police en 4 minutes (test)",
      "Assurance réduite de 15%",
    ],
    tag: "8 sites",
  },
  {
    sector: "Humanitaire & ONG",
    service: "GPS & Hébergement",
    color: "lime",
    challenge: "Flotte de terrain (4×4, motos) dans des zones rurales. Sécurité des équipes, rapports bailleurs, gestion des zones d'intervention.",
    solution: "Traceurs GPS avec mode hors-réseau (mémoire locale). Géofencing des zones d'intervention. Site web hébergé localement pour rapidité sur connexion limitée.",
    results: [
      "Localisation même en zone sans réseau",
      "Rapports bailleurs automatiques chaque semaine",
      "Site accessible en 2G : 900ms de chargement",
      "Sécurité équipes terrain améliorée",
    ],
    tag: "Zones rurales",
  },
  {
    sector: "Commerce & Distribution",
    service: "GPS & Tracking",
    color: "orange",
    challenge: "Livraisons non maîtrisées, clients non livrés, chauffeurs non joignables. Réputation en jeu.",
    solution: "GPS sur 8 véhicules de livraison. Lien de suivi partagé en temps réel avec les clients. Confirmation de livraison avec photo.",
    results: [
      "+45% de satisfaction client",
      "–80% de réclamations livraison",
      "Tournées optimisées : –2h/jour/chauffeur",
      "Fidélisation clients +30%",
    ],
    tag: "8 véhicules",
  },
];

export default function RealisationsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-24">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 70% at 50% 50%, rgba(11,58,111,0.4) 0%, transparent 60%), linear-gradient(to bottom, #060e1c, #0a1628)`,
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-dot opacity-20 pointer-events-none" />

        <div className="container-dago relative py-16 text-center">
          <Badge variant="cyan" className="mb-6">Études de cas</Badge>
          <h1 className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.0] mb-5 text-balance">
            Nos réalisations
            <br />
            <span className="gradient-text-cyan">à Madagascar</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">
            Des projets concrets à Madagascar. Chiffres réels, résultats mesurables.
          </p>
        </div>
      </section>

      {/* ── CHIFFRES GLOBAUX ── */}
      <section className="py-12 bg-primary-950 border-y border-[var(--border)]">
        <div className="container-dago">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-[var(--border)]">
            {[
              { value: "500+", label: "Véhicules suivis", detail: "GPS actifs" },
              { value: "200+", label: "Sites sécurisés", detail: "Alarmes installées" },
              { value: "500+", label: "Sites hébergés", detail: "Uptime 99.9%" },
              { value: "10+", label: "Années d'expérience", detail: "Depuis 2016" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center px-4 py-2 gap-1">
                <span className="font-display font-black text-3xl text-cyan-400 font-mono">{s.value}</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{s.label}</span>
                <span className="text-xs text-[var(--text-tertiary)]">{s.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJETS ── */}
      <section className="section-py" aria-labelledby="projects-heading">
        <div className="container-dago">
          <div className="text-center mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">Portfolio</p>
            <h2 id="projects-heading" className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
              Projets récents
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            {PROJECTS.map((project, i) => (
              <article
                key={`${project.sector}-${i}`}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 lg:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-cyan-500/20 transition-all duration-200"
              >
                {/* Infos projet */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant={project.color as "cyan" | "lime" | "orange"}
                    >
                      {project.service}
                    </Badge>
                    <span className="text-xs font-mono text-[var(--text-tertiary)]">{project.tag}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[var(--text-primary)]">{project.sector}</h3>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Défi</p>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Solution</p>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                {/* Résultats */}
                <div className="lg:col-span-2 flex flex-col justify-center">
                  <p className="text-xs font-mono uppercase tracking-wider text-cyan-500 mb-4">Résultats mesurés</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.results.map((result) => (
                      <div
                        key={result}
                        className="flex items-start gap-3 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10"
                      >
                        <span className="text-cyan-500 shrink-0 mt-0.5 font-bold">→</span>
                        <span className="text-sm text-[var(--text-primary)] font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-py bg-primary-950">
        <div className="container-dago max-w-2xl text-center">
          <h2 className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4">
            Votre projet est le
            <br />
            <span className="gradient-text-cyan">prochain sur cette liste</span>
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            Contactez-nous pour discuter de votre projet. Audit gratuit, devis sous 24h, installation rapide.
          </p>
          <Button variant="primary" size="xl" rightIcon={<ArrowRight className="h-5 w-5" />} asChild>
            <Link href="/devis">Discuter de mon projet</Link>
          </Button>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
