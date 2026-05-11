"use client";

import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Fuel,
  Headphones,
  MapPin,
  BarChart3,
  Bell,
  Clock,
} from "lucide-react";
import { fadeUp, staggerGrid, defaultViewport } from "@/lib/animations/variants";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: "cyan" | "lime" | "orange";
  size?: "large" | "normal";
};

const FEATURES: Feature[] = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Suivi temps réel",
    description:
      "Position GPS mise à jour toutes les 10 secondes. Visualisez chaque véhicule de votre flotte sur la carte, où qu'il soit à Madagascar.",
    accent: "cyan",
    size: "large",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Anti-vol & coupe-moteur",
    description:
      "En cas de vol, coupez le moteur à distance depuis votre téléphone. Alerte SMS immédiate dès qu'une anomalie est détectée.",
    accent: "lime",
  },
  {
    icon: <Fuel className="h-6 w-6" />,
    title: "Économies carburant",
    description:
      "Identifiez les trajets inutiles et les excès de vitesse. Nos clients réduisent leur consommation de carburant de 15 à 30%.",
    accent: "orange",
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "Support local 24h/7j",
    description:
      "Une équipe basée à Antananarivo, joignable par téléphone, email ou WhatsApp. Pas de centre d'appel étranger.",
    accent: "cyan",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Géofencing intelligent",
    description:
      "Définissez des zones virtuelles (entreprise, école, quartier). Recevez une alerte dès qu'un véhicule entre ou sort.",
    accent: "lime",
    size: "large",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Rapports détaillés",
    description:
      "Historique complet des trajets, rapport kilométrique, temps d'arrêt, identification des conducteurs.",
    accent: "orange",
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Alertes personnalisables",
    description:
      "Vitesse excessive, sortie de zone, démarrage nocturne, batterie faible. Choisissez vos alertes SMS ou push.",
    accent: "cyan",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Installation en 1h",
    description:
      "Nos techniciens se déplacent à Antananarivo pour installer le boîtier GPS sur votre véhicule. Opérationnel en moins d'une heure.",
    accent: "lime",
  },
];

const ACCENT_COLORS = {
  cyan: {
    icon: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    glow: "hover:border-cyan-500/40 hover:shadow-glow-cyan",
  },
  lime: {
    icon: "text-lime-500",
    bg: "bg-lime-500/10",
    border: "border-lime-500/20",
    glow: "hover:border-lime-500/40 hover:shadow-glow-lime",
  },
  orange: {
    icon: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    glow: "hover:border-orange-500/40 hover:shadow-glow-orange",
  },
};

export function WhyDagoIT() {
  return (
    <section className="section-py" aria-labelledby="why-dagoit-heading">
      <div className="container-dago">
        {/* En-tête */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center mb-14"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">
            Pourquoi nous choisir
          </p>
          <h2
            id="why-dagoit-heading"
            className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] tracking-tight text-balance"
          >
            La technologie GPS au service
            <br />
            <span className="gradient-text-cyan">des entreprises malgaches</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-xl mx-auto">
            Conçu pour les routes et les besoins spécifiques de Madagascar, avec un
            support local et des tarifs adaptés au marché.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto"
          role="list"
        >
          {FEATURES.map((feature, i) => {
            const colors = ACCENT_COLORS[feature.accent];
            const isLarge = feature.size === "large";

            return (
              <motion.article
                key={feature.title}
                role="listitem"
                variants={fadeUp}
                className={`
                  relative group flex flex-col gap-4 p-6 rounded-2xl
                  bg-[var(--surface)] border ${colors.border} ${colors.glow}
                  transition-all duration-300 cursor-default
                  ${isLarge ? "sm:col-span-2" : ""}
                `}
              >
                {/* Gradient de fond subtil */}
                <div
                  aria-hidden
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  style={{
                    background: `radial-gradient(ellipse 60% 60% at 20% 20%, ${
                      feature.accent === "cyan"
                        ? "rgba(0,229,255,0.04)"
                        : feature.accent === "lime"
                          ? "rgba(163,255,18,0.04)"
                          : "rgba(255,107,53,0.04)"
                    } 0%, transparent 70%)`,
                  }}
                />

                <div
                  className={`h-11 w-11 rounded-xl ${colors.bg} ${colors.icon} flex items-center justify-center shrink-0`}
                  aria-hidden
                >
                  {feature.icon}
                </div>

                <div>
                  <h3 className="font-display font-semibold text-base text-[var(--text-primary)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
