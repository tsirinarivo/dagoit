"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Server, ShieldAlert, Navigation } from "lucide-react";
import { fadeUp, staggerGrid, defaultViewport } from "@/lib/animations/variants";
import { Badge } from "@/components/atoms/Badge";

const SERVICES = [
  {
    id: "geolocalisation",
    href: "/services/geolocalisation",
    icon: <MapPin className="h-7 w-7" />,
    badge: "Cœur de métier",
    badgeVariant: "cyan" as const,
    title: "Géolocalisation GPS",
    subtitle: "Flotte professionnelle",
    description:
      "Suivez chaque véhicule de votre flotte en temps réel. Coupe-moteur à distance, géofencing, alertes SMS. Solutions pour ambulances, transporteurs, entreprises.",
    features: ["Temps réel 10s", "Coupe-moteur", "Géofencing", "Badge chauffeur"],
    accent: "#00E5FF",
    gradient: "from-[#00E5FF]/10 to-[#0b3a6f]/20",
    borderHover: "hover:border-cyan-500/50",
  },
  {
    id: "hebergement",
    href: "/services/hebergement-web",
    icon: <Server className="h-7 w-7" />,
    badge: "dago-cloud.com",
    badgeVariant: "lime" as const,
    title: "Hébergement Web",
    subtitle: "Haute performance",
    description:
      "Serveurs haute performance, 99.9% d'uptime, 400+ applications professionnelles. Installateur WordPress 1-clic. Support technique local.",
    features: ["400+ apps", "WordPress 1-clic", "99.9% uptime", "SSL gratuit"],
    accent: "#A3FF12",
    gradient: "from-[#A3FF12]/10 to-[#0b3a6f]/20",
    borderHover: "hover:border-lime-500/50",
  },
  {
    id: "alarme",
    href: "/services/alarme",
    icon: <ShieldAlert className="h-7 w-7" />,
    badge: "Résidentiel & Pro",
    badgeVariant: "orange" as const,
    title: "Systèmes d'Alarme",
    subtitle: "Sécurité complète",
    description:
      "Protection complète de vos locaux et domicile. Détecteurs de mouvement, sirènes, notifications instantanées sur mobile. Installation et maintenance.",
    features: ["GSM + WiFi", "Notification push", "Caméras IP", "Télésurveillance"],
    accent: "#FF6B35",
    gradient: "from-[#FF6B35]/10 to-[#0b3a6f]/20",
    borderHover: "hover:border-orange-500/50",
  },
  {
    id: "tracking",
    href: "/services/tracking-platform",
    icon: <Navigation className="h-7 w-7" />,
    badge: "app.fleet.mg",
    badgeVariant: "cyan" as const,
    title: "Plateforme Tracking",
    subtitle: "Interface web & mobile",
    description:
      "Accédez à votre tableau de bord de suivi 24h/24. Historique des trajets, rapports PDF, gestion multi-utilisateurs. Application iOS et Android.",
    features: ["Web + mobile", "Historique illimité", "Multi-utilisateurs", "Export PDF"],
    accent: "#00E5FF",
    gradient: "from-[#00E5FF]/10 to-[#0b3a6f]/20",
    borderHover: "hover:border-cyan-500/50",
  },
];

export function ServicesGrid() {
  return (
    <section
      className="section-py bg-primary-950"
      aria-labelledby="services-heading"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(11,58,111,0.3) 0%, transparent 60%)",
        }}
      />

      <div className="container-dago relative">
        {/* En-tête */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center mb-14"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">
            Nos solutions
          </p>
          <h2
            id="services-heading"
            className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] tracking-tight"
          >
            Tout ce dont votre
            <br />
            <span className="gradient-text-warm">entreprise a besoin</span>
          </h2>
        </motion.div>

        {/* Grille services */}
        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          role="list"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.id} variants={fadeUp} role="listitem">
              <Link
                href={service.href}
                className={`
                  group block relative rounded-2xl border border-[var(--border)] ${service.borderHover}
                  transition-all duration-400 overflow-hidden
                  hover:shadow-card-hover hover:-translate-y-1
                `}
                aria-label={`En savoir plus sur ${service.title}`}
              >
                {/* Gradient de fond */}
                <div
                  aria-hidden
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-50 group-hover:opacity-80 transition-opacity duration-400`}
                />

                <div className="relative p-7">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: `${service.accent}15`,
                          color: service.accent,
                        }}
                        aria-hidden
                      >
                        {service.icon}
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-tertiary)] mb-0.5">
                          {service.subtitle}
                        </p>
                        <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={service.badgeVariant} className="hidden sm:flex">
                        {service.badge}
                      </Badge>
                      <ArrowUpRight
                        className="h-5 w-5 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                        aria-hidden
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features pills */}
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Fonctionnalités incluses">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        role="listitem"
                        className="text-xs px-2.5 py-1 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-tertiary)] font-mono"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ligne de couleur en bas */}
                <div
                  aria-hidden
                  className="h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out"
                  style={{ background: service.accent }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
