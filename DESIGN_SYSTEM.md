# Design System — DAGO IT

Tu vas travailler sur un projet Next.js 15 avec le design system suivant. Respecte-le strictement.

## Stack

- Next.js 15 App Router + TypeScript
- Tailwind CSS v4 (config dans `globals.css` via `@theme`, pas de `tailwind.config.ts`)
- Framer Motion pour les animations
- Lucide React pour les icônes
- Polices : Space Grotesk (display), Inter (body), JetBrains Mono (mono)

## Palette

| Rôle | Valeur |
|---|---|
| Fond principal | `#0a1628` |
| Fond secondaire | `#0d1f3c` |
| Surface cards | `rgba(255,255,255,0.04)` |
| Border | `rgba(255,255,255,0.08)` |
| Accent Cyan | `#00e5ff` |
| Accent Lime | `#a3ff12` |
| Accent Orange | `#ff6b35` |
| Texte primaire | `#f5f7fa` |
| Texte secondaire | `#94a3b8` |
| Texte tertiaire | `#64748b` |

## Variables CSS sémantiques

À placer dans `globals.css` :

```css
:root {
  --bg: #0a1628;
  --bg-secondary: #0d1f3c;
  --surface: rgba(255,255,255,0.04);
  --surface-hover: rgba(255,255,255,0.08);
  --border: rgba(255,255,255,0.08);
  --border-accent: rgba(0,229,255,0.25);
  --text-primary: #f5f7fa;
  --text-secondary: #94a3b8;
  --text-tertiary: #64748b;
  --accent-primary: #00e5ff;
  --accent-secondary: #a3ff12;
  --accent-tertiary: #ff6b35;
}
```

## Typographie

```
H1      font-display font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-[1.0]
H2      font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight
Label   text-xs font-mono uppercase tracking-widest text-cyan-500
Corps   text-[var(--text-secondary)] leading-relaxed
```

## Classes utilitaires clés

```
Container     max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
Section       py-20 md:py-28
Card          bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 hover:border-cyan-500/20 transition-colors
Glass         backdrop-blur-xl bg-white/5 border border-white/10
Gradient cyan bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent
```

## Pattern Hero section

```tsx
<section className="relative overflow-hidden">
  <div
    aria-hidden
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        "radial-gradient(ellipse 60% 70% at 30% 50%, rgba(0,229,255,0.08) 0%, transparent 60%), linear-gradient(to bottom, #060e1c, #0a1628)",
    }}
  />
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-20">
    ...
  </div>
</section>
```

## Animations Framer Motion

Toujours utiliser `whileInView`, jamais `animate` direct pour les sections.

```ts
// Fade up standard
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Stagger grille de cartes
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// Usage
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
```

## Règles impératives

- Mode sombre par défaut, fond dark navy `#0a1628`
- Jamais de `CustomCursor` ni de boutons `magnetic` — cause un lag souris important
- Toujours `whileInView` + `viewport={{ once: true }}` pour les animations scroll
- Les hooks `useLoader` de React Three Fiber nécessitent un wrapper `<Suspense>`
- Langue : français | Devise : Ariary (Ar)
