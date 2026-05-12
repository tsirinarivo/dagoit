import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MapPin, Zap, ShieldCheck, Bell, Navigation, Users, BarChart3, Fuel, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/atoms/Badge";
import { PricingSection } from "@/components/sections/PricingSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Géolocalisation GPS Véhicules Madagascar — DAGO IT",
  description:
    "Suivez votre flotte en temps réel à Madagascar. Coupe-moteur, géofencing, alertes SMS, identification chauffeur. Dès 32 500 Ar/mois + matériel. Installation à Antananarivo.",
  keywords: [
    "géolocalisation GPS Madagascar",
    "traceur GPS flotte Madagascar",
    "suivi véhicule temps réel Madagascar",
    "coupe moteur distance Madagascar",
    "GPS flotte ambulance Madagascar",
  ],
  openGraph: {
    title: "Géolocalisation GPS — DAGO IT Madagascar",
    description:
      "Solutions GPS professionnelles pour flottes. Dès 32 500 Ar/mois.",
  },
};

const FEATURES_DETAIL = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Suivi temps réel",
    description:
      "Position GPS mise à jour toutes les 10 secondes. Visualisez la position exacte, la vitesse et la direction de chaque véhicule sur une carte satellite.",
    color: "cyan",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Coupe-moteur à distance",
    description:
      "En cas de vol ou d'utilisation non autorisée, coupez le moteur en un clic depuis l'application mobile, même à l'autre bout de Madagascar.",
    color: "lime",
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Alertes SMS instantanées",
    description:
      "Excès de vitesse, sortie de zone, démarrage nocturne, coupure d'alimentation… Choisissez vos alertes et recevez-les en temps réel sur votre téléphone.",
    color: "orange",
  },
  {
    icon: <Navigation className="h-6 w-6" />,
    title: "Géofencing intelligent",
    description:
      "Tracez des zones virtuelles (entrepôt, école, quartier interdit). Recevez une alerte dès qu'un véhicule entre ou sort de la zone définie.",
    color: "cyan",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Identification chauffeur",
    description:
      "Attribuez un badge RFID à chaque conducteur. Sachez qui conduit quel véhicule, quand et sur quel trajet. Responsabilisez vos équipes.",
    color: "lime",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Rapports & analyses",
    description:
      "Rapports kilométriques automatiques, temps de conduite, temps d'arrêt, score éco-conduite. Exportez en PDF ou CSV pour votre comptabilité.",
    color: "orange",
  },
  {
    icon: <Fuel className="h-6 w-6" />,
    title: "Optimisation carburant",
    description:
      "Identifiez les trajets inutiles, les ralentis excessifs et les dépassements de vitesse. Nos clients économisent en moyenne 15 à 30% de carburant.",
    color: "cyan",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Historique complet",
    description:
      "Rejouez n'importe quel trajet passé. L'historique est conservé 30 jours (Just Track) jusqu'à 5 ans (Sérénité+). Indispensable en cas de litige.",
    color: "lime",
  },
];

const USE_CASES = [
  {
    icon: "🚑",
    title: "Ambulances & urgences",
    description:
      "Dispatchez l'ambulance la plus proche. Réduisez votre temps de réponse de 30% en moyenne. Plusieurs cliniques à Antananarivo nous font déjà confiance.",
    stats: "–30% temps de réponse",
  },
  {
    icon: "🚚",
    title: "Transport & logistique",
    description:
      "Suivez vos camions sur les routes nationales. Contrôlez les heures de départ et d'arrivée. Éliminez les détours non autorisés et le carburant détourné.",
    stats: "–20% coûts opérationnels",
  },
  {
    icon: "🛵",
    title: "Coursiers & livraison",
    description:
      "Optimisez les tournées de vos livreurs. Partagez un lien de suivi en temps réel avec vos clients. Augmentez la confiance et la fidélisation.",
    stats: "+45% satisfaction client",
  },
  {
    icon: "🏗️",
    title: "BTP & engins de chantier",
    description:
      "Géolocalisez vos engins lourds sur les chantiers. Détectez les utilisations non autorisées en dehors des heures de travail. Réduisez les vols.",
    stats: "Vols éliminés à 100%",
  },
  {
    icon: "🏥",
    title: "Hôpitaux & services médicaux",
    description:
      "Coordinateurs : sachez en permanence où sont vos véhicules médicaux. Garantissez la traçabilité des transports de médicaments et d'organes.",
    stats: "Traçabilité totale",
  },
  {
    icon: "🏢",
    title: "Entreprises multi-secteurs",
    description:
      "Votre parc auto d'entreprise (directeurs, commerciaux, techniciens) entièrement sous contrôle. Politique de conduite, utilisation personnelle détectée.",
    stats: "ROI en moins de 6 mois",
  },
];

