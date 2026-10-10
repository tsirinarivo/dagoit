import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, MessageCircle, Clock, Phone, Mail } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants/nav";

export const metadata: Metadata = {
  title: "Maintenance en cours — DAGO IT",
  description: "Notre site est momentanément en maintenance. Nous revenons très vite.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-primary-900 text-[var(--text-primary)]">
      <div className="max-w-xl w-full text-center flex flex-col items-center gap-6">
        <div className="h-20 w-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
          <Wrench className="h-10 w-10 text-cyan-400" />
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
            DAGO IT
          </p>
          <h1 className="font-display font-black text-[clamp(2rem,5vw,3rem)] leading-tight mb-4">
            Site en <span className="gradient-text-cyan">maintenance</span>
          </h1>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Nous effectuons une mise à jour pour vous offrir une meilleure expérience.
            Le service sera rétabli sous peu — merci de votre patience.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)] font-mono">
          <Clock className="h-3.5 w-3.5" />
          Retour estimé prochainement
        </div>

        <div className="w-full border-t border-[var(--border)] pt-6 mt-2">
          <p className="text-xs text-[var(--text-tertiary)] mb-4">
            Besoin urgent ? Contactez-nous directement
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm font-medium transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-cyan-500/40 text-sm font-medium transition-colors"
            >
              <Phone className="h-4 w-4 text-cyan-400" />
              {CONTACT_INFO.phone}
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-cyan-500/40 text-sm font-medium transition-colors"
            >
              <Mail className="h-4 w-4 text-cyan-400" />
              Email
            </a>
          </div>
        </div>

        <p className="text-[11px] text-[var(--text-tertiary)] font-mono mt-4">
          HTTP 503 · Service temporairement indisponible
        </p>
      </div>
    </main>
  );
}
