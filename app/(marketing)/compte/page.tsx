import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Monitor, HelpCircle } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants/nav";

export const metadata: Metadata = {
  title: "Espace Client — DAGO IT Madagascar",
  description:
    "Accédez à votre espace client DAGO IT : suivi GPS de votre flotte, gestion de vos abonnements, tickets de support.",
};

export default function ComptePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-6">
          <Monitor className="h-8 w-8 text-cyan-400" />
        </div>

        <h1 className="font-display font-black text-3xl text-[var(--text-primary)] mb-3">
          Espace Client
        </h1>
        <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
          Votre espace de suivi GPS et de gestion de flotte est accessible
          directement sur notre plateforme dédiée.
        </p>

        <a
          href={CONTACT_INFO.trackingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#060e1c] font-semibold transition-colors mb-4"
        >
          <ExternalLink className="h-4 w-4" />
          Accéder à la plateforme GPS
        </a>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 text-left">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-4 w-4 text-cyan-400" />
            <p className="text-sm font-medium text-[var(--text-primary)]">
              Vous n'avez pas encore de compte ?
            </p>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            Contactez-nous pour activer votre accès après souscription à un
            abonnement GPS.
          </p>
          <Link
            href="/devis"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
          >
            → Demander un devis
          </Link>
        </div>

        <p className="mt-6 text-xs text-[var(--text-tertiary)]">
          Problème de connexion ?{" "}
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Contacter le support
          </a>
        </p>
      </div>
    </div>
  );
}