const FAQ = [
  {
    q: "Combien de temps dure l'installation du traceur GPS ?",
    a: "L'installation prend entre 45 minutes et 1h30 selon le type de véhicule. Nos techniciens interviennent à Antananarivo et dans les environs. Pour les flottes de 5 véhicules et plus, nous pouvons nous déplacer dans d'autres villes (Toamasina, Antsirabe, Mahajanga).",
  },
  {
    q: "Le traceur fonctionne-t-il partout à Madagascar ?",
    a: "Le traceur GPS fonctionne partout où il y a du réseau GSM (Telma, Orange ou Airtel). Dans les zones sans réseau, les données sont enregistrées localement et envoyées dès la reconnexion. La couverture couvre les principales routes nationales.",
  },
  {
    q: "Puis-je suivre mes véhicules depuis l'étranger ?",
    a: "Absolument. La plateforme tracking.dago-it.com est accessible depuis n'importe quel navigateur web dans le monde, et l'application mobile fonctionne partout. Beaucoup de nos clients expatriés gèrent leur flotte depuis l'Europe.",
  },
  {
    q: "Que se passe-t-il si je veux résilier ?",
    a: "Nos abonnements sont sans engagement minimum. Vous pouvez résilier à tout moment en donnant un préavis de 30 jours. Le matériel reste votre propriété. Vous pouvez aussi le transférer sur un autre véhicule.",
  },
  {
    q: "L'abonnement comprend-il la maintenance du traceur ?",
    a: "Oui, tous nos abonnements incluent le support technique et la maintenance à distance. En cas de défaillance matérielle due à un défaut de fabrication, nous remplaçons le traceur gratuitement la première année.",
  },
];

