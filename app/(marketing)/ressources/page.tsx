import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Video, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/atoms/Badge";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Ressources & Guides — DAGO IT Madagascar",
  description:
    "Guides pratiques, FAQ, tutoriels vidéo et documentation technique sur la géolocalisation GPS, l'hébergement web et les systèmes d'alarme à Madagascar.",
  openGraph: {
    title: "Ressources DAGO IT — Guides Tech Madagascar",
    description: "Guides GPS, hébergement et alarmes pour les entreprises malgaches.",
  },
};

const GUIDES = [
  {
    category: "GPS & Tracking",
    color: "cyan" as const,
    icon: <BookOpen className="h-5 w-5" />,
    articles: [
      {
        title: "Comment choisir son traceur GPS à Madagascar",
        excerpt: "Critères de sélection, compatibilité réseau GSM, autonomie batterie, coût total de possession. Guide complet pour 2025.",
        readTime: "8 min",
        tag: "Guide",
      },
      {
        title: "Géofencing : définir et gérer des zones virtuelles",
        excerpt: "Tutoriel pas à pas pour créer vos premières zones de géofencing sur la plateforme DAGO IT. Alertes entrée/sortie.",
        readTime: "5 min",
        tag: "Tutoriel",
      },
      {
        title: "Réduire sa consommation de carburant avec le GPS",
        excerpt: "Comment analyser les rapports de conduite pour identifier les pertes et économiser jusqu'à 30% sur votre flotte.",
        readTime: "6 min",
        tag: "Conseil",
      },
      {
        title: "GPS dans les zones rurales de Madagascar",
        excerpt: "Fonctionnement en mode hors-réseau, synchronisation différée, couverture GSM par opérateur (Telma, Orange, Airtel).",
        readTime: "4 min",
        tag: "Technique",
      },
    ],
  },
  {
    category: "Hébergement Web",
    color: "lime" as const,
    icon: <FileText className="h-5 w-5" />,
    articles: [
      {
        title: "Migrer son site WordPress vers DAGO IT Hosting",
        excerpt: "Checklist complète : export de la base de données, transfert des fichiers, reconfiguration DNS, tests post-migration.",
        readTime: "10 min",
        tag: "Guide",
      },
      {
        title: "Configurer son email professionnel avec cPanel",
        excerpt: "Créer des adresses @votre-domaine.mg, configurer Outlook et Gmail, activer l'antispam. Tutoriel illustré.",
        readTime: "7 min",
        tag: "Tutoriel",
      },
      {
        title: "Optimiser la vitesse de son site pour Madagascar",
        excerpt: "Images WebP, cache LiteSpeed, compression Gzip, CDN local. Les réglages qui font passer votre site de 8s à 1s.",
        readTime: "9 min",
        tag: "Performance",
      },
    ],
  },
  {
    category: "Alarmes & Sécurité",
    color: "orange" as const,
    icon: <HelpCircle className="h-5 w-5" />,
    articles: [
      {
        title: "Évaluer les risques sécuritaires de votre local",
        excerpt: "Méthodologie pour identifier les points d'entrée vulnérables, les angles morts et les priorités d'installation.",
        readTime: "6 min",
        tag: "Guide",
      },
      {
        title: "Alarme sans fil vs câblée : que choisir ?",
        excerpt: "Comparatif technique, coûts d'installation, fiabilité, évolutivité. Recommandations selon le type de bâtiment.",
        readTime: "5 min",
        tag: "Comparatif",
      },
      {
        title: "Que faire en cas d'intrusion ? Procédures d'urgence",
        excerpt: "Protocoles recommandés pour réagir efficacement : ne pas intervenir seul, contacter le 117, préserver les preuves.",
        readTime: "3 min",
        tag: "Sécurité",
      },
    ],
  },
];

