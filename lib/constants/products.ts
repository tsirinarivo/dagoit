/** Catégorie produit — string libre (slug) pour accepter les catégories venant de l'ERP. */
export type ProductCategory = string;

/** Libellés + emojis pour les catégories "officielles" (fallback dérivé du slug sinon). */
export const CATEGORY_LABELS: Record<string, { label: string; emoji: string }> = {
  "traceurs-gps": { label: "Traceurs GPS", emoji: "📡" },
  "routeurs-wifi": { label: "Routeurs WiFi", emoji: "📶" },
  "montres-connectees": { label: "Montres", emoji: "⌚" },
  "alarmes": { label: "Alarmes", emoji: "🔔" },
  "accessoires": { label: "Accessoires", emoji: "🔧" },
  "divers": { label: "Divers", emoji: "📦" },
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  priceOld?: number;
  stock: "in_stock" | "low_stock" | "out_of_stock";
  badges?: Array<"new" | "promo" | "bestseller">;
  images: string[];
  shortDescription: string;
  description: string;
  specs: Record<string, string>;
  compatible?: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "gps-303",
    slug: "traceur-gps-gps303",
    name: "Traceur GPS GPS303",
    brand: "DAGO IT",
    category: "traceurs-gps",
    price: 250000,
    stock: "in_stock",
    badges: ["bestseller"],
    images: ["/images/products/gps303-1.jpg", "/images/products/gps303-2.jpg"],
    shortDescription:
      "Traceur GPS compact waterproof. Suivi temps réel, écoute à distance, alerte SOS.",
    description: `Le GPS303 est notre traceur GPS le plus populaire, idéal pour la surveillance de véhicules, motos et actifs de valeur à Madagascar.

    Sa conception robuste (IP67) lui permet de résister aux conditions difficiles des routes malgaches. Compatible avec toutes les offres d'abonnement DAGO IT.`,
    specs: {
      "Réseau": "GSM/GPRS 2G/3G",
      "GPS": "SiRF Star III, 20 canaux",
      "Batterie": "1000 mAh Li-ion",
      "Autonomie batterie": "Jusqu'à 72h en veille",
      "Précision GPS": "5-10 mètres",
      "Dimensions": "75 × 45 × 20 mm",
      "Poids": "78g",
      "Étanchéité": "IP67 (immersion 1m/30min)",
      "Température": "-20°C à +70°C",
      "Tensions d'entrée": "9-90V DC",
    },
    compatible: ["Telma", "Orange Madagascar", "Airtel Madagascar"],
  },
  {
    id: "huawei-e5172",
    slug: "routeur-wifi-huawei-e5172",
    name: "Routeur WiFi 4G Huawei E5172",
    brand: "Huawei",
    category: "routeurs-wifi",
    price: 180000,
    priceOld: 220000,
    stock: "in_stock",
    badges: ["promo"],
    images: [
      "/images/products/huawei-e5172-1.jpg",
      "/images/products/huawei-e5172-2.jpg",
    ],
    shortDescription:
      "Routeur WiFi 4G LTE haute performance. Jusqu'à 32 connexions simultanées.",
    description: `Le Huawei E5172 est un routeur WiFi 4G LTE professionnel parfait pour les bureaux, points de vente et véhicules en déplacement à Madagascar.

    Compatible avec les réseaux 4G Telma, Orange et Airtel Madagascar, il offre une connectivité stable et rapide partout dans le pays.`,
    specs: {
      "Réseau": "4G LTE / 3G / 2G",
      "Débit max": "150 Mbps (DL) / 50 Mbps (UL)",
      "WiFi": "802.11 b/g/n, 2.4GHz",
      "Connexions simultanées": "32 appareils",
      "Ports LAN": "1x RJ45 Gigabit",
      "Batterie": "3000 mAh",
      "Autonomie": "8h en utilisation active",
      "SIM": "Micro-SIM, toutes opérateurs MG",
    },
    compatible: ["Telma 4G", "Orange 4G", "Airtel 4G"],
  },
  {
    id: "alcatel-ee120",
    slug: "routeur-wifi-alcatel-ee120",
    name: "Routeur WiFi 4G Alcatel EE120",
    brand: "Alcatel",
    category: "routeurs-wifi",
    price: 145000,
    stock: "in_stock",
    badges: ["new"],
    images: [
      "/images/products/alcatel-ee120-1.jpg",
      "/images/products/alcatel-ee120-2.jpg",
    ],
    shortDescription:
      "Point d'accès WiFi 4G compact. Idéal pour usage nomade et professionnel.",
    description: `L'Alcatel EE120 est un hotspot WiFi 4G ultra-compact pour les professionnels en déplacement.

    Son design poche et sa batterie longue durée en font le compagnon idéal des équipes terrain à Madagascar.`,
    specs: {
      "Réseau": "4G LTE Cat.4",
      "Débit max": "150 Mbps (DL)",
      "WiFi": "802.11 a/b/g/n/ac, 2.4GHz + 5GHz",
      "Connexions simultanées": "16 appareils",
      "Batterie": "2400 mAh",
      "Autonomie": "10h",
      "Écran": "2.4\" tactile couleur",
    },
    compatible: ["Telma 4G", "Orange 4G", "Airtel 4G"],
  },
  {
    id: "montre-q90",
    slug: "montre-connectee-q90-enfant",
    name: "Montre Connectée GPS Q90 Enfant",
    brand: "Q90",
    category: "montres-connectees",
    price: 175000,
    stock: "low_stock",
    badges: ["bestseller"],
    images: [
      "/images/products/q90-1.jpg",
      "/images/products/q90-2.jpg",
      "/images/products/q90-3.jpg",
    ],
    shortDescription:
      "Montre GPS enfant avec suivi en temps réel, appels SOS et zone de sécurité.",
    description: `La montre Q90 est conçue pour rassurer les parents malgaches. Suivez la position de vos enfants en temps réel, recevez des alertes quand ils sortent de la zone définie (école, maison) et communiquez avec eux directement depuis l'application.`,
    specs: {
      "Réseau": "2G GSM",
      "GPS": "Tri-positionnement (GPS + LBS + WiFi)",
      "Écran": "1.22\" couleur tactile",
      "Batterie": "600 mAh",
      "Autonomie": "24-48h",
      "Étanchéité": "IP67",
      "Appels": "Bidirectionnel (2 numéros)",
      "SOS": "Bouton d'urgence",
      "Compatibilité app": "iOS 8+ / Android 4.4+",
    },
    compatible: ["Telma", "Orange Madagascar", "Airtel"],
  },
  {
    id: "alarme-pro-kit",
    slug: "kit-alarme-professionnel",
    name: "Kit Alarme Professionnel Pro 8Z",
    brand: "DAGO IT",
    category: "alarmes",
    price: 480000,
    stock: "in_stock",
    badges: ["new"],
    images: [
      "/images/products/alarme-pro-1.jpg",
      "/images/products/alarme-pro-2.jpg",
    ],
    shortDescription:
      "Système d'alarme complet pour entreprise. 8 zones, GSM + WiFi, sirène 110dB.",
    description: `Le kit Pro 8Z est notre solution d'alarme professionnelle pour entreprises et commerces à Madagascar.

    Inclut centrale alarme, 4 capteurs de mouvement PIR, 2 détecteurs ouverture portes/fenêtres, sirène extérieure 110dB, clavier code + télécommandes.`,
    specs: {
      "Zones": "8 zones (extensible à 32)",
      "Communication": "GSM 4G + WiFi + filaire",
      "Batterie secours": "12V 7Ah (8h d'autonomie)",
      "Sirène": "110 dB, intérieure + extérieure",
      "Notifications": "SMS + appel + application",
      "Codes utilisateurs": "32 codes",
      "Télécommandes": "4 incluses",
      "Norme": "CE, RoHS",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}
