"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/atoms/Badge";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

// Import dynamique pour éviter SSR avec Three.js
const MadagascarGlobe = dynamic(
  () =>
    import("@/components/three/MadagascarGlobe").then((m) => m.MadagascarGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="h-48 w-48 rounded-full border border-cyan-500/20 animate-pulse" />
      </div>
    ),
  }
);

const STATS = [
  { value: "500+", label: "Véhicules suivis" },
  { value: "200+", label: "Clients actifs" },
  { value: "99.8%", label: "Uptime plateforme" },
  { value: "8 ans", label: "D'expérience" },
];

export function HeroSection() {
  return (
    <section
      id="main-content"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Section principale — DAGO IT"
    >
      {/* Gradient de fond */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(11,58,111,0.5) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 80%, rgba(0,229,255,0.06) 0%, transparent 60%),
            linear-gradient(to bottom, #060e1c 0%, #0a1628 100%)
          `,
        }}
      />

      {/* Grille d'arrière-plan */}
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Globe 3D — côté droit */}
      <div
        aria-hidden
        className="absolute right-0 top-0 bottom-0 w-full md:w-[55%] pointer-events-none md:pointer-events-auto opacity-50 md:opacity-100"
      >
        <MadagascarGlobe className="w-full h-full" />
      </div>

      {/* Contenu textuel — côté gauche */}
      <div className="container-dago relative z-10 pt-28 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          {/* Badge status */}
          <motion.div variants={fadeUp} className="mb-6">
            <Badge variant="online" dot pulse>
              Plateforme opérationnelle — Madagascar
            </Badge>
          </motion.div>

          {/* Headline principale */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-black text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.0] tracking-tight text-balance mb-5"
          >
            Maîtrisez{" "}
            <span className="gradient-text-cyan">votre flotte.</span>
            <br />
            En temps réel.
            <br />
            <span className="text-[var(--text-secondary)]">Partout.</span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            variants={fadeUp}
            className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-md"
          >
            DAGO IT protège et optimise vos véhicules à Madagascar. Géolocalisation
            GPS professionnelle, alertes instantanées, coupe-moteur à distance.{" "}
            <span className="text-[var(--text-primary)]">
              Dès 32 500 Ar/mois.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-12">
            <Button
              variant="primary"
              size="lg"
              magnetic
              rightIcon={<ArrowRight className="h-4 w-4" />}
              asChild
            >
              <Link href="/devis">Demander une démo gratuite</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/boutique">
                Voir la boutique
              </Link>
            </Button>
          </motion.div>

          {/* Stats inline */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            role="list"
            aria-label="Chiffres clés DAGO IT"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                role="listitem"
                className="flex flex-col gap-0.5"
              >
                <span className="font-display font-bold text-2xl text-cyan-400 font-mono tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-[var(--text-tertiary)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Indicateur scroll */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-tertiary)]"
        aria-hidden
      >
        <span className="text-xs font-mono uppercase tracking-widest">
          Défiler
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.div>

      {/* Ligne de bordure bas */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.3) 50%, transparent 100%)",
        }}
      />
    </section>
  );
}
