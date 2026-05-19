import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Users, Zap, Shield } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "À Propos — DAGO IT Madagascar",
  description:
    "DAGO IT : 8 ans d'expertise en géolocalisation GPS, hébergement web et systèmes d'alarme à Madagascar. Notre mission, notre équipe, nos valeurs.",
  openGraph: {
    title: "À Propos de DAGO IT — Tech Made in Madagascar",
    description: "8 ans d'expertise tech au service des entreprises malgaches.",
  },
};

const STATS = [
  { value: "2016", label: "Année de création" },
  { value: "500+", label: "Véhicules suivis" },
  { value: "200+", label: "Clients actifs" },
  { value: "99.8%", label: "Uptime plateforme" },
];

const VALUES = [
  {
    icon: Target,
    title: "Proximité",
    description:
      "Nous connaissons la réalité du terrain malgache : routes, connectivité, contraintes locales. Nos solutions sont pensées pour Madagascar.",
  },
  {
    icon: Zap,
    title: "Réactivité",
    description:
      "Support technique disponible 6j/7. Intervention sur site à Antananarivo sous 48h. Astreinte pour les parcs critiques.",
  },
  {
    icon: Shield,
    title: "Fiabilité",
    description:
      "Infrastructure redondante, traceurs testés en conditions réelles, plateforme maintenue 24h/24. Vos données sont toujours disponibles.",
  },
  {
    icon: Users,
    title: "Partenariat",
    description:
      "Nous ne vendons pas juste du matériel. Nous accompagnons chaque client sur la durée : formation, optimisation, évolution du parc.",
  },
];

const TIMELINE = [
  {
    year: "2016",
    title: "Fondation de DAGO IT",
    description:
      "Lancement à Antananarivo avec un premier contrat de géolocalisation pour une flotte de taxi.",
  },
  {
    year: "2018",
    title: "Lancement de la plateforme Tracking",
    description:
      "Développement en interne d'une plateforme de suivi temps réel adaptée aux réseaux mobiles malgaches.",
  },
  {
    year: "2020",
    title: "Extension aux services d'hébergement",
    description:
      "Ouverture de DAGO Hosting pour répondre aux besoins web des entreprises partenaires.",
  },
  {
    year: "2022",
    title: "Division Alarmes & Sécurité",
    description:
      "Lancement des systèmes d'alarme intégrés pour PME, résidences et sites industriels.",
  },
  {
    year: "2024",
    title: "500+ véhicules suivis",
    description:
      "Franchissement du cap des 500 véhicules actifs sur la plateforme, avec des clients dans 6 régions de Madagascar.",
  },
];

export default function AProposPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="container-dago mb-20">
        <div className="max-w-3xl">
          <Badge variant="neutral" className="mb-6">
            Fondée en 2016 · Antananarivo
          </Badge>
          <h1 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-6">
            La tech au service des{" "}
            <span className="gradient-text-cyan">entreprises malgaches</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl">
            DAGO IT est une entreprise malgache spécialisée dans la géolocalisation
            GPS, l'hébergement web et les systèmes d'alarme. Depuis 2016, nous
            accompagnons les PME, transporteurs et institutions de Madagascar dans
            leur transformation digitale.
          </p>
          <Button variant="primary" size="lg" asChild rightIcon={<ArrowRight className="h-4 w-4" />}>
            <Link href="/devis">Démarrer un projet</Link>
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="container-dago mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 text-center"
            >
              <p className="font-display font-black text-4xl text-cyan-400 mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-[var(--text-tertiary)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="container-dago mb-20">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 lg:p-12">
          <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-4">
            Notre mission
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed text-lg max-w-3xl">
            Rendre accessibles aux entreprises malgaches les outils technologiques
            qui transforment leur efficacité opérationnelle. Que vous gérez une
            flotte de deux camions ou d'une centaine de véhicules, vous méritez
            les mêmes outils que les grandes entreprises — adaptés à votre réalité
            et à votre budget.
          </p>
        </div>
      </section>

      {/* Valeurs */}
      <section className="container-dago mb-20">
        <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-8">
          Nos valeurs
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 hover:border-cyan-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="container-dago mb-20">
        <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-10">
          Notre parcours
        </h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--border)]" aria-hidden />
          <div className="space-y-8">
            {TIMELINE.map((item) => (
              <div key={item.year} className="flex gap-6 pl-0">
                <div className="relative z-10 w-12 h-12 rounded-full bg-[var(--background)] border-2 border-cyan-500 flex items-center justify-center shrink-0">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {item.year.slice(2)}
                  </span>
                </div>
                <div className="pt-2 pb-2">
                  <p className="text-xs text-cyan-400 font-mono mb-1">{item.year}</p>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
