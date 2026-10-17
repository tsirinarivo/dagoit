import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dago-it.com";
const BOUTIQUE_ENABLED = process.env.NEXT_PUBLIC_BOUTIQUE_ENABLED !== "false";

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/compte/", "/api/", "/checkout", "/maintenance"];
  if (!BOUTIQUE_ENABLED) disallow.push("/boutique", "/boutique/");

  return {
    rules: [{ userAgent: "*", allow: "/", disallow }],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
