import type { Metadata } from "next";
import { CONTACT_INFO } from "@/lib/constants/nav";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — DAGO IT Madagascar",
  description: "CGV de DAGO IT : conditions d'achat, livraison, garanties, remboursements.",
};

export default function CGVPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-dago max-w-3xl">
        <h1 className="font-display font-black text-3xl text-[var(--text-primary)] mb-2">
          Conditions Générales de Vente
        </h1>
        <p className="text-sm text-[var(--text-tertiary)] mb-12">
          Dernière mise à jour : janvier 2025
        </p>

        <div className="space-y-10 text-[var(--text-secondary)]">
          {[
            {
              title: "1. Objet",
              content:
                "Les présentes conditions générales de vente régissent les relations contractuelles entre DAGO IT et ses clients dans le cadre de la vente de matériel GPS, d'abonnements de géolocalisation, d'hébergement web et de systèmes d'alarme.",
            },
            {
              title: "2. Commandes",
              content:
                "Toute commande est confirmée par écrit (email ou bon de commande signé). Le contrat est conclu à réception de la confirmation de commande par DAGO IT. DAGO IT se réserve le droit de refuser toute commande pour des motifs légitimes.",
            },
            {
              title: "3. Prix et paiement",
              content:
                "Les prix sont exprimés en Ariary malgache (MGA) TTC. Le paiement s'effectue par virement bancaire, Mobile Money (MVola, Orange Money) ou espèces en agence. Pour les abonnements, la facturation est mensuelle ou annuelle selon l'offre choisie.",
            },
            {
              title: "4. Livraison et installation",
              content:
                "La livraison du matériel est effectuée dans un délai de 3 à 7 jours ouvrés pour Antananarivo, et de 7 à 14 jours pour les autres régions. L'installation est incluse dans les offres mentionnées comme telles. Les frais de déplacement hors Antananarivo sont facturés séparément.",
            },
            {
              title: "5. Garanties",
              content:
                "Le matériel vendu bénéficie d'une garantie constructeur de 12 mois contre les défauts de fabrication. Cette garantie ne couvre pas les dommages liés à une mauvaise utilisation, une surtension électrique, une immersion dans l'eau ou une intervention de tiers non autorisés.",
            },
            {
              title: "6. Abonnements et résiliation",
              content:
                "Les abonnements mensuels sont résiliables à tout moment avec un préavis de 30 jours. Les abonnements annuels prépayés ne sont pas remboursables sauf en cas de défaillance technique imputable à DAGO IT. La résiliation s'effectue par email à " + CONTACT_INFO.email + ".",
            },
            {
              title: "7. Responsabilité",
              content:
                "DAGO IT ne saurait être tenu responsable des pertes ou dommages indirects résultant de l'utilisation ou de l'impossibilité d'utiliser les services fournis. La responsabilité de DAGO IT est limitée au montant des sommes versées par le client au cours des 3 derniers mois.",
            },
            {
              title: "8. Droit applicable",
              content:
                "Les présentes CGV sont soumises au droit malgache. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut, les tribunaux d'Antananarivo sont seuls compétents.",
            },
          ].map((section) => (
            <section key={section.title}>
              <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
                {section.title}
              </h2>
              <p className="leading-relaxed text-sm">{section.content}</p>
            </section>
          ))}

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
              9. Contact
            </h2>
            <p className="text-sm leading-relaxed">
              Pour toute question relative aux présentes CGV :{" "}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {CONTACT_INFO.email}
              </a>{" "}
              — {CONTACT_INFO.address}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
