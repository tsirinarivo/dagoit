import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Server, Globe, Mail, Shield, Zap, HardDrive, Headphones, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/atoms/Badge";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Hébergement Web Madagascar — Serveurs Locaux DAGO IT",
  description:
    "Hébergement web rapide et fiable à Madagascar. Serveurs locaux Antananarivo, uptime 99.9%, cPanel, SSL gratuit, emails professionnels. Support en malgache et français.",
  keywords: [
    "hébergement web Madagascar",
    "hébergeur Madagascar",
    "serveur local Antananarivo",
    "nom de domaine Madagascar",
    "email professionnel Madagascar",
  ],
  openGraph: {
    title: "Hébergement Web Local — DAGO IT Madagascar",
    description: "Serveurs en local à Madagascar. Rapide, fiable, support francophone.",
  },
};

const FEATURES = [
  {
    icon: <Server className="h-6 w-6" />,
    title: "Serveurs locaux Madagascar",
    description:
      "Infrastructure hébergée à Antananarivo pour une latence minimale. Vos visiteurs malgaches bénéficient de temps de chargement 3 à 5× plus rapides qu'avec un hébergeur européen.",
    color: "cyan",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Performance SSD NVMe",
    description:
      "Disques SSD NVMe dernière génération. PHP 8.3, HTTP/2, cache LiteSpeed intégré. Vos pages se chargent en moins de 800ms.",
    color: "lime",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "SSL gratuit & sécurité",
    description:
      "Certificat SSL Let's Encrypt inclus sur tous les plans. Firewall WAF, protection DDoS, scan malware automatique quotidien.",
    color: "orange",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Emails professionnels",
    description:
      "Adresses @votre-domaine.mg illimitées selon le plan. Webmail Roundcube, support IMAP/POP3/SMTP, antispam SpamAssassin.",
    color: "cyan",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "cPanel en français",
    description:
      "Panneau de contrôle cPanel en français. Gestion facile des domaines, emails, bases de données MySQL et fichiers via File Manager.",
    color: "lime",
  },
  {
    icon: <HardDrive className="h-6 w-6" />,
    title: "Sauvegardes automatiques",
    description:
      "Backup complet du site et de la base de données tous les jours. Restauration en 1 clic depuis cPanel. Conservation 30 jours.",
    color: "orange",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Statistiques détaillées",
    description:
      "AWStats et Webalizer intégrés. Suivez le trafic, les pages vues, la provenance des visiteurs et l'utilisation de la bande passante.",
    color: "cyan",
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "Support local 7j/7",
    description:
      "Assistance en français et malgache par téléphone, WhatsApp et email. Temps de réponse moyen : 2 heures ouvrables.",
    color: "lime",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "25 000",
    period: "/mois",
    description: "Site vitrine ou blog",
    storage: "5 Go SSD",
    domains: "1 domaine",
    emails: "5 comptes email",
    databases: "2 bases MySQL",
    bandwidth: "50 Go/mois",
    highlight: false,
    color: "cyan",
  },
  {
    name: "Business",
    price: "55 000",
    period: "/mois",
    description: "PME & e-commerce",
    storage: "25 Go SSD NVMe",
    domains: "5 domaines",
    emails: "Illimité",
    databases: "10 bases MySQL",
    bandwidth: "200 Go/mois",
    highlight: true,
    color: "lime",
  },
  {
    name: "Pro",
    price: "120 000",
    period: "/mois",
    description: "Applications & forte charge",
    storage: "100 Go SSD NVMe",
    domains: "Illimité",
    emails: "Illimité",
    databases: "Illimité",
    bandwidth: "Illimitée",
    highlight: false,
    color: "orange",
  },
];

