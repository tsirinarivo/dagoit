# DAGO IT — Site Web Officiel

Site web premium Next.js 15 pour DAGO IT, leader malgache en géolocalisation GPS de véhicules, hébergement web et systèmes d'alarme.

## Stack Technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 15 (App Router) + TypeScript strict |
| Styles | Tailwind CSS v4 + CSS Variables |
| Composants | shadcn/ui-compatible, custom |
| Animations | Framer Motion + GSAP (ScrollTrigger) |
| 3D | React Three Fiber + Three.js |
| Scroll | Lenis (smooth scroll) |
| État | Zustand (panier, UI) |
| Formulaires | React Hook Form + Zod |
| CMS | Payload CMS (self-hosted) |
| E-commerce | WooCommerce headless (REST API) |
| Tests | Vitest + Playwright |
| Deploy | Vercel |

## Prérequis

- Node.js 20+
- npm 10+ ou pnpm 9+

## Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/tsirinarivo/dagoit.git
cd dagoit

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos vraies valeurs

# 4. Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev          # Démarrer en mode développement (Turbopack)
npm run build        # Construire pour la production
npm run start        # Démarrer le serveur de production
npm run lint         # Vérifier le code (ESLint)
npm run typecheck    # Vérifier les types TypeScript
npm run test         # Tests unitaires (Vitest)
npm run test:e2e     # Tests end-to-end (Playwright)
npm run format       # Formater le code (Prettier)
```

## Structure du projet

```
dagoit/
├── app/
│   ├── (marketing)/          # Pages publiques (home, services, boutique...)
│   │   ├── layout.tsx        # Layout avec Header, Footer, CartDrawer, WhatsApp
│   │   ├── page.tsx          # Home page
│   │   ├── services/
│   │   │   └── geolocalisation/
│   │   ├── boutique/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   └── ...
│   ├── (auth)/               # Pages authentifiées (compte client)
│   ├── api/                  # Routes API (contact, devis, newsletter)
│   ├── sitemap.ts            # Sitemap automatique
│   ├── robots.ts             # robots.txt
│   ├── globals.css           # Design tokens + styles globaux
│   └── layout.tsx            # Root layout (fonts, providers, metadata)
├── components/
│   ├── ui/                   # Composants de base (button, input...)
│   ├── atoms/                # Badge, CustomCursor...
│   ├── molecules/            # ProductCard, PricingCard...
│   ├── organisms/            # Header, Footer, CartDrawer, WhatsAppButton
│   ├── sections/             # Sections de la home page
│   └── three/                # Composants Three.js (Globe Madagascar)
├── lib/
│   ├── animations/           # Framer Motion variants
│   ├── constants/            # plans.ts, products.ts, nav.ts, cities.ts
│   ├── hooks/                # Hooks React custom
│   ├── stores/               # Zustand stores (cart, ui)
│   └── utils/                # cn, formatPrice, formatPhone
├── content/
│   ├── blog/                 # Articles MDX
│   └── legal/                # Pages légales MDX
└── tests/
    ├── unit/                 # Tests Vitest
    └── e2e/                  # Tests Playwright
```

## Variables d'environnement

Voir `.env.example` pour la liste complète. Les essentielles :

| Variable | Description | Requis |
|----------|-------------|--------|
| `NEXT_PUBLIC_SITE_URL` | URL de production | Oui |
| `WOOCOMMERCE_URL` | URL du site WordPress | Si e-commerce |
| `WOOCOMMERCE_CONSUMER_KEY` | Clé API WooCommerce | Si e-commerce |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe | Si paiement CB |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe | Si paiement CB |
| `RESEND_API_KEY` | API Resend pour les emails | Si formulaires |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numéro WhatsApp Business | Oui |

## Déploiement sur Vercel

```bash
# Installer la CLI Vercel
npm i -g vercel

# Déployer
vercel deploy

# Ajouter les variables d'environnement
vercel env add NEXT_PUBLIC_SITE_URL
# ... (répéter pour chaque variable)
```

### Configuration Vercel recommandée

- **Build Command** : `npm run build`
- **Output Directory** : `.next`
- **Node.js Version** : 20.x
- **Regions** : `cdg1` (Paris) — le plus proche de Madagascar

## Accessibilité

Le site respecte WCAG 2.2 AA :
- Navigation clavier complète
- Focus visibles sur tous les éléments interactifs
- Skip links en haut de page
- `aria-label`, `role` et `aria-*` sur tous les composants interactifs
- Images avec `alt` descriptifs
- Composants animés avec variante `prefers-reduced-motion`
- Contraste des couleurs vérifié

## SEO

- Metadata dynamique avec `generateMetadata()`
- Schema.org (LocalBusiness, Product, Service) via JSON-LD
- Sitemap automatique (`/sitemap.xml`)
- robots.txt (`/robots.txt`)
- OpenGraph et Twitter Card
- Images au format AVIF/WebP via `next/image`

## Performance

Cibles Lighthouse :
- Performance : ≥ 95
- Accessibilité : ≥ 95
- Meilleures pratiques : ≥ 95
- SEO : 100

Optimisations appliquées :
- Import dynamique Three.js (`ssr: false`)
- `optimizePackageImports` pour lucide-react et framer-motion
- Fonts locales avec `next/font`
- Images AVIF/WebP
- Tailwind CSS v4 (CSS-first, tree-shaking natif)
