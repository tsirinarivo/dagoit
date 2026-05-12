import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants/nav";

export const metadata: Metadata = {
  title: "Demander un Devis — DAGO IT Madagascar",
  description:
    "Obtenez un devis gratuit pour votre projet GPS, hébergement web ou système d'alarme. Réponse sous 24h. DAGO IT, Antananarivo Madagascar.",
  openGraph: {
    title: "Devis Gratuit — DAGO IT Madagascar",
    description: "Décrivez votre projet, nous vous répondons sous 24h.",
  },
};

const SERVICES = [
  "Géolocalisation GPS / Flotte",
  "Hébergement Web",
  "Système d'Alarme",
  "Plateforme Tracking",
  "Traceur GPS (achat)",
  "Autre / Combinaison",
];

const GUARANTEES = [
  "Réponse sous 24h ouvrées",
  "Devis gratuit et sans engagement",
  "Conseiller dédié pour votre projet",
  "Visite technique offerte (Antananarivo)",
];

export default function DevisPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="container-dago mb-16">
        <div className="max-w-2xl">
          <Badge variant="online" dot pulse className="mb-6">
            Réponse garantie sous 24h
          </Badge>
          <h1 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-4">
            Demandez votre{" "}
            <span className="gradient-text-cyan">devis gratuit</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Décrivez votre besoin en quelques lignes. Notre équipe analyse votre
            projet et vous envoie une proposition personnalisée sous 24h.
          </p>
        </div>
      </section>

      <section className="container-dago">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          {/* Formulaire */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8">
            <h2 className="font-display font-bold text-xl mb-6 text-[var(--text-primary)]">
              Votre projet
            </h2>

            <form className="space-y-5" action="#" method="POST">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Prénom" name="prenom" placeholder="Jean" required />
                <Input label="Nom" name="nom" placeholder="Rakoto" required />
              </div>

              <Input
                label="Email professionnel"
                name="email"
                type="email"
                placeholder="jean@monentreprise.mg"
                required
              />

              <Input
                label="Téléphone / WhatsApp"
                name="telephone"
                type="tel"
                placeholder="+261 34 00 000 00"
              />

              <Input
                label="Entreprise"
                name="entreprise"
                placeholder="Nom de votre société"
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--text-secondary)]">
                  Service concerné <span aria-hidden className="text-orange-400 ml-1">*</span>
                </label>
                <select
                  name="service"
                  required
                  className="w-full h-11 rounded-xl px-4 text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                >
                  <option value="">Sélectionner un service…</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--text-secondary)]">
                  Nombre de véhicules / utilisateurs
                </label>
                <select
                  name="volume"
                  className="w-full h-11 rounded-xl px-4 text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                >
                  <option value="">Non applicable</option>
                  <option value="1-5">1 à 5</option>
                  <option value="6-20">6 à 20</option>
                  <option value="21-50">21 à 50</option>
                  <option value="51+">Plus de 50</option>
                </select>
              </div>

              <Textarea
                label="Décrivez votre besoin"
                name="message"
                placeholder="Ex : Je gère une flotte de 12 ambulances à Antananarivo. Je cherche une solution GPS avec alertes temps réel et rapport mensuel…"
                required
              />

              <Button variant="primary" size="lg" type="submit" className="w-full">
                Envoyer ma demande
              </Button>

              <p className="text-xs text-[var(--text-tertiary)] text-center">
                En soumettant ce formulaire, vous acceptez d'être contacté par DAGO IT concernant votre projet.
              </p>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Garanties */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                Ce que vous obtenez
              </h3>
              <ul className="space-y-3">
                {GUARANTEES.map((g) => (
                  <li key={g} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-[var(--text-secondary)]">{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact direct */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                Contact direct
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-cyan-400 shrink-0" />
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="text-sm text-[var(--text-secondary)] hover:text-cyan-400 transition-colors"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-cyan-400 shrink-0" />
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-sm text-[var(--text-secondary)] hover:text-cyan-400 transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--text-secondary)]">
                    {CONTACT_INFO.address}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span className="text-sm text-[var(--text-secondary)]">
                    Lun–Ven 8h–17h • Sam 8h–12h
                  </span>
                </li>
              </ul>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Bonjour%20DAGO%20IT%2C%20je%20souhaite%20un%20devis%20pour%20`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-green-600/10 border border-green-600/30 text-green-400 hover:bg-green-600/20 transition-colors text-sm font-medium"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contacter via WhatsApp
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}
