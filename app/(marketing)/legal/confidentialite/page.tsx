import type { Metadata } from "next";
import { CONTACT_INFO } from "@/lib/constants/nav";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — DAGO IT Madagascar",
  description:
    "Comment DAGO IT collecte, utilise et protège vos données personnelles.",
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-dago max-w-3xl">
        <h1 className="font-display font-black text-3xl text-[var(--text-primary)] mb-2">
          Politique de Confidentialité
        </h1>
        <p className="text-sm text-[var(--text-tertiary)] mb-12">
          Dernière mise à jour : janvier 2025
        </p>

        <div className="space-y-10 text-[var(--text-secondary)]">
          {[
            {
              title: "1. Responsable du traitement",
              content:
                "DAGO IT, dont le siège social est situé " + CONTACT_INFO.address + ", est responsable du traitement de vos données personnelles collectées via ce site.",
            },
            {
              title: "2. Données collectées",
              content:
                "Nous collectons les données que vous nous fournissez volontairement via nos formulaires : nom, prénom, email, numéro de téléphone, nom de l'entreprise. Pour les clients abonnés, nous collectons également les données de géolocalisation des véhicules déclarés dans le contrat.",
            },
            {
              title: "3. Finalités du traitement",
              content:
                "Vos données sont utilisées pour : répondre à vos demandes de devis et de contact, gérer vos abonnements et contrats, vous envoyer des informations relatives à nos services (avec votre consentement), améliorer nos services et notre support technique.",
            },
            {
              title: "4. Données de géolocalisation",
              content:
                "Les données GPS collectées par nos traceurs concernent exclusivement les véhicules de votre flotte professionnelle, tels que définis dans votre contrat. Ces données sont accessibles uniquement par vous et par les équipes techniques de DAGO IT dans le cadre du support. Elles ne sont jamais revendues à des tiers.",
            },
            {
              title: "5. Conservation des données",
              content:
                "Les données de contact sont conservées 3 ans après le dernier contact. Les données de géolocalisation sont conservées 12 mois puis archivées ou supprimées selon votre demande. Les données de facturation sont conservées 10 ans conformément aux obligations légales.",
            },
            {
              title: "6. Partage des données",
              content:
                "Nous ne vendons jamais vos données personnelles. Nous pouvons partager certaines données avec nos sous-traitants techniques (hébergement, envoi d'emails) dans le cadre strict de la fourniture du service, sous contrat de confidentialité.",
            },
            {
              title: "7. Vos droits",
              content:
                "Conformément à la réglementation applicable, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à " + CONTACT_INFO.email + ". Nous traiterons votre demande dans un délai de 30 jours.",
            },
            {
              title: "8. Cookies",
              content:
                "Ce site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire ou de tracking tiers n'est utilisé. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.",
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
              9. Contact DPO
            </h2>
            <p className="text-sm leading-relaxed">
              Pour toute question relative à la protection de vos données :{" "}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
