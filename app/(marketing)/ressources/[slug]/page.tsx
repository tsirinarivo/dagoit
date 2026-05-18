import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Article — DAGO IT Ressources",
  description: "Guide et ressource technique par DAGO IT Madagascar.",
};

export default function RessourceArticlePage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <section className="container-dago py-20 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-cyan-500 mb-4">
          Bientôt disponible
        </p>
        <h1 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] mb-4">
          Article en préparation
        </h1>
        <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
          Ce guide est en cours de rédaction. Revenez bientôt ou consultez nos autres ressources.
        </p>
        <Button variant="secondary" asChild>
          <Link href="/ressources">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux ressources
          </Link>
        </Button>
      </section>
    </div>
  );
}
