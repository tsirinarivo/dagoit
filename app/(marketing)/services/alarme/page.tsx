import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Bell, Eye, Smartphone, Wifi, Lock, Zap, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/atoms/Badge";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Systèmes d'Alarme & Sécurité Madagascar — DAGO IT",
  description:
    "Protégez votre maison, bureau ou entrepôt avec nos systèmes d'alarme professionnels à Madagascar. Détection intrusion, sirène 110dB, alertes SMS, surveillance vidéo. Installation à Antananarivo.",
  keywords: [
    "alarme maison Madagascar",
    "système sécurité Antananarivo",
    "alarme entreprise Madagascar",
    "détecteur intrusion Madagascar",
    "surveillance vidéo Madagascar",
  ],
  openGraph: {
    title: "Systèmes d'Alarme & Sécurité — DAGO IT Madagascar",
    description: "Protégez vos biens 24h/24 avec nos alarmes professionnelles.",
  },
};

const FEATURES = [
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Détection périmétrique",
    description:
      "Capteurs PIR, détecteurs de bris de vitre, barrières infrarouges. Couvrez l'intégralité de votre périmètre avec zéro angle mort.",
    color: "cyan",
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Sirène 110 dB",
    description:
      "Sirène extérieure anti-tamper audible à 300 mètres. Dissuade les intrus avant même qu'ils franchissent le seuil.",
    color: "orange",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Alertes SMS & appels",
    description:
      "En cas d'intrusion, vous recevez instantanément un SMS et un appel automatique sur votre téléphone, où que vous soyez.",
    color: "lime",
  },
  {
    icon: <Wifi className="h-6 w-6" />,
    title: "Connexion IP + GSM",
    description:
      "Double communication : Wi-Fi/Ethernet pour la rapidité, GSM pour la redondance. Le système fonctionne même en cas de coupure internet.",
    color: "cyan",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Clavier & télécommande",
    description:
      "Armement/désarmement par code PIN, télécommande, badge RFID ou application mobile. Jusqu'à 20 utilisateurs avec codes individuels.",
    color: "lime",
  },
  {
    icon: <Radio className="h-6 w-6" />,
    title: "Capteurs sans fil",
    description:
      "Détecteurs radio 433 MHz à longue portée. Pas de câblage apparent, installation propre dans les bâtiments existants.",
    color: "orange",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Batterie de secours",
    description:
      "Autonomie de 24 à 72 heures sur batterie intégrée. Le système reste actif même lors des coupures de courant fréquentes à Madagascar.",
    color: "cyan",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Télésurveillance 24/7",
    description:
      "Option téléassistance avec notre centre de surveillance. Un opérateur lève le doute et contacte les secours si nécessaire.",
    color: "lime",
  },
];

const USE_CASES = [
  {
    icon: "🏠",
    title: "Résidences & villas",
    description:
      "Protégez votre domicile et votre famille contre les intrusions nocturnes. Alertes immédiates en cas d'ouverture de porte ou de fenêtre.",
    stat: "Dissuasion 95%",
  },
  {
    icon: "🏢",
    title: "Bureaux & locaux professionnels",
    description:
      "Sécurisez votre matériel informatique, vos archives et votre caisse. Codes individuels par employé pour traçabilité des accès.",
    stat: "ROI < 3 mois",
  },
  {
    icon: "🏭",
    title: "Entrepôts & zones industrielles",
    description:
      "Grandes surfaces couvertes par détecteurs longue portée. Protection des stocks, des véhicules et des machines-outils.",
    stat: "Couverture 2 000 m²",
  },
  {
    icon: "🏪",
    title: "Commerces & boutiques",
    description:
      "Alarme silencieuse (panic button) pour le personnel. Vidéosurveillance dissuasive. Lien direct avec gardiennage ou police.",
    stat: "Vols -70%",
  },
];

const PACKAGES = [
  {
    name: "Essentiel",
    price: "350 000",
    description: "Maison ou petit bureau",
    features: [
      "Centrale alarme 8 zones",
      "2 détecteurs PIR",
      "1 détecteur ouverture porte",
      "1 sirène intérieure",
      "Clavier LCD",
      "2 télécommandes",
      "Alertes SMS (3 numéros)",
      "Installation incluse",
    ],
    color: "cyan",
    highlight: false,
  },
  {
    name: "Professionnel",
    price: "750 000",
    description: "Bureau, commerce ou villa",
    features: [
      "Centrale alarme 16 zones",
      "4 détecteurs PIR",
      "4 détecteurs ouverture",
      "1 détecteur bris de vitre",
      "1 sirène extérieure 110 dB",
      "Clavier tactile + RFID",
      "4 télécommandes",
      "Alertes SMS + appels auto",
      "Application mobile",
      "Batterie 24h",
    ],
    color: "lime",
    highlight: true,
  },
  {
    name: "Industriel",
    price: "Sur devis",
    description: "Entrepôt ou grande surface",
    features: [
      "Centrale 32+ zones extensible",
      "Détecteurs volumétriques longue portée",
      "Barrières infrarouges",
      "Sirènes multiples",
      "Vidéosurveillance IP intégrée",
      "Contrôle d'accès biométrique",
      "Télésurveillance 24/7",
      "Maintenance préventive annuelle",
    ],
    color: "orange",
    highlight: false,
  },
];

