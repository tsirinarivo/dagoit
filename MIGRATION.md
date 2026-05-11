# DAGO IT — Guide de Migration WordPress → Next.js

## Vue d'ensemble

Ce guide liste tout ce qu'il faut récupérer du site WordPress/WooCommerce actuel (dago-it.com) avant de le désactiver.

---

## 1. Export des données WooCommerce

### Produits

```bash
# Via l'API REST WooCommerce
GET https://dago-it.com/wp-json/wc/v3/products?per_page=100

# Ou export CSV depuis WP Admin > WooCommerce > Produits > Exporter
```

**À récupérer par produit :**
- [ ] Nom, description courte, description longue
- [ ] Images (haute résolution)
- [ ] Prix, prix promo, dates de promo
- [ ] Catégories et tags
- [ ] SKU (référence)
- [ ] Stock (quantité, statut)
- [ ] Attributs (couleur, taille, compatibilité...)
- [ ] Produits liés (upsells, cross-sells)

**Fichiers à mettre dans :** `public/images/products/`

### Commandes

```bash
# Export complet via WP Admin > WooCommerce > Commandes > Exporter
# Format CSV ou JSON
```

**À conserver :**
- [ ] Historique des commandes (pour support client)
- [ ] Statuts de commande en cours
- [ ] Données de facturation/livraison

### Clients

```bash
# WP Admin > WooCommerce > Rapports > Téléchargements > Clients
```

**Note :** Ne pas migrer les mots de passe (les clients devront les recréer via "Mot de passe oublié").

**À migrer :**
- [ ] Nom, prénom, email
- [ ] Téléphone
- [ ] Adresse de livraison préférentielle
- [ ] Historique de commandes

---

## 2. Articles de blog (WordPress Posts)

```bash
# WP Admin > Outils > Exporter > Articles
# Ou via l'API : GET /wp-json/wp/v2/posts?per_page=100
```

**À convertir en MDX dans `content/blog/` :**
- [ ] Titre et slug (vérifier redirection 301)
- [ ] Contenu (nettoyage HTML → Markdown)
- [ ] Images à la une → `public/images/blog/`
- [ ] Date de publication
- [ ] Auteur
- [ ] Catégories et tags

**Format MDX attendu :**
```mdx
---
title: "Comment choisir son traceur GPS à Madagascar"
date: "2024-01-15"
author: "Équipe DAGO IT"
category: "Guide GPS"
excerpt: "..."
coverImage: "/images/blog/choisir-traceur-gps.jpg"
---

Contenu de l'article...
```

---

## 3. Médias

```bash
# WP Admin > Médiathèque > Exporter ou télécharger via FTP
# Dossier source : /wp-content/uploads/
```

**À récupérer :**
- [ ] Images produits (`/products/`)
- [ ] Images articles de blog (`/blog/`)
- [ ] Logos partenaires (`/logos/`)
- [ ] Photos équipe (`/team/`)
- [ ] Documents PDF (fiches techniques, etc.)

**Optimisation :** Convertir toutes les images en WebP avec `sharp` :
```bash
# Script de conversion (à adapter)
npx sharp-cli --input "uploads/**/*.{jpg,png}" --output "public/images/" --format webp
```

---

## 4. Pages statiques

**À récrire manuellement (pas d'export automatique) :**
- [ ] Mentions légales → `content/legal/mentions-legales.mdx`
- [ ] CGV → `content/legal/cgv.mdx`
- [ ] Politique de confidentialité → `content/legal/confidentialite.mdx`
- [ ] Page À propos (texte + photos équipe)
- [ ] Page Contact (adresse, horaires)

---

## 5. Avis clients

```bash
# WP Admin > WooCommerce > Avis
# Ou : GET /wp-json/wc/v3/products/reviews
```

**À intégrer dans :** `lib/constants/testimonials.ts`

---

## 6. Redirections SEO (CRITIQUE)

Pour préserver le référencement existant, configurer dans `next.config.ts` :

```typescript
async redirects() {
  return [
    // Exemples — adapter selon les URLs actuelles
    { source: "/?page_id=XX", destination: "/a-propos", permanent: true },
    { source: "/product/:slug", destination: "/boutique/:slug", permanent: true },
    { source: "/category/gps", destination: "/boutique?cat=traceurs-gps", permanent: true },
    { source: "/contact-us", destination: "/contact", permanent: true },
    // Ajouter toutes les URLs importantes...
  ];
}
```

**Audit des URLs :** Crawler le site actuel avec Screaming Frog ou Google Search Console avant migration.

---

## 7. Checklist pré-lancement

- [ ] Export complet WooCommerce (produits, commandes, clients)
- [ ] Backup complet de la base de données WordPress
- [ ] Export médias via FTP
- [ ] Audit URLs avec Google Search Console (pages indexées)
- [ ] Tester toutes les redirections 301
- [ ] Configurer le DNS vers Vercel
- [ ] Vérifier le certificat SSL
- [ ] Tester les formulaires de contact et devis
- [ ] Tester le processus d'achat complet (Mvola, Orange Money, CB)
- [ ] Vérifier les emails transactionnels (confirmation commande, devis)
- [ ] Test Lighthouse sur les 3 pages principales
- [ ] Soumettre le nouveau sitemap à Google Search Console
- [ ] Conserver le site WordPress en ligne en sous-domaine (`old.dago-it.com`) pendant 3 mois

---

## 8. Timeline recommandée

| Semaine | Action |
|---------|--------|
| S1 | Export de toutes les données WP/WooCommerce |
| S2 | Migration produits + médias dans le nouveau site |
| S3 | Migration articles de blog en MDX |
| S4 | Tests complets, mise en production progressive |
| S5-S16 | Surveillance SEO, redirection maintenue |
