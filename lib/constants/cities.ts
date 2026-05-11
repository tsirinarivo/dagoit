export type MalagasyCity = {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  population?: number;
  isCapital?: boolean;
  operateurs: string[];
};

/** Coordonnées des principales villes desservies par DAGO IT */
export const MADAGASCAR_CITIES: MalagasyCity[] = [
  {
    id: "antananarivo",
    name: "Antananarivo",
    region: "Analamanga",
    lat: -18.9249,
    lng: 47.5185,
    population: 3_500_000,
    isCapital: true,
    operateurs: ["Telma", "Orange", "Airtel"],
  },
  {
    id: "toamasina",
    name: "Toamasina",
    region: "Atsinanana",
    lat: -18.1492,
    lng: 49.3931,
    population: 350_000,
    operateurs: ["Telma", "Orange", "Airtel"],
  },
  {
    id: "antsirabe",
    name: "Antsirabe",
    region: "Vakinankaratra",
    lat: -19.8659,
    lng: 47.0333,
    population: 280_000,
    operateurs: ["Telma", "Orange", "Airtel"],
  },
  {
    id: "mahajanga",
    name: "Mahajanga",
    region: "Boeny",
    lat: -15.7167,
    lng: 46.3167,
    population: 250_000,
    operateurs: ["Telma", "Orange"],
  },
  {
    id: "toliara",
    name: "Toliara",
    region: "Atsimo-Andrefana",
    lat: -23.35,
    lng: 43.6833,
    population: 200_000,
    operateurs: ["Telma", "Orange"],
  },
  {
    id: "fianarantsoa",
    name: "Fianarantsoa",
    region: "Haute Matsiatra",
    lat: -21.4527,
    lng: 47.0854,
    population: 185_000,
    operateurs: ["Telma", "Orange", "Airtel"],
  },
  {
    id: "antsiranana",
    name: "Antsiranana",
    region: "Diana",
    lat: -12.3522,
    lng: 49.2958,
    population: 120_000,
    operateurs: ["Telma", "Orange"],
  },
];

/** Lignes de connexion pour le globe (trajets principaux surveillés) */
export const GPS_ROUTES = [
  { from: "antananarivo", to: "toamasina", label: "Route nationale RN2" },
  { from: "antananarivo", to: "antsirabe", label: "Route nationale RN7" },
  { from: "antananarivo", to: "mahajanga", label: "Route nationale RN4" },
  { from: "antananarivo", to: "fianarantsoa", label: "Route nationale RN7" },
  { from: "fianarantsoa", to: "toliara", label: "Route nationale RN7" },
];