const FAQ_GENERAL = [
  {
    q: "DAGO IT intervient-il en dehors d'Antananarivo ?",
    a: "Oui. Nous intervenons régulièrement à Toamasina, Antsirabe, Mahajanga, Fianarantsoa et Toliara pour les flottes de 5 véhicules et plus. Des frais de déplacement s'appliquent selon la distance.",
  },
  {
    q: "Comment puis-je payer ? Mvola, Orange Money acceptés ?",
    a: "Oui. Nous acceptons les paiements par Mvola, Orange Money, carte bancaire (Visa/Mastercard) et virement bancaire. Le paiement en espèces est possible pour les commandes en agence à Antananarivo.",
  },
  {
    q: "Proposez-vous des contrats de maintenance ?",
    a: "Oui, tous nos services incluent une maintenance de base. Des contrats premium avec interventions prioritaires sous 4h et remplacement matériel garanti sont disponibles pour les flottes et sites critiques.",
  },
  {
    q: "Puis-je essayer avant d'acheter ?",
    a: "Pour le GPS : oui, nous proposons une démo gratuite de 7 jours sur 1 véhicule. Pour l'hébergement : 30 jours satisfait ou remboursé. Pour les alarmes : démonstration sur site gratuite.",
  },
  {
    q: "Avez-vous des références dans mon secteur ?",
    a: "Nous travaillons avec des cliniques, hôtels, ONG, transporteurs, entreprises BTP et commerces. Consultez notre page Réalisations ou contactez-nous pour une référence spécifique à votre secteur.",
  },
];

const colorMap = {
  cyan: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  lime: "bg-lime-500/10 text-lime-500 border-lime-500/20",
  orange: "bg-orange-500/10 text-orange-500 border-orange-500/20",
};

const tagColorMap: Record<string, string> = {
  Guide: "bg-cyan-500/10 text-cyan-500",
  Tutoriel: "bg-lime-500/10 text-lime-500",
  Conseil: "bg-orange-500/10 text-orange-500",
  Technique: "bg-cyan-500/10 text-cyan-400",
  Performance: "bg-lime-500/10 text-lime-400",
  Comparatif: "bg-orange-500/10 text-orange-400",
  Sécurité: "bg-orange-500/10 text-orange-500",
};

export default function RessourcesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-24">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 70% at 50% 50%, rgba(11,58,111,0.4) 0%, transparent 60%), linear-gradient(to bottom, #060e1c, #0a1628)`,
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-dot opacity-20 pointer-events-none" />

        <div className="container-dago relative py-16 text-center">
          <Badge variant="cyan" className="mb-6">Centre de ressources</Badge>
          <h1 className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.0] mb-5 text-balance">
            Guides & ressources
            <br />
            <span className="gradient-text-cyan">pour votre entreprise</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">
            Guides pratiques, tutoriels et conseils pour tirer le meilleur de vos solutions DAGO IT.
          </p>
        </div>
      </section>

      {/* ── GUIDES PAR CATÉGORIE ── */}
      <section className="section-py" aria-labelledby="guides-heading">
        <div className="container-dago">
          <div className="flex flex-col gap-16">
            {GUIDES.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-3 mb-8">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${colorMap[cat.color]}`} aria-hidden>
                    {cat.icon}
                  </div>
                  <h2 className="font-display font-black text-xl text-[var(--text-primary)]">{cat.category}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cat.articles.map((article) => (
                    <article
                      key={article.title}
                      className="flex flex-col gap-3 p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-cyan-500/20 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${tagColorMap[article.tag] ?? "bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]"}`}>
                          {article.tag}
                        </span>
                        <span className="text-xs text-[var(--text-tertiary)]">{article.readTime}</span>
                      </div>
                      <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] leading-snug group-hover:text-cyan-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed flex-1">
                        {article.excerpt}
                      </p>
                      <span className="text-xs text-cyan-500 flex items-center gap-1 mt-auto">
                        Lire l'article <ArrowRight className="h-3 w-3" />
                      </span>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ GÉNÉRALE ── */}
      <section className="section-py bg-primary-950" aria-labelledby="faq-heading">
        <div className="container-dago max-w-3xl">
          <div className="text-center mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">FAQ</p>
            <h2 id="faq-heading" className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
              Questions fréquentes
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQ_GENERAL.map((item) => (
              <details
                key={item.q}
                className="group glass rounded-2xl border border-[var(--border)] hover:border-cyan-500/20 transition-colors overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-display font-semibold text-[var(--text-primary)] text-sm">
                  {item.q}
                  <span aria-hidden className="text-cyan-500 shrink-0 group-open:rotate-45 transition-transform duration-200 text-xl leading-none">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA CONTACT ── */}
      <section className="section-py">
        <div className="container-dago max-w-2xl text-center">
          <h2 className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4">
            Vous ne trouvez pas
            <br />
            <span className="gradient-text-cyan">votre réponse ?</span>
          </h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Notre équipe répond à toutes vos questions par téléphone, WhatsApp ou email, en français et en malgache.
          </p>
          <Button variant="primary" size="lg" magnetic rightIcon={<ArrowRight className="h-4 w-4" />} asChild>
            <Link href="/contact">Contacter l'équipe</Link>
          </Button>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
