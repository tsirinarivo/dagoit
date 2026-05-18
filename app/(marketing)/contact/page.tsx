import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { CONTACT_INFO } from "@/lib/constants/nav";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — DAGO IT Madagascar",
  description:
    "Contactez DAGO IT : support technique, questions commerciales, partenariats. Basés à Toamasina, nous répondons sous 24h.",
  openGraph: {
    title: "Contactez DAGO IT — Toamasina, Madagascar",
    description: "Support, questions, partenariats. Réponse sous 24h.",
  },
};

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "Téléphone",
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone}`,
    detail: "Lun–Ven 8h–17h, Sam 8h–12h",
  },
  {
    icon: Mail,
    title: "Email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    detail: "Réponse sous 24h ouvrées",
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: CONTACT_INFO.address,
    href: "https://maps.google.com/?q=Andranomadio+Toamasina+Madagascar",
    detail: "Visite sur rendez-vous",
  },
  {
    icon: Clock,
    title: "Horaires",
    value: "Lun–Ven : 8h–17h",
    detail: "Sam : 8h–12h • Dim : fermé",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="container-dago mb-16">
        <div className="max-w-2xl">
          <Badge variant="default" className="mb-6">
            Support & Commercial
          </Badge>
          <h1 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-4">
            Contactez{" "}
            <span className="gradient-text-cyan">notre équipe</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Une question sur nos services, un problème technique ou un projet à
            discuter ? Nous sommes là pour vous aider.
          </p>
        </div>
      </section>

      {/* Cartes contact */}
      <section className="container-dago mb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_CARDS.map((card) => {
            const Icon = card.icon;
            const content = (
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 h-full hover:border-cyan-500/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-cyan-400" />
                </div>
                <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider mb-1">
                  {card.title}
                </p>
                <p className="font-medium text-[var(--text-primary)] text-sm mb-1">
                  {card.value}
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">{card.detail}</p>
              </div>
            );
            return card.href ? (
              <a
                key={card.title}
                href={card.href}
                target={card.href.startsWith("https") ? "_blank" : undefined}
                rel={card.href.startsWith("https") ? "noopener noreferrer" : undefined}
                className="block"
              >
                {content}
              </a>
            ) : (
              <div key={card.title}>{content}</div>
            );
          })}
        </div>
      </section>

      {/* Formulaire + WhatsApp */}
      <section className="container-dago">
        <div className="grid lg:grid-cols-[1fr_360px] gap-12">
          <ContactForm />

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* WhatsApp */}
            <div className="bg-[var(--surface)] border border-green-600/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="h-5 w-5 text-green-400" />
                <h3 className="font-semibold text-[var(--text-primary)]">
                  WhatsApp — réponse rapide
                </h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Pour les urgences ou questions rapides, contactez-nous directement
                sur WhatsApp. Réponse en moins d'1h en heures ouvrées.
              </p>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white transition-colors text-sm font-medium"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Ouvrir WhatsApp
              </a>
            </div>

            {/* Support technique */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">
                Support technique
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                Vous êtes client DAGO IT ? Accédez à votre espace client pour
                suivre vos équipements et vos tickets.
              </p>
              <a
                href={CONTACT_INFO.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                → Accéder à la plateforme
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
