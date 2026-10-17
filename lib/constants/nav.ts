export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
  badge?: string;
};

const ALL_NAV_ITEMS: NavItem[] = [
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
    ],
  },
  {
    label: "Boutique",
    href: "/boutique",
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

export const BOUTIQUE_ENABLED =
  process.env.NEXT_PUBLIC_BOUTIQUE_ENABLED !== "false";

export const NAV_ITEMS: NavItem[] = BOUTIQUE_ENABLED
  ? ALL_NAV_ITEMS
  : ALL_NAV_ITEMS.filter((i) => i.href !== "/boutique");

export const CONTACT_INFO = {
  phone: "+261 32 05 767 77",
  whatsapp: "+261320576777",
  email: "contact@dago-it.com",
  address: "Villa Irintsara, Andranomadio, Toamasina 501, Madagascar",
  trackingUrl: "https://app.fleet.mg",
  hostingUrl: "https://dago-cloud.com",
};
