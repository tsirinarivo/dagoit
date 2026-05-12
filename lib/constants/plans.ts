export type PlanFeature = {
  label: string;
  included: boolean;
  note?: string;
};

export type GPSPlan = {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  hardwarePrice: number;
  color: "cyan" | "lime" | "orange" | "primary";
  popular?: boolean;
  features: PlanFeature[];
  ideal: string;
};

const COMMON_FEATURES: PlanFeature[] = [
  { label: "Suivi temps réel", included: true },
  { label: "Historique de trajet", included: true },
  { label: "Application mobile iOS & Android", included: true },
  { label: "Rapport kilométrique mensuel", included: true },
  { label: "Coupe-moteur à distance", included: true },
  { label: "Géofencing (zones virtuelles)", included: true },
  { label: "Identification chauffeur", included: true },
  { label: "Support technique", included: true },
];

export const GPS_PLANS: GPSPlan[] = [
  {
    id: "track",
    name: "Track",
    tagline: "L'essentiel du suivi GPS",
    priceMonthly: 27500,
    priceAnnual: 275000,
    hardwarePrice: 250000,
    color: "primary",
    ideal: "Particuliers & petites flottes",
    features: [
      ...COMMON_FEATURES,
      { label: "Alertes SMS", included: false },
      { label: "Support dédié + gestionnaire de compte", included: false },
    ],
  },
  {
    id: "serenite",
    name: "Sérénité",
    tagline: "Suivi GPS avec alertes SMS",
    priceMonthly: 30000,
    priceAnnual: 300000,
    hardwarePrice: 250000,
    color: "cyan",
    popular: false,
    ideal: "PME & transporteurs",
    features: [
      ...COMMON_FEATURES,
      { label: "Alertes SMS", included: true },
      { label: "Support dédié + gestionnaire de compte", included: false },
    ],
  },
  {
    id: "serenite-plus",
    name: "Sérénité +",
    tagline: "Tout inclus + accompagnement dédié",
    priceMonthly: 45000,
    priceAnnual: 450000,
    hardwarePrice: 250000,
    color: "lime",
    popular: true,
    ideal: "Sociétés de transport & grandes flottes",
    features: [
      ...COMMON_FEATURES,
      { label: "Alertes SMS", included: true },
      { label: "Support dédié + gestionnaire de compte", included: true },
    ],
  },
];