export default function GeolocalisationPage() {
  return (
    <>
      {/* Schema.org Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Géolocalisation GPS de Véhicules",
            provider: {
              "@type": "LocalBusiness",
              name: "DAGO IT",
              url: "https://dago-it.com",
            },
            description:
              "Service de géolocalisation GPS professionnelle pour flottes de véhicules à Madagascar.",
            areaServed: "Madagascar",
            offers: {
              "@type": "AggregateOffer",
              lowPrice: "32500",
              highPrice: "95000",
              priceCurrency: "MGA",
              offerCount: 4,
            },
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 60% 70% at 30% 50%, rgba(11,58,111,0.6) 0%, transparent 60%),
              linear-gradient(to bottom, #060e1c, #0a1628)
            `,
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

        <div className="container-dago relative py-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <Badge variant="cyan" dot pulse>
                Cœur de métier DAGO IT
              </Badge>
              <Badge variant="neutral">Depuis 2016</Badge>
            </div>

            <h1 className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.0] mb-5 text-balance">
              Géolocalisation GPS
              <br />
              <span className="gradient-text-cyan">professionnelle</span>
              <br />
              pour Madagascar
            </h1>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
              Suivez chaque véhicule de votre flotte en temps réel. Coupe-moteur à
              distance, alertes SMS, géofencing, identification des conducteurs.{" "}
              <strong className="text-[var(--text-primary)]">
                Dès 32 500 Ar/mois.
              </strong>
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="lg"
                magnetic
                rightIcon={<ArrowRight className="h-4 w-4" />}
                asChild
              >
                <Link href="/devis">Démo gratuite sans engagement</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="#fonctionnalites">Voir les fonctionnalités</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHIFFRES CLÉS ── */}
      <section className="py-12 bg-primary-950 border-y border-[var(--border)]" aria-label="Chiffres clés géolocalisation">
        <div className="container-dago">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-[var(--border)]"
            role="list"
          >
            {[
              { value: "500+", label: "Véhicules actifs", detail: "Suivi en ce moment" },
              { value: "10s", label: "Intervalle GPS", detail: "Mise à jour temps réel" },
              { value: "5m", label: "À installer", detail: "Pose par nos techniciens" },
              { value: "99.8%", label: "Disponibilité", detail: "Plateforme 24h/24" },
            ].map((stat) => (
              <div
                key={stat.label}
                role="listitem"
                className="flex flex-col items-center text-center px-4 py-2 gap-1"
              >
                <span className="font-display font-black text-3xl text-cyan-400 font-mono">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {stat.label}
                </span>
                <span className="text-xs text-[var(--text-tertiary)]">{stat.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FONCTIONNALITÉS ── */}
      <section
        id="fonctionnalites"
        className="section-py"
        aria-labelledby="features-heading"
      >
        <div className="container-dago">
          <div className="text-center mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">
              Fonctionnalités
            </p>
            <h2
              id="features-heading"
              className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight"
            >
              Tout ce dont vous avez besoin
              <br />
              <span className="gradient-text-cyan">pour maîtriser votre flotte</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="list">
            {FEATURES_DETAIL.map((feature) => (
              <article
                key={feature.title}
                role="listitem"
                className="group flex flex-col gap-3 p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-cyan-500/30 transition-all duration-200"
              >
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                    feature.color === "cyan"
                      ? "bg-cyan-500/10 text-cyan-500"
                      : feature.color === "lime"
                        ? "bg-lime-500/10 text-lime-500"
                        : "bg-orange-500/10 text-orange-500"
                  }`}
                  aria-hidden
                >
                  {feature.icon}
                </div>
                <h3 className="font-display font-semibold text-sm text-[var(--text-primary)]">
                  {feature.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAS D'USAGE ── */}
      <section
        className="section-py bg-primary-950"
        aria-labelledby="usecases-heading"
      >
        <div className="container-dago">
          <div className="text-center mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">
              Secteurs
            </p>
            <h2
              id="usecases-heading"
              className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight"
            >
              Une solution pour
              <br />
              <span className="gradient-text-warm">chaque secteur</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" role="list">
            {USE_CASES.map((uc) => (
              <article
                key={uc.title}
                role="listitem"
                className="flex flex-col gap-3 p-6 rounded-2xl glass border border-[var(--border)] hover:border-cyan-500/20 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl" role="img" aria-hidden>
                    {uc.icon}
                  </span>
                  <span className="text-xs font-mono px-2 py-1 rounded-lg bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                    {uc.stats}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-[var(--text-primary)]">
                  {uc.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {uc.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="section-py" aria-labelledby="how-heading">
        <div className="container-dago">
          <div className="text-center mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">
              Processus
            </p>
            <h2
              id="how-heading"
              className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight"
            >
              Opérationnel en{" "}
              <span className="gradient-text-cyan">3 étapes simples</span>
            </h2>
          </div>

          <ol
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            role="list"
          >
            {[
              {
                step: "01",
                title: "Commande & livraison",
                description:
                  "Choisissez votre plan GPS en ligne ou par téléphone. Le boîtier GPS vous est livré ou nous venons directement sur site.",
                color: "#00E5FF",
              },
              {
                step: "02",
                title: "Installation rapide",
                description:
                  "Nos techniciens installent le traceur sur votre véhicule en 45 à 90 minutes. Connexion sur la batterie et le réseau GSM.",
                color: "#A3FF12",
              },
              {
                step: "03",
                title: "Suivi en temps réel",
                description:
                  "Accédez immédiatement à la plateforme web et à l'application mobile. Formation de 30 minutes incluse.",
                color: "#FF6B35",
              },
            ].map((step, i) => (
              <li key={step.step} role="listitem" className="flex flex-col items-center text-center gap-4">
                <div
                  className="h-16 w-16 rounded-2xl flex items-center justify-center font-mono font-black text-2xl"
                  style={{ background: `${step.color}15`, color: step.color }}
                  aria-label={`Étape ${step.step}`}
                >
                  {step.step}
                </div>
                {i < 2 && (
                  <div
                    aria-hidden
                    className="hidden md:block absolute ml-16 mt-8 text-[var(--text-tertiary)]"
                  >
                    →
                  </div>
                )}
                <h3 className="font-display font-semibold text-[var(--text-primary)]">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── PRICING (composant partagé) ── */}
      <PricingSection />

      {/* ── FAQ ── */}
      <section
        className="section-py bg-primary-950"
        aria-labelledby="faq-heading"
      >
        <div className="container-dago max-w-3xl">
          <div className="text-center mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">
              FAQ
            </p>
            <h2
              id="faq-heading"
              className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight"
            >
              Questions fréquentes
            </h2>
          </div>

          <div className="flex flex-col gap-3" role="list">
            {FAQ.map((item) => (
              <details
                key={item.q}
                role="listitem"
                className="group glass rounded-2xl border border-[var(--border)] hover:border-cyan-500/20 transition-colors overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-display font-semibold text-[var(--text-primary)] text-sm">
                  {item.q}
                  <span aria-hidden className="text-cyan-500 shrink-0 group-open:rotate-45 transition-transform duration-200 text-xl leading-none">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNIÈRE FLEET.MG ── */}
      <section className="container-dago mb-12">
        <a
          href="https://fleet.mg"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <span className="text-cyan-400 font-mono font-bold text-lg">F</span>
            </div>
            <div>
              <p className="font-semibold text-[var(--text-primary)] group-hover:text-cyan-400 transition-colors">
                Accéder à la plateforme → <span className="text-cyan-400">fleet.mg</span>
              </p>
              <p className="text-sm text-[var(--text-tertiary)]">
                Gérez votre flotte en temps réel · Interface web & mobile · Historique 12 mois
              </p>
            </div>
          </div>
          <span className="text-sm font-medium text-cyan-400 whitespace-nowrap flex items-center gap-1 shrink-0">
            Ouvrir fleet.mg
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </span>
        </a>
      </section>

      {/* ── CTA FINAL ── */}
      <FinalCTA />
    </>
  );
}
