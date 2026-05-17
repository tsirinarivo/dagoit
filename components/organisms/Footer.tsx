import Link from "next/link";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants/nav";
import { Badge } from "@/components/atoms/Badge";

const FOOTER_LINKS = {
  services: [
    { label: "Géolocalisation GPS", href: "/services/geolocalisation" },
    { label: "Hébergement Web", href: "/services/hebergement-web" },
    { label: "Systèmes d'Alarme", href: "/services/alarme" },
    { label: "Plateforme Tracking", href: "/services/tracking-platform" },
  ],
  boutique: [
    { label: "Traceurs GPS", href: "/boutique?cat=traceurs-gps" },
    { label: "Routeurs WiFi 4G", href: "/boutique?cat=routeurs-wifi" },
    { label: "Montres Connectées", href: "/boutique?cat=montres-connectees" },
    { label: "Systèmes d'Alarme", href: "/boutique?cat=alarmes" },
  ],
  company: [
    { label: "À propos de nous", href: "/a-propos" },
    { label: "Nos réalisations", href: "/realisations" },
    { label: "Blog & Ressources", href: "/ressources" },
    { label: "Espace client", href: "/compte" },
    { label: "Demander un devis", href: "/devis" },
  ],
  legal: [
    { label: "Mentions légales", href: "/legal/mentions" },
    { label: "Conditions de vente", href: "/legal/cgv" },
    { label: "Confidentialité", href: "/legal/confidentialite" },
  ],
};

function LogoSVG() {
  return (
    <svg viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto" aria-label="DAGO IT">
      <circle cx="20" cy="20" r="17" stroke="#00E5FF" strokeWidth="1" opacity="0.2" />
      <circle cx="20" cy="20" r="11" stroke="#00E5FF" strokeWidth="1.2" opacity="0.45" />
      <circle cx="20" cy="20" r="5.5" stroke="#00E5FF" strokeWidth="1.5" opacity="0.8" />
      <circle cx="20" cy="20" r="2.5" fill="#00E5FF" />
      <path d="M27 13 Q31 9 36 8" stroke="#A3FF12" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M29.5 10.5 Q34.5 5 40 4" stroke="#A3FF12" strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
      <text x="48" y="15" fontFamily="Space Grotesk, sans-serif" fontWeight="800" fontSize="16" fill="#F5F7FA" letterSpacing="-0.5">DAGO</text>
      <text x="48" y="32" fontFamily="Space Grotesk, sans-serif" fontWeight="400" fontSize="11" fill="#00E5FF" letterSpacing="4">IT</text>
      <text x="71" y="32" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="7.5" fill="#64748B" letterSpacing="1.5">SOLUTIONS</text>
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/dagoit1/",
    icon: (
      <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/dagoit",
    icon: (
      <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${CONTACT_INFO.whatsapp}`,
    icon: (
      <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

const PAYMENT_METHODS = ["Mvola", "Orange Money", "Airtel Money", "Visa/Mastercard", "Virement", "Livraison Tana"];

export function Footer() {
  return (
    <footer className="relative bg-primary-950 border-t border-[var(--border)] overflow-hidden" role="contentinfo">
      {/* Gradient de fond */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,229,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container-dago relative">
        {/* Écosystème DAGO IT */}
        <div className="border-b border-[var(--border)] py-8">
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-4">
            Écosystème DAGO IT
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://fleet.mg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-cyan-500/40 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                <span className="text-cyan-400 text-xs font-mono font-bold">F</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-cyan-400 transition-colors">
                  fleet.mg
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">Tracking de flotte GPS</p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-[var(--text-tertiary)] ml-2 group-hover:text-cyan-400 transition-colors" />
            </a>
            <a
              href="https://dago-cloud.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-cyan-500/40 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <span className="text-blue-400 text-xs font-mono font-bold">C</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-cyan-400 transition-colors">
                  dago-cloud.com
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">Hébergement web Madagascar</p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-[var(--text-tertiary)] ml-2 group-hover:text-cyan-400 transition-colors" />
            </a>
          </div>
        </div>

        {/* Bloc principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 py-16">
          {/* Colonne entreprise */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <LogoSVG />
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
              Leader malgache en solutions de géolocalisation GPS professionnelles,
              hébergement web haute performance et systèmes de sécurité.
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-cyan-500 transition-colors group"
              >
                <Phone className="h-4 w-4 text-[var(--text-tertiary)] group-hover:text-cyan-500 transition-colors" />
                {CONTACT_INFO.phone}
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-cyan-500 transition-colors group"
              >
                <Mail className="h-4 w-4 text-[var(--text-tertiary)] group-hover:text-cyan-500 transition-colors" />
                {CONTACT_INFO.email}
              </a>
              <span className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <MapPin className="h-4 w-4 text-[var(--text-tertiary)] mt-0.5 shrink-0" />
                {CONTACT_INFO.address}
              </span>
            </div>
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="h-9 w-9 flex items-center justify-center rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:text-cyan-500 text-[var(--text-tertiary)] transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-mono font-medium uppercase tracking-widest text-[var(--text-tertiary)] mb-4">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1 inline-flex transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Boutique */}
          <div>
            <h3 className="text-xs font-mono font-medium uppercase tracking-widest text-[var(--text-tertiary)] mb-4">
              Boutique
            </h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.boutique.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Société */}
          <div>
            <h3 className="text-xs font-mono font-medium uppercase tracking-widest text-[var(--text-tertiary)] mb-4">
              Entreprise
            </h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={CONTACT_INFO.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-cyan-500 hover:text-cyan-400 transition-colors"
                >
                  Tracking en ligne
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Opérateurs partenaires */}
        <div className="border-t border-[var(--border)] py-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              Réseaux partenaires :
            </span>
            {["Telma", "Orange Madagascar", "Airtel Madagascar"].map((op) => (
              <Badge key={op} variant="neutral" className="font-mono">
                {op}
              </Badge>
            ))}
          </div>
        </div>

        {/* Paiements + mentions légales */}
        <div className="border-t border-[var(--border)] py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[var(--text-tertiary)]">Paiements :</span>
            {PAYMENT_METHODS.map((m) => (
              <span
                key={m}
                className="text-xs px-2 py-1 rounded-lg bg-[var(--surface)] text-[var(--text-tertiary)] font-mono border border-[var(--border)]"
              >
                {m}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--border)] py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--text-tertiary)]">
          <p>
            &copy; {new Date().getFullYear()} DAGO IT — Tous droits réservés.
            Antananarivo, Madagascar.
          </p>
          <p className="font-mono">
            <Badge variant="online" dot pulse>
              Tous les systèmes opérationnels
            </Badge>
          </p>
        </div>
      </div>
    </footer>
  );
}
