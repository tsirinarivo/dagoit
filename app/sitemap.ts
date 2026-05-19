import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/constants/products";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dago-it.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/services/geolocalisation`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/hebergement-web`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/alarme`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/tracking-platform`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/applications`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/applications/grossiste-ppn`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/applications/restaurant-os`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/applications/sms-gate`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/boutique`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/realisations`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/ressources`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/devis`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/legal/cgv`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/mentions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${BASE}/boutique/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