export default function AlarmePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Systèmes d'Alarme et Sécurité",
            provider: { "@type": "LocalBusiness", name: "DAGO IT", url: "https://dago-it.com" },
            description: "Installation de systèmes d'alarme professionnels à Madagascar.",
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
            background: `radial-gradient(ellipse 60% 70% at 30% 50%, rgba(255,107,53,0.2) 0%, transparent 60%), linear-gradient(to bottom, #060e1c, #0a1628)`,
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

        <div className="container-dago relative py-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <Badge variant="orange" dot>Sécurité physique</Badge>
              <Badge variant="neutral">Installation Antananarivo</Badge>
            </div>

            <h1 className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.0] mb-5 text-balance">
              Systèmes d'alarme
              <br />
              <span className="gradient-text-warm">professionnels</span>
              <br />
              à Madagascar
            </h1>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
              Protégez vos biens, votre famille et votre entreprise. Détection périmétrique, sirène 110 dB, alertes SMS en temps réel.{" "}
              <strong className="text-[var(--text-primary)]">Installation sous 48h à Antananarivo.</strong>
            </p>

            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" magnetic rightIcon={<ArrowRight className="h-4 w-4" />} asChild>
                <Link href="/devis">Audit sécurité gratuit</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="#offres">Voir les offres</Link>
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
              { value: "200+", label: "Sites sécurisés", detail: "À Antananarivo" },
              { value: "48h", label: "Délai installation", detail: "Après commande" },
              { value: "110dB", label: "Sirène extérieure", detail: "Audible à 300m" },
              { value: "24/7", label: "Alertes SMS", detail: "Temps réel" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center px-4 py-2 gap-1">
                <span className="font-display font-black text-3xl text-orange-400 font-mono">{s.value}</span>
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
            <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-3">Fonctionnalités</p>
            <h2 id="features-heading" className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
              Une protection complète
              <br />
              <span className="gradient-text-warm">à chaque point d'entrée</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-orange-500/30 transition-all duration-200"
              >
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                    f.color === "cyan"
                      ? "bg-cyan-500/10 text-cyan-500"
                      : f.color === "lime"
                        ? "bg-lime-500/10 text-lime-500"
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

      {/* ── CAS D'USAGE ── */}
      <section className="section-py bg-primary-950" aria-labelledby="usecases-heading">
        <div className="container-dago">
          <div className="text-center mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-3">Applications</p>
            <h2 id="usecases-heading" className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
              Adapté à
              <br />
              <span className="gradient-text-warm">chaque usage</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {USE_CASES.map((uc) => (
              <article
                key={uc.title}
                className="flex flex-col gap-3 p-6 rounded-2xl glass border border-[var(--border)] hover:border-orange-500/20 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl" aria-hidden>{uc.icon}</span>
                  <span className="text-xs font-mono px-2 py-1 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {uc.stat}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-[var(--text-primary)]">{uc.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{uc.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFRES ── */}
      <section id="offres" className="section-py" aria-labelledby="packages-heading">
        <div className="container-dago">
          <div className="text-center mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-3">Tarifs</p>
            <h2 id="packages-heading" className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
              Choisissez votre
              <br />
              <span className="gradient-text-warm">niveau de protection</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.name}
                className={`flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-200 ${
                  pkg.highlight
                    ? "bg-lime-500/5 border-lime-500/40 shadow-lg"
                    : "bg-[var(--surface)] border-[var(--border)]"
                }`}
              >
                {pkg.highlight && (
                  <Badge variant="lime" className="self-start">Le plus populaire</Badge>
                )}
                <div>
                  <h3 className="font-display font-black text-lg text-[var(--text-primary)]">{pkg.name}</h3>
                  <p className="text-xs text-[var(--text-tertiary)]">{pkg.description}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono font-black text-2xl text-[var(--text-primary)]">{pkg.price}</span>
                  {pkg.price !== "Sur devis" && (
                    <span className="text-xs text-[var(--text-tertiary)]">Ar</span>
                  )}
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      <span className="text-lime-500 mt-0.5 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant={pkg.highlight ? "primary" : "secondary"} size="md" asChild className="mt-2">
                  <Link href="/devis">Demander un devis</Link>
                </Button>
              </article>
            ))}
          </div>
          <p className="text-center text-xs text-[var(--text-tertiary)] mt-6">
            Prix indicatifs HTVA. Déplacement inclus dans Antananarivo. Garantie matériel 1 an.
          </p>
        </div>
      </section>

      {/* ── PROCESSUS ── */}
      <section className="section-py bg-primary-950" aria-labelledby="process-heading">
        <div className="container-dago">
          <div className="text-center mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-3">Processus</p>
            <h2 id="process-heading" className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
              Protégé en{" "}
              <span className="gradient-text-warm">3 étapes</span>
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Audit sécurité gratuit", description: "Un technicien évalue vos points d'entrée, vos angles morts et vos besoins spécifiques. Devis détaillé sans engagement sous 24h.", color: "#00E5FF" },
              { step: "02", title: "Installation sous 48h", description: "Pose des détecteurs, câblage ou radio, paramétrage de la centrale. Durée : 2 à 6h selon la surface. Site opérationnel le jour même.", color: "#A3FF12" },
              { step: "03", title: "Formation & support", description: "Formation de 30 minutes pour tous les utilisateurs. Hotline support 7j/7. Maintenance préventive annuelle incluse la première année.", color: "#FF6B35" },
            ].map((s) => (
              <li key={s.step} className="flex flex-col items-center text-center gap-4">
                <div
                  className="h-16 w-16 rounded-2xl flex items-center justify-center font-mono font-black text-2xl"
                  style={{ background: `${s.color}15`, color: s.color }}
                >
                  {s.step}
                </div>
                <h3 className="font-display font-semibold text-[var(--text-primary)]">{s.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
