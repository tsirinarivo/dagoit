import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Server, Bell, Radio } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Nos Services — DAGO IT Madagascar",
  description:
    "Géolocalisation GPS, hébergement web, systèmes d'alarme et plateforme de tracking à Madagascar. Découvrez toutes les solutions DAGO IT.",
  openGraph: {
    title: "Services DAGO IT — GPS, Hébergement, Alarme, Madagascar",
    description: "Solutions tech pour entreprises malgaches : GPS, web, sécurité.",
  },
};

const SERVICES = [
  {
    icon: MapPin,
    title: "Géolocalisation GPS",
    href: "/services/geolocalisation",
    badge: "Phare",
    badgeVariant: "online" as const,
    description:
      "Suivez votre flotte en temps réel. Traceurs GPS professionnels, alertes instantanées, coupe-moteur à distance. Dès 32 500 Ar/mois.",
    features: ["Suivi temps réel 24h/24", "Alertes SMS & email", "Coupe-moteur à distance", "Rapport mensuel automatique"],
    color: "cyan",
  },
  {
    icon: Server,
    title: "Hébergement Web",
    href: "/services/hebergement-web",
    badge: null,
    description:
      "Hébergement mutualisé et VPS optimisé pour Madagascar. Uptime 99.9%, support francophone, panneau de contrôle intuitif.",
    features: ["Domaines .mg inclus", "SSL gratuit", "Backups quotidiens", "Support 6j/7"],
    color: "blue",
  },
  {
    icon: Bell,
    title: "Systèmes d'Alarme",
    href: "/services/alarme",
    badge: null,
    description:
      "Sécurisez vos locaux avec des systèmes d'alarme professionnels. Détection intrusion, incendie, alertes SMS instantanées.",
    features: ["Détection intrusion & incendie", "Alertes SMS instantanées", "Surveillance à distance", "Installation incluse"],
    color: "orange",
  },
  {
    icon: Radio,
    title: "Plateforme Tracking",
    href: "/services/tracking-platform",
    badge: null,
    description:
      "Notre plateforme SaaS de gestion de flotte. Interface web et mobile, historique 12 mois, rapports exportables.",
    features: ["Interface web & mobile", "Historique 12 mois", "Multi-utilisateurs", "API disponible"],
    color: "lime",
  },
];

const COLOR_MAP: Record<string, string> = {
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  lime: "text-lime-400 bg-lime-500/10 border-lime-500/20",
};

const ICON_COLOR: Record<string, string> = {
  cyan: "text-cyan-400",
  blue: "text-blue-400",
  orange: "text-orange-400",
  lime: "text-lime-400",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="container-dago mb-16">
        <div className="max-w-2xl">
          <Badge variant="default" className="mb-6">
            4 domaines d'expertise
          </Badge>
          <h1 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-4">
            Toutes nos{" "}
            <span className="gradient-text-cyan">solutions tech</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            DAGO IT propose un écosystème complet pour les entreprises malgaches :
            du suivi de flotte à l'hébergement web, en passant par la sécurité de
            vos locaux.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="container-dago mb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const colors = COLOR_MAP[service.color];
            const iconColor = ICON_COLOR[service.color];
            return (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7 hover:border-cyan-500/30 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${colors}`}>
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  </div>
                  {service.badge && (
                    <Badge variant="online" dot>
                      {service.badge}
                    </Badge>
                  )}
                </div>

                <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
                  {service.title}
                </h2>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 flex-1">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${iconColor.replace("text-", "bg-")}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className={`flex items-center gap-2 text-sm font-medium ${iconColor} group-hover:gap-3 transition-all`}>
                  En savoir plus
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bouton boutique */}
      <section className="container-dago mb-20">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-1">
              Besoin de matériel ?
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Traceurs GPS, routeurs 4G, montres connectées — disponibles en ligne.
            </p>
          </div>
          <Link
            href="/boutique"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#060e1c] font-semibold text-sm transition-colors shrink-0"
          >
            Voir la boutique
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
