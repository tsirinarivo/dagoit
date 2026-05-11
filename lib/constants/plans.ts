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

export const GPS_PLANS: GPSPlan[] = [
  {
    id: "just-track",
    name: "Just Track",
    tagline: "L'essentiel du suivi GPS",
    priceMonthly: 32500,
    priceAnnual: 325000,
    hardwarePrice: 250000,
    color: "primary",
    ideal: "Particuliers & petites flottes",
    features: [
      { label: "Suivi temps réel", included: true },
      { label: "Historique de trajet (30 jours)", included: true },
      { label: "Application mobile iOS & Android", included: true },
      { label: "Rapport kilométrique mensuel", included: true },
      { label: "Support par email", included: true },
      { label: "Alertes SMS", included: false },
      { label: "Coupe-moteur à distance", included: false },
      { label: "Géofencing (zones virtuelles)", included: false },
      { label: "Identification chauffeur", included: false },
      { label: "Rapport carburant", included: false },
    ],
  },
  {
    id: "serenite-r",
    name: "Sérénité R",
    tagline: "Sécurité renforcée anti-vol",
    priceMonthly: 47500,
    priceAnnual: 475000,
    hardwarePrice: 265000,
    color: "cyan",
    popular: false,
    ideal: "PME & transporteurs individuels",
    features: [
      { label: "Suivi temps réel", included: true },
      { label: "Historique de trajet (90 jours)", included: true },
      { label: "Application mobile iOS & Android", included: true },
      { label: "Rapport kilométrique mensuel", included: true },
      { label: "Support téléphonique", included: true },
      { label: "Alertes SMS (vol, speeding, zone)", included: true },
      { label: "Coupe-moteur à distance", included: true },
      { label: "Géofencing (zones virtuelles)", included: false },
      { label: "Identification chauffeur", included: false },
      { label: "Rapport carburant", included: false },
    ],
  },
  {
    id: "serenite-a",
    name: "Sérénité A",
    tagline: "Gestion de flotte avancée",
    priceMonthly: 67500,
    priceAnnual: 675000,
    hardwarePrice: 275000,
    color: "lime",
    popular: true,
    ideal: "Sociétés de transport & logistique",
    features: [
      { label: "Suivi temps réel", included: true },
      { label: "Historique illimité", included: true },
      { label: "Application mobile iOS & Android", included: true },
      { label: "Rapports détaillés automatiques", included: true },
      { label: "Support prioritaire 24h/7j", included: true },
      { label: "Alertes SMS illimitées", included: true },
      { label: "Coupe-moteur à distance", included: true },
      {
        label: "Géofencing",
        included: true,
        note: "Jusqu'à 20 zones",
      },
      {
        label: "Identification chauffeur",
        included: true,
        note: "Badge RFID inclus",
      },
      { label: "Rapport carburant estimé", included: false },
    ],
  },
  {
    id: "serenite-plus",
    name: "Sérénité+",
    tagline: "La solution tout-en-un premium",
    priceMonthly: 95000,
    priceAnnual: 950000,
    hardwarePrice: 280000,
    color: "orange",
    ideal: "Grandes flottes & hôpitaux",
    features: [
      { label: "Suivi temps réel HD (10 sec)", included: true },
      { label: "Historique illimité 5 ans", included: true },
      { label: "Application mobile + web", included: true },
      {
        label: "Tableaux de bord personnalisés",
        included: true,
      },
      { label: "Support dédié + gestionnaire de compte", included: true },
      { label: "Alertes SMS + email + push", included: true },
      { label: "Coupe-moteur à distance", included: true },
      {
        label: "Géofencing illimité",
        included: true,
      },
      {
        label: "Identification chauffeur",
        included: true,
        note: "Multi-badges + biométrie",
      },
      {
        label: "Rapport carburant précis",
        included: true,
        note: "Sonde carburant incluse",
      },
    ],
  },
];
