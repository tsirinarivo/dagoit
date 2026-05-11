# DAGO IT — Design System

## Philosophie

**Futuriste · Sérieux · Africain-moderne · Énergique**

Inspiré de Linear, Vercel, Stripe, Raycast. Mode sombre par défaut. Identité visuelle forte qui différencie DAGO IT des sites WordPress génériques.

---

## Palette de couleurs

### Couleurs principales

| Token CSS | Valeur | Utilisation |
|-----------|--------|-------------|
| `--color-primary-900` | `#0a1628` | Fond principal (dark) |
| `--color-primary-800` | `#0d1f3c` | Fond secondaire |
| `--color-primary-500` | `#0b3a6f` | Dégradé hero |

### Accents

| Nom | Token CSS | Hex | Utilisation |
|-----|-----------|-----|-------------|
| Cyan électrique | `--color-cyan-500` | `#00E5FF` | CTA, liens, icônes |
| Vert lime | `--color-lime-500` | `#A3FF12` | Succès, "En ligne", prix réduits |
| Orange terre rouge | `--color-orange-500` | `#FF6B35` | Alertes, promos, accent chaud |

### Variables sémantiques

```css
--bg              /* Fond principal */
--bg-secondary    /* Fond carte/section */
--bg-tertiary     /* Fond input/hover */
--surface         /* Surface carte (rgba blanc ~4%) */
--surface-hover   /* Surface au hover (rgba blanc ~8%) */
--border          /* Bordure subtle (rgba blanc 8%) */
--border-accent   /* Bordure accentuée (cyan 25%) */
--text-primary    /* Texte principal */
--text-secondary  /* Texte secondaire */
--text-tertiary   /* Texte discret */
--accent-primary  /* #00E5FF en dark, #0B3A6F en light */
```

---

## Typographie

### Polices

| Rôle | Police | Poids | Variable CSS |
|------|--------|-------|--------------|
| Titres / Display | Space Grotesk | 400–700 | `--font-display` |
| Corps / UI | Inter | 400–600 | `--font-body` |
| Données / Code | JetBrains Mono | 400–500 | `--font-mono` |

### Utilisation

```html
<!-- Titre principal -->
<h1 class="font-display font-black tracking-tight">

<!-- Prix, coordonnées GPS -->
<span class="font-mono">275 000 Ar</span>

<!-- Corps de texte -->
<p class="font-body">
```

### Échelle typographique

| Classe | Taille |
|--------|--------|
| Hero H1 | `clamp(2.4rem, 6vw, 4.5rem)` |
| Page H1 | `clamp(2.5rem, 6vw, 5rem)` |
| Section H2 | `clamp(2rem, 5vw, 3.5rem)` |
| Card H3 | `1rem – 1.25rem` |
| Corps | `0.875rem – 1rem` |
| Caption | `0.75rem` |
| Mono data | `0.75rem – 0.875rem` |

---

## Composants

### Button

```tsx
import { Button } from "@/components/ui/button";

// Variantes
<Button variant="primary">CTA principal</Button>
<Button variant="secondary">Action secondaire</Button>
<Button variant="ghost">Lien discret</Button>
<Button variant="lime">Succès / Prix</Button>
<Button variant="orange">Alerte / Urgence</Button>
<Button variant="glass">Sur fond sombre</Button>

// Tailles
<Button size="sm">Petit</Button>
<Button size="md">Défaut</Button>
<Button size="lg">Grand</Button>
<Button size="xl">Hero CTA</Button>
<Button size="icon">Icône seule</Button>

// Options
<Button magnetic loading leftIcon={<Icon />} rightIcon={<ArrowRight />}>
  Avec effets magnétiques
</Button>
```

### Badge

```tsx
import { Badge } from "@/components/atoms/Badge";

<Badge variant="cyan">Nouveau</Badge>
<Badge variant="lime">Best-seller</Badge>
<Badge variant="orange">Promo</Badge>
<Badge variant="online" dot pulse>En ligne</Badge>
<Badge variant="neutral">Standard</Badge>
```

### Input

```tsx
import { Input, Textarea } from "@/components/ui/input";

<Input
  label="Téléphone"
  placeholder="+261 34 XX XXX XX"
  type="tel"
  required
  leftIcon={<Phone />}
  error="Format invalide"
  hint="Numéro malgache ou international"
/>
```

---

## Effets visuels

### Glassmorphism

```html
<div class="glass">         <!-- 4% blanc, blur 16px -->
<div class="glass-strong">  <!-- 8% blanc, blur 24px -->
```

### Dégradés de texte

```html
<span class="gradient-text-cyan">  <!-- #00E5FF → #A3FF12 -->
<span class="gradient-text-warm">  <!-- #FF6B35 → #00E5FF -->
```

### Fonds de texture

```html
<div class="bg-grid">   <!-- Grille subtile -->
<div class="bg-dot">    <!-- Points réguliers -->
```

### Effets de lueur (glow)

```css
box-shadow: var(--shadow-glow-cyan);    /* Cyan glow */
box-shadow: var(--shadow-glow-lime);    /* Lime glow */
box-shadow: var(--shadow-glow-orange);  /* Orange glow */
```

---

## Animations

### Variantes Framer Motion

```tsx
import { fadeUp, staggerContainer, staggerGrid } from "@/lib/animations/variants";

// Section qui se révèle au scroll
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
  <motion.h2 variants={fadeUp}>Titre</motion.h2>
  <motion.p variants={fadeUp}>Texte</motion.p>
</motion.div>
```

### Animations CSS

```html
<div class="animate-float">      <!-- Flottement vertical -->
<div class="animate-blink">      <!-- Clignotement doux -->
<div class="animate-spin-slow">  <!-- Rotation lente -->
<div class="gps-ping">           <!-- Ping GPS -->
```

---

## Layout

### Conteneur principal

```html
<div class="container-dago">
<!-- max-width: 1280px, padding responsive: clamp(1rem, 5vw, 2.5rem) -->
```

### Espacement de sections

```html
<section class="section-py">
<!-- padding-block: clamp(4rem, 10vw, 8rem) -->
```

---

## Accessibilité (WCAG 2.2 AA)

- Focus visible : `outline: 2px solid var(--accent-primary)` sur tous les éléments interactifs
- Skip link : `.skip-link` en haut du layout marketing
- Attributs ARIA requis : `aria-label`, `aria-expanded`, `role="dialog"` sur les overlays
- `prefers-reduced-motion` : désactive toutes les animations CSS et JS
- Contraste : ratio minimum 4.5:1 pour le texte normal, 3:1 pour les grands textes