export default function HebergementWebPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Hébergement Web Madagascar",
            provider: { "@type": "LocalBusiness", name: "DAGO IT", url: "https://dago-it.com" },
            description: "Hébergement web sur serveurs locaux à Madagascar.",
            areaServed: "Madagascar",
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 70% at 30% 50%, rgba(0,229,255,0.15) 0%, transparent 60%), linear-gradient(to bottom, #060e1c, #0a1628)`,
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

        <div className="container-dago relative py-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <Badge variant="cyan" dot pulse>Serveurs locaux</Badge>
              <Badge variant="neutral">Madagascar</Badge>
            </div>

            <h1 className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.0] mb-5 text-balance">
              Hébergement web
              <br />
              <span className="gradient-text-cyan">local & rapide</span>
              <br />
              à Madagascar
            </h1>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
              Vos visiteurs malgaches méritent un site rapide. Nos serveurs locaux à Antananarivo garantissent une latence 5× inférieure aux hébergeurs européens.{" "}
              <strong className="text-[var(--text-primary)]">Dès 25 000 Ar/mois.</strong>
            </p>

            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" magnetic rightIcon={<ArrowRight className="h-4 w-4" />} asChild>
                <Link href="/devis">Démarrer maintenant</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="#plans">Voir les plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHIFFRES ── */}
      <section className="py-12 bg-primary-950 border-y border-[var(--border)]">
        <div className="container-dago">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-[var(--border)]">
            {[
              { value: "99.9%", label: "Uptime garanti", detail: "SLA contractuel" },
              { value: "<800ms", label: "Temps de chargement", detail: "Pages optimisées" },
              { value: "500+", label: "Sites hébergés", detail: "Clients actifs" },
              { value: "7j/7", label: "Support local", detail: "En français & malgache" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center px-4 py-2 gap-1">
                <span className="font-display font-black text-3xl text-cyan-400 font-mono">{s.value}</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{s.label}</span>
                <span className="text-xs text-[var(--text-tertiary)]">{s.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FONCTIONNALITÉS ── */}
      <section className="section-py" aria-labelledby="features-heading">
        <div className="container-dago">
          <div className="text-center mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">Inclus dans chaque plan</p>
            <h2 id="features-heading" className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
              Tout ce qu'il faut pour
              <br />
              <span className="gradient-text-cyan">un site professionnel</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-cyan-500/30 transition-all duration-200"
              >
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                    f.color === "cyan" ? "bg-cyan-500/10 text-cyan-500"
                    : f.color === "lime" ? "bg-lime-500/10 text-lime-500"
                    : "bg-orange-500/10 text-orange-500"
                  }`}
                  aria-hidden
                >
                  {f.icon}
                </div>
                <h3 className="font-display font-semibold text-sm text-[var(--text-primary)]">{f.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANS ── */}
      <section id="plans" className="section-py bg-primary-950" aria-labelledby="plans-heading">
        <div className="container-dago">
          <div className="text-center mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">Tarifs</p>
            <h2 id="plans-heading" className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
              Plans simples,
              <br />
              <span className="gradient-text-cyan">sans surprise</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <article
                key={plan.name}
                className={`flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-200 ${
                  plan.highlight
                    ? "bg-lime-500/5 border-lime-500/40 shadow-lg"
                    : "bg-[var(--surface)] border-[var(--border)]"
                }`}
              >
                {plan.highlight && <Badge variant="lime" className="self-start">Recommandé</Badge>}
                <div>
                  <h3 className="font-display font-black text-lg text-[var(--text-primary)]">{plan.name}</h3>
                  <p className="text-xs text-[var(--text-tertiary)]">{plan.description}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono font-black text-2xl text-[var(--text-primary)]">{plan.price}</span>
                  <span className="text-xs text-[var(--text-tertiary)]">Ar{plan.period}</span>
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {[plan.storage, plan.domains, plan.emails, plan.databases, plan.bandwidth].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      <span className="text-lime-500 mt-0.5 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                  <li className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                    <span className="text-lime-500 mt-0.5 shrink-0">✓</span>
                    SSL gratuit inclus
                  </li>
                  <li className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                    <span className="text-lime-500 mt-0.5 shrink-0">✓</span>
                    cPanel complet
                  </li>
                  <li className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                    <span className="text-lime-500 mt-0.5 shrink-0">✓</span>
                    Backup quotidien
                  </li>
                </ul>
                <Button variant={plan.highlight ? "primary" : "secondary"} size="md" asChild className="mt-2">
                  <Link href="/devis">Commencer</Link>
                </Button>
              </article>
            ))}
          </div>
          <p className="text-center text-xs text-[var(--text-tertiary)] mt-6">
            Engagement mensuel ou annuel (–2 mois offerts). Migration depuis votre hébergeur actuel incluse.
          </p>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
