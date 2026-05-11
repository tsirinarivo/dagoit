"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONTACT_INFO } from "@/lib/constants/nav";
import { whatsappLink } from "@/lib/utils/formatPhone";
import { fadeUp, staggerContainer, defaultViewport } from "@/lib/animations/variants";

type FormState = "idle" | "loading" | "success" | "error";

export function FinalCTA() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", phone: "", vehicles: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("loading");
    // Simulation d'envoi (remplacer par l'appel API réel)
    await new Promise((r) => setTimeout(r, 1200));
    setFormState("success");
  }

  const waLink = whatsappLink(
    CONTACT_INFO.whatsapp,
    "Bonjour DAGO IT, je souhaite obtenir un devis pour ma flotte."
  );

  return (
    <section
      className="section-py relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Fond dégradé */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 50%, rgba(11,58,111,0.5) 0%, transparent 60%),
            linear-gradient(to bottom, transparent, rgba(0,229,255,0.03))
          `,
        }}
      />

      {/* Lignes décoratives */}
      <div aria-hidden className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="container-dago relative">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3"
            >
              Prêt à commencer ?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              id="cta-heading"
              className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] tracking-tight mb-4 text-balance"
            >
              Optimisez votre flotte
              <br />
              <span className="gradient-text-cyan">dès aujourd&apos;hui</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[var(--text-secondary)] max-w-md mx-auto"
            >
              Remplissez ce formulaire en 30 secondes. Un conseiller vous rappelle
              dans la journée avec une offre personnalisée pour votre flotte.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {formState === "success" ? (
              <div className="glass rounded-2xl p-10 text-center border border-lime-500/30">
                <div className="h-16 w-16 rounded-full bg-lime-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-lime-500" />
                </div>
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-2">
                  Demande reçue, merci !
                </h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  Notre équipe vous contacte dans les <strong className="text-[var(--text-primary)]">2h ouvrées</strong>.
                  Vous pouvez aussi nous joindre directement sur WhatsApp.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 border border-[var(--border-accent)]"
                noValidate
                aria-label="Formulaire de demande de démo"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <Input
                    label="Nom complet"
                    placeholder="Rakoto Andrianjafy"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    autoComplete="name"
                  />
                  <Input
                    label="Téléphone / WhatsApp"
                    placeholder="+261 34 XX XXX XX"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    autoComplete="tel"
                    hint="Nous rappelons dans la journée"
                  />
                  <Input
                    label="Nombre de véhicules"
                    placeholder="Ex : 5"
                    type="number"
                    min="1"
                    required
                    value={form.vehicles}
                    onChange={(e) =>
                      setForm({ ...form, vehicles: e.target.value })
                    }
                    hint="Voitures, motos, camions..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={formState === "loading"}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="flex-1"
                  >
                    Obtenir mon devis gratuit
                  </Button>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-13 px-6 rounded-xl bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold text-sm transition-colors shrink-0"
                  >
                    <MessageCircle className="h-4.5 w-4.5" />
                    WhatsApp
                  </a>
                </div>

                <p className="text-xs text-[var(--text-tertiary)] text-center mt-4">
                  Devis gratuit · Sans engagement · Réponse sous 2h ouvrées
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
