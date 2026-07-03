import type { Metadata } from "next";
import { Suspense } from "react";
import { BoutiqueContent } from "./BoutiqueContent";
import { getCatalog } from "@/lib/erp";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Boutique GPS & Accessoires Tech — DAGO IT Madagascar",
  description:
    "Achetez vos traceurs GPS, routeurs WiFi 4G, montres connectées et systèmes d'alarme. Paiement Mvola, Orange Money, carte bancaire. Livraison Antananarivo.",
  keywords: [
    "achat traceur GPS Madagascar",
    "traceur GPS prix Madagascar",
    "routeur WiFi 4G Madagascar",
    "montre GPS enfant Madagascar",
    "alarme maison Madagascar",
  ],
};

export default async function BoutiquePage() {
  const products = await getCatalog();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "DAGO IT Boutique",
            url: "https://dago-it.com/boutique",
            description: "Boutique en ligne de matériel GPS et accessoires tech.",
            currenciesAccepted: "MGA",
            paymentAccepted: "Mvola, Orange Money, Airtel Money, Carte bancaire",
          }),
        }}
      />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
          </div>
        }
      >
        <BoutiqueContent products={products} />
      </Suspense>
    </>
  );
}
