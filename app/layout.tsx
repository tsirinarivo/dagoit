export const dynamic = "force-dynamic";

import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dago-it.com";
const siteUrl = rawSiteUrl.startsWith("http") ? rawSiteUrl : `https://${rawSiteUrl}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | DAGO IT — Solutions Tech Madagascar",
    default: "DAGO IT — Géolocalisation GPS & Solutions Tech Madagascar",
  },
  description:
    "Leader malgache en géolocalisation GPS de véhicules, hébergement web et systèmes d'alarme. Optimisez votre flotte en temps réel. Basé à Antananarivo, Madagascar.",
  keywords: [
    "géolocalisation GPS Madagascar",
    "traceur GPS voiture Madagascar",
    "suivi flotte véhicules",
    "hébergement web Madagascar",
    "dago-it",
    "DAGO IT",
    "alarme entreprise Madagascar",
    "GPS tracker Antananarivo",
  ],
  authors: [{ name: "DAGO IT", url: "https://dago-it.com" }],
  creator: "DAGO IT",
  publisher: "DAGO IT",
  openGraph: {
    type: "website",
    locale: "fr_MG",
    alternateLocale: ["en_US"],
    url: "https://dago-it.com",
    siteName: "DAGO IT",
    title: "DAGO IT — Géolocalisation GPS & Solutions Tech Madagascar",
    description:
      "Maîtrisez votre flotte en temps réel. Solutions GPS professionnelles pour entreprises malgaches.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DAGO IT — Géolocalisation GPS Madagascar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAGO IT — Géolocalisation GPS Madagascar",
    description: "Maîtrisez votre flotte en temps réel.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a1628" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
