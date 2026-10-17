import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ClientsBar } from "@/components/sections/ClientsBar";
import { WhyDagoIT } from "@/components/sections/WhyDagoIT";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { PricingSection } from "@/components/sections/PricingSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "DAGO IT — Géolocalisation GPS & Solutions Tech Madagascar",
  description:
    "Spécialiste malgache de la géolocalisation GPS de véhicules et de l'hébergement web haute performance. Suivez votre flotte en temps réel depuis Toamasina.",
  openGraph: {
    title: "DAGO IT — Maîtrisez votre flotte en temps réel",
    description:
      "Géolocalisation GPS professionnelle pour flottes malgaches. Dès 32 500 Ar/mois.",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Données structurées Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "DAGO IT",
            description:
              "Solutions de géolocalisation GPS professionnelle et hébergement web à Madagascar.",
            url: "https://dago-it.com",
            telephone: "+261320576777",
            email: "contact@dago-it.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Villa Irintsara, Andranomadio",
              addressLocality: "Toamasina",
              postalCode: "501",
              addressCountry: "MG",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -18.1443,
              longitude: 49.3915,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "08:00",
                closes: "17:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "08:00",
                closes: "12:00",
              },
            ],
            priceRange: "32500 Ar – 55000 Ar/mois",
            currenciesAccepted: "MGA, EUR",
            paymentAccepted: "Mvola, Orange Money, Airtel Money, Carte bancaire, Virement",
            areaServed: "Madagascar",
            sameAs: [
              "https://www.facebook.com/dagoit1/",
              "https://linkedin.com/company/dagoit",
            ],
          }),
        }}
      />

      <HeroSection />
      <ClientsBar />
      <WhyDagoIT />
      <ServicesGrid />
      <PricingSection />
      <StatsSection />
      <FinalCTA />
    </>
  );
}
