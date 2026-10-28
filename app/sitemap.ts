import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/constants/products";
import { BOUTIQUE_ENABLED } from "@/lib/constants/nav";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dago-it.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/geolocalisation`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/hebergement-web`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/ressources`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/devis`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/legal/cgv`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/mentions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  if (!BOUTIQUE_ENABLED) {
    return staticPages;
  }

  const boutiquePages: MetadataRoute.Sitemap = [
    { url: `${BASE}/boutique`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...PRODUCTS.map((p) => ({
      url: `${BASE}/boutique/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return [...staticPages, ...boutiquePages];
}
