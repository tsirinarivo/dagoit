export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
  badge?: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Géolocalisation GPS",
        href: "/services/geolocalisation",
        badge: "Phare",
      },
      {
        label: "Hébergement Web",
        href: "/services/hebergement-web",
      },
      {
        label: "Systèmes d'Alarme",
        href: "/services/alarme",
      },
      {
        label: "Plateforme Tracking",
        href: "/services/tracking-platform",
      },
    ],
  },
  {
    label: "Boutique",
    href: "/boutique",
  },
  {
    label: "Réalisations",
    href: "/realisations",
  },
  {
    label: "Ressources",
    href: "/ressources",
  },
  {
    label: "À propos",
    href: "/a-propos",
  },
];

export const CONTACT_INFO = {
  phone: "+261 34 00 000 00",
  whatsapp: "+261340000000",
  email: "contact@dago-it.com",
  address: "Lot IVT 53, Andraharo, Antananarivo 101, Madagascar",
  trackingUrl: "https://tracking.dago-it.com",
  hostingUrl: "https://dago-hosting.com",
};
