"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { fadeUp, defaultViewport } from "@/lib/animations/variants";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  sector: string;
  rating: number;
  content: string;
  result: string;
  initials: string;
  accentColor: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Rakoto Andrianjafy",
    role: "Directeur des opérations",
    company: "TransMad Express",
    sector: "Transport & Logistique",
    rating: 5,
    content:
      "Depuis qu'on a installé les traceurs DAGO IT sur nos 12 camions, on a complètement éliminé les détournements d'itinéraire. Le coupe-moteur à distance nous a sauvés deux fois d'un vol. L'application est simple, même nos chauffeurs les moins technophiles la maîtrisent en 10 minutes.",
    result: "–32% de carburant gaspillé en 6 mois",
    initials: "RA",
    accentColor: "#00E5FF",
  },
  {
    id: 2,
    name: "Dr. Hasinoro Razafindrabe",
    role: "Responsable logistique médicale",
    company: "Clinique Ambohimanarina",
    sector: "Santé",
    rating: 5,
    content:
      "Nos ambulances doivent répondre en urgence. Avec DAGO IT, le coordinateur voit en temps réel quelle ambulance est la plus proche d'un patient. Depuis la mise en place, notre temps de réponse moyen est passé de 22 minutes à 14 minutes. C'est des vies sauvées.",
    result: "Temps de réponse –36% (22 min → 14 min)",
    initials: "HR",
    accentColor: "#A3FF12",
  },
  {
    id: 3,
    name: "Nivo Rajaonarivelo",
    role: "Gérante",
    company: "Mada Courses & Co",
    sector: "Livraison express",
    rating: 5,
    content:
      "On a démarré avec 3 motos, maintenant on en a 18 grâce à l'optimisation que DAGO IT nous a permis de faire. Mes clients reçoivent un lien de suivi en temps réel de leur colis. Ça a complètement changé la confiance qu'ils nous accordent. Le support DAGO IT répond toujours dans la journée.",
    result: "×6 la flotte en 2 ans",
    initials: "NR",
    accentColor: "#FF6B35",
  },
  {
    id: 4,
    name: "Jean-Paul Ramaroson",
    role: "Directeur général",
    company: "BTP Mada Construction",
    sector: "BTP",
    rating: 5,
    content:
      "Sur nos chantiers, on avait un problème récurrent de détournement de matériaux et d'utilisation non autorisée des engins. Les alertes de géofencing ont mis fin à tout ça. En plus, on peut voir si nos engins travaillent vraiment ou si le moteur tourne à vide — une économie de gasoil considérable.",
    result: "Détournements éliminés à 100%",
    initials: "JPR",
    accentColor: "#00E5FF",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  function next() {
    setDirection(1);
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  }
  function prev() {
    setDirection(-1);
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  const testimonial = TESTIMONIALS[current];

  return (
    <section
      className="section-py relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(11,58,111,0.3) 0%, transparent 60%)",
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
            Ils nous font confiance
          </p>
          <h2
            id="testimonials-heading"
            className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] tracking-tight"
          >
            Résultats concrets,
            <br />
            <span className="gradient-text-cyan">clients satisfaits</span>
          </h2>
        </motion.div>

        {/* Carrousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl glass border border-[var(--border-accent)] p-8 md:p-12 min-h-[320px]">
            {/* Icône quote décorative */}
            <Quote
              className="absolute top-6 right-8 h-16 w-16 text-cyan-500/10"
              aria-hidden
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={testimonial.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                {/* Étoiles */}
                <div
                  className="flex gap-1"
                  role="img"
                  aria-label={`${testimonial.rating} étoiles sur 5`}
                >
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4.5 w-4.5 fill-current text-orange-400"
                      aria-hidden
                    />
                  ))}
                </div>

                {/* Citation */}
                <blockquote className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                {/* Résultat clé */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl self-start text-sm font-mono font-semibold"
                  style={{
                    background: `${testimonial.accentColor}15`,
                    color: testimonial.accentColor,
                    border: `1px solid ${testimonial.accentColor}30`,
                  }}
                >
                  ✦ {testimonial.result}
                </div>

                {/* Auteur */}
                <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 font-mono"
                    style={{
                      background: `${testimonial.accentColor}20`,
                      color: testimonial.accentColor,
                    }}
                    aria-hidden
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)]">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                  <span className="ml-auto text-xs px-2 py-1 rounded-lg bg-[var(--surface)] text-[var(--text-tertiary)] border border-[var(--border)] hidden sm:block">
                    {testimonial.sector}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Contrôles */}
          <div className="flex items-center justify-between mt-6">
            {/* Indicateurs */}
            <div
              className="flex gap-2"
              role="tablist"
              aria-label="Témoignages"
            >
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Témoignage de ${t.name}`}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-cyan-500"
                      : "w-1.5 bg-[var(--border)] hover:bg-[var(--text-tertiary)]"
                  }`}
                />
              ))}
            </div>

            {/* Boutons prev/next */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Témoignage précédent"
                className="h-10 w-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-cyan-500/40 transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                aria-label="Témoignage suivant"
                className="h-10 w-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-cyan-500/40 transition-all duration-200"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
