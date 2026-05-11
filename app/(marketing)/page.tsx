import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ClientsBar } from "@/components/sections/ClientsBar";
import { WhyDagoIT } from "@/components/sections/WhyDagoIT";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { PricingSection } from "@/components/sections/PricingSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "DAGO IT — Géolocalisation GPS & Solutions Tech Madagascar",
  description:
    "Leader malgache en géolocalisation GPS de véhicules, hébergement web et systèmes d'alarme. Suivez votre flotte en temps réel depuis Antananarivo.",
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
              "Solutions de géolocalisation GPS professionnelle, hébergement web et systèmes d'alarme à Madagascar.",
            url: "https://dago-it.com",
            telephone: "+261340000000",
            email: "contact@dago-it.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Lot IVT 53, Andraharo",
              addressLocality: "Antananarivo",
              postalCode: "101",
              addressCountry: "MG",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -18.9249,
              longitude: 47.5185,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "08:00",
                closes: "18:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "08:00",
                closes: "12:00",
              },
            ],
            priceRange: "32500 Ar – 95000 Ar/mois",
            currenciesAccepted: "MGA, EUR",
            paymentAccepted: "Mvola, Orange Money, Airtel Money, Carte bancaire, Virement",
            areaServed: "Madagascar",
            sameAs: [
              "https://facebook.com/dagoit",
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
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
}
