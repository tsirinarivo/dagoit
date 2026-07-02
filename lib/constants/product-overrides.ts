import type { Product } from "@/lib/constants/products";

/**
 * Enrichissements marketing par SKU ERP.
 * L'ERP est source de vérité pour : prix, stock, description, image principale.
 * Ici on ajoute uniquement ce qui est éditorial :
 *   - badges ("Promo", "Nouveau", "Best-seller")
 *   - priceOld (prix barré)
 *   - specs (fiche technique détaillée)
 *   - compatible (opérateurs télé)
 *   - images additionnelles
 *   - slug personnalisé (SEO)
 *   - shortDescription retravaillée
 */
export const PRODUCT_OVERRIDES: Record<string, Partial<Product>> = {
  // Exemple — remplacez "GPS303" par le vrai SKU renvoyé par l'ERP :
  //
  // "GPS303": {
  //   slug: "traceur-gps-gps303",
  //   badges: ["bestseller"],
  //   compatible: ["Telma", "Orange Madagascar", "Airtel Madagascar"],
  //   specs: {
  //     "Réseau": "GSM/GPRS 2G/3G",
  //     "GPS": "SiRF Star III, 20 canaux",
  //     "Batterie": "1000 mAh Li-ion",
  //     "Autonomie": "Jusqu'à 72h en veille",
  //     "Étanchéité": "IP67",
  //     "Poids": "78g",
  //   },
  //   images: [
  //     "/images/products/gps303-1.jpg",
  //     "/images/products/gps303-2.jpg",
  //   ],
  // },
  //
  // "E5172": {
  //   slug: "routeur-wifi-huawei-e5172",
  //   badges: ["promo"],
  //   priceOld: 220000,
  //   compatible: ["Telma 4G", "Orange 4G", "Airtel 4G"],
  //   specs: {
  //     "Débit max": "150 Mbps (DL) / 50 Mbps (UL)",
  //     "Connexions": "32 appareils",
  //     "Batterie": "3000 mAh",
  //   },
  // },
};
