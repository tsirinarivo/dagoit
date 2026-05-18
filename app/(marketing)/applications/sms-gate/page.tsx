import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Smartphone, Zap, Shield, GitBranch, Webhook, RefreshCw, Server, ExternalLink } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "SMS Gate — Passerelle SMS via Android · DAGO IT",
  description:
    "Envoyez des SMS depuis n'importe quel système via API REST, en utilisant un téléphone Android comme modem. Routage automatique par opérateur. Production : smsgate.mg",
};

const FEATURES = [
  {
    icon: Zap,
    title: "API REST simple",
    description: "Endpoint unique POST /api/v1/messages. Authentification par clé API (psk_…). Compatible n8n, Zapier, Laravel, Python, Node.js.",
    color: "cyan",
  },
  {
    icon: Smartphone,
    title: "Android comme modem",
    description: "Utilisez un ou plusieurs téléphones Android existants. Pas de carte SIM dédiée à acheter — utilisez votre opérateur local.",
    color: "lime",
  },
  {
    icon: GitBranch,
    title: "Routage automatique",
    description: "Détection automatique de l'opérateur du destinataire (Telma, Orange, Airtel). Le SMS part depuis la SIM du bon opérateur.",
    color: "cyan",
  },
  {
    icon: Server,
    title: "Mode Local & Cloud",
    description: "Déployable sur LAN (réseau local) ou en mode cloud. Failover automatique entre appareils si l'un est indisponible.",
    color: "lime",
  },
  {
    icon: Webhook,
    title: "Webhooks temps réel",
    description: "Événements sms:sent, sms:delivered, sms:failed, sms:received. Votre système est notifié instantanément du statut de chaque SMS.",
    color: "cyan",
  },
  {
    icon: RefreshCw,
    title: "Queue & retry auto",
    description: "Les SMS sont mis en file Laravel Queue. En cas d'échec, retry automatique avec backoff. Zéro message perdu.",
    color: "lime",
  },
  {
    icon: Shield,
    title: "Permissions par clé",
    description: "Chaque clé API a ses propres permissions : envoyer, recevoir, gérer les appareils. Idéal pour multi-tenant.",
    color: "cyan",
  },
  {
    icon: Server,
    title: "Interface d'administration",
    description: "Tableau de bord moderne (Tailwind + Alpine + Lucide). Logs en temps réel, statut des appareils, historique sans rechargement.",
    color: "lime",
  },
];

const CODE_EXAMPLE = `curl -X POST https://smsgate.mg/api/v1/messages \\
  -H "Authorization: Bearer psk_votre_cle_api" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+261320576777",
    "message": "Votre code de vérification : 4821"
  }'`;

export default function SmsGatePage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 30% 50%, rgba(0,229,255,0.08) 0%, transparent 60%), linear-gradient(to bottom, #060e1c, #0a1628)",
          }}
        />
        <div className="container-dago relative py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5">
              <Badge variant="cyan" dot pulse>En production</Badge>
              <a
                href="https://smsgate.mg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                smsgate.mg <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <h1 className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.0] mb-5">
              SMS Gate
              <br />
              <span className="text-cyan-400">Votre Android,</span>
              <br />
              <span className="gradient-text-cyan">votre passerelle SMS.</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
              Envoyez des SMS depuis n&apos;importe quel système via une API REST simple,
              en utilisant un téléphone Android comme modem. Routage automatique
              par opérateur. Webhooks temps réel.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ExternalLink className="h-4 w-4" />}
                asChild
              >
                <a href="https://smsgate.mg" target="_blank" rel="noopener noreferrer">
                  Accéder à SMS Gate
                </a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/devis?app=sms-gate">Intégrer dans mon projet</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Exemple de code */}
      <section className="container-dago py-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3 text-center">
            Intégration en 2 minutes
          </p>
          <h2 className="font-display font-bold text-2xl text-center text-[var(--text-primary)] mb-8">
            Une seule requête HTTP
          </h2>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--border)] bg-black/20">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
              <span className="text-xs font-mono text-[var(--text-tertiary)] ml-2">terminal</span>
            </div>
            <pre className="p-5 text-xs font-mono text-cyan-300 leading-relaxed overflow-x-auto">
              <code>{CODE_EXAMPLE}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-dago pb-20">
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-3">Fonctionnalités</p>
          <h2 className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight">
            Tout ce qu&apos;il faut pour envoyer des SMS
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            const colors = {
              cyan: "text-cyan-400 bg-cyan-500/10",
              lime: "text-lime-400 bg-lime-500/10",
            };
            const c = colors[f.color as keyof typeof colors];
            return (
              <div
                key={f.title}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 hover:border-cyan-500/20 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${c}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container-dago pb-20">
        <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-2">
              Vous avez un projet qui nécessite des SMS ?
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Intégration accompagnée par DAGO IT. Compatible avec tous les systèmes disposant d&apos;une connexion HTTP.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            asChild
          >
            <Link href="/devis?app=sms-gate">Discuter de mon projet</Link>
          </Button>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
