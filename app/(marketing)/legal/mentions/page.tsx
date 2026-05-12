import type { Metadata } from "next";
import { CONTACT_INFO } from "@/lib/constants/nav";

export const metadata: Metadata = {
  title: "Mentions Légales — DAGO IT Madagascar",
  description: "Mentions légales de DAGO IT — éditeur, hébergeur, responsabilités.",
};

export default function MentionsPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container-dago max-w-3xl">
        <h1 className="font-display font-black text-3xl text-[var(--text-primary)] mb-2">
          Mentions légales
        </h1>
        <p className="text-sm text-[var(--text-tertiary)] mb-12">
          Dernière mise à jour : janvier 2025
        </p>

        <div className="prose prose-invert max-w-none space-y-10 text-[var(--text-secondary)]">
          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
              1. Éditeur du site
            </h2>
            <p className="leading-relaxed">
              Le site <strong className="text-[var(--text-primary)]">dago-it.com</strong> est édité par la société{" "}
              <strong className="text-[var(--text-primary)]">DAGO IT</strong>, entreprise de droit malgache.
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><span className="text-[var(--text-tertiary)]">Siège social :</span> {CONTACT_INFO.address}</li>
              <li><span className="text-[var(--text-tertiary)]">Email :</span> {CONTACT_INFO.email}</li>
              <li><span className="text-[var(--text-tertiary)]">Téléphone :</span> {CONTACT_INFO.phone}</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
              2. Hébergement
            </h2>
            <p className="leading-relaxed text-sm">
              Ce site est hébergé sur des serveurs VPS dédiés opérés par DAGO IT et ses
              partenaires d'infrastructure. Les données sont stockées en Union Européenne.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
              3. Propriété intellectuelle
            </h2>
            <p className="leading-relaxed text-sm">
              L'ensemble du contenu de ce site (textes, images, logos, code) est la
              propriété exclusive de DAGO IT ou de ses partenaires. Toute reproduction,
              même partielle, est interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
              4. Responsabilité
            </h2>
            <p className="leading-relaxed text-sm">
              DAGO IT s'efforce de maintenir les informations publiées sur ce site à jour
              et exactes, mais ne peut garantir l'exactitude, l'exhaustivité ou l'actualité
              des informations diffusées. L'utilisation des informations et des services
              proposés sur ce site se fait sous la seule responsabilité de l'utilisateur.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
              5. Contact
            </h2>
            <p className="leading-relaxed text-sm">
              Pour toute question relative aux présentes mentions légales, vous pouvez nous
              contacter à l'adresse{" "}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {CONTACT_INFO.email}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
