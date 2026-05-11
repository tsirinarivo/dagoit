"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerGrid, defaultViewport } from "@/lib/animations/variants";

type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  accent: string;
};

const STATS: Stat[] = [
  {
    value: 500,
    suffix: "+",
    label: "Véhicules suivis",
    description: "En temps réel sur toute l'île",
    accent: "#00E5FF",
  },
  {
    value: 200,
    suffix: "+",
    label: "Clients actifs",
    description: "PME, hôpitaux, transporteurs",
    accent: "#A3FF12",
  },
  {
    value: 99.8,
    suffix: "%",
    label: "Uptime garanti",
    description: "Plateforme disponible 24h/24",
    accent: "#00E5FF",
  },
  {
    value: 8,
    suffix: " ans",
    label: "D'expérience",
    description: "Pionniers du GPS à Madagascar",
    accent: "#FF6B35",
  },
  {
    value: 7,
    suffix: "",
    label: "Villes couvertes",
    description: "Tana, Toamasina, Mahajanga...",
    accent: "#A3FF12",
  },
  {
    value: 15,
    suffix: "min",
    label: "Temps de réponse",
    description: "Support technique moyen",
    accent: "#FF6B35",
  },
];

function AnimatedNumber({
  value,
  suffix,
  prefix = "",
  accent,
}: Pick<Stat, "value" | "suffix" | "prefix" | "accent">) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1800;
    const isDecimal = !Number.isInteger(value);

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress);
      const current = eased * value;
      setDisplayed(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span ref={ref} style={{ color: accent }}>
      {prefix}
      {typeof value === "number" && !Number.isInteger(value)
        ? displayed.toFixed(1)
        : displayed}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section
      className="section-py relative overflow-hidden bg-primary-950"
      aria-labelledby="stats-heading"
    >
      {/* Fond */}
      <div
        aria-hidden
        className="absolute inset-0 bg-dot opacity-30 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(11,58,111,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="container-dago relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center mb-14"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">
            Chiffres clés
          </p>
          <h2
            id="stats-heading"
            className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] tracking-tight"
          >
            La confiance se mesure
            <br />
            <span className="gradient-text-cyan">en chiffres concrets</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--border)] rounded-2xl overflow-hidden"
          role="list"
          aria-label="Statistiques DAGO IT"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              role="listitem"
              className="flex flex-col items-center text-center p-8 bg-primary-950 hover:bg-[var(--surface)] transition-colors duration-200 group"
            >
              <div
                className="font-display font-black text-[clamp(2.5rem,5vw,3.5rem)] tracking-tight font-mono leading-none mb-3"
                aria-label={`${stat.prefix ?? ""}${stat.value}${stat.suffix} ${stat.label}`}
              >
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  accent={stat.accent}
                />
              </div>
              <p className="font-display font-semibold text-[var(--text-primary)] mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-[var(--text-tertiary)]">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
