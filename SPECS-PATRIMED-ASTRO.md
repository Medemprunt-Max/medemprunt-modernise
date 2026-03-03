# Spécifications — Reconstruction de Patrimed.fr en Astro

> **Version** : 1.0 — 3 mars 2026
> **Auteur** : Maximilien Brami / Claude (IA)
> **Projet de référence** : [medemprunt-astro](https://github.com/Medemprunt-Max/medemprunt-astro) (branche `claude/youthful-brattain`)
> **Site actuel** : https://patrimed.fr (WordPress + Elementor)
> **Site frère modernisé** : https://medemprunt-preview.netlify.app

---

## Table des matières

1. [Contexte & Objectifs](#1-contexte--objectifs)
2. [Stack technique](#2-stack-technique)
3. [Design System partagé](#3-design-system-partagé)
4. [Architecture des pages](#4-architecture-des-pages)
5. [Composants réutilisables](#5-composants-réutilisables)
6. [Page par page — Contenu & Maquette](#6-page-par-page--contenu--maquette)
7. [Header & Navigation](#7-header--navigation)
8. [Footer](#8-footer)
9. [Intégrations tierces](#9-intégrations-tierces)
10. [SEO & Performance](#10-seo--performance)
11. [Déploiement](#11-déploiement)
12. [Contenu existant à migrer](#12-contenu-existant-à-migrer)
13. [Assets nécessaires](#13-assets-nécessaires)
14. [Annexes](#14-annexes)

---

## 1. Contexte & Objectifs

### Identité

| Champ | Valeur |
|---|---|
| **Marque** | Patrimed |
| **Entité juridique** | LPMED |
| **SIRET** | 920383478 (RCS Paris) |
| **Siège** | 131 boulevard Pereire, 75017 Paris |
| **Baseline** | « Pour la santé de votre patrimoine » |
| **ORIAS** | 23003677 |
| **Statut** | Conseiller en Investissements Financiers (CIF) & Courtier en Assurances (COA) |
| **Lien avec Medemprunt** | Marques sœurs sous LPMED — Medemprunt = courtage crédit, Patrimed = gestion de patrimoine |

### Objectifs de la refonte

1. **Moderniser l'esthétique** : adopter le même langage visuel que le nouveau Medemprunt (inspiré de qonto.fr et pretto.fr)
2. **Améliorer la performance** : passer de WordPress/Elementor à un site statique Astro (temps de chargement < 1s)
3. **Cohérence de marque** : les deux sites doivent partager le même design system tout en ayant leur identité propre
4. **Mobile-first** : le site doit être irréprochable sur mobile (> 60% du trafic)

---

## 2. Stack technique

| Élément | Choix | Justification |
|---|---|---|
| **Framework** | Astro 5.x (Static Site Generation) | Identique à Medemprunt, performances maximales |
| **Styling** | Tailwind CSS 3.4+ | Design system partagé via config commune |
| **Polices** | Plus Jakarta Sans (titres) + Inter (corps) | Cohérence avec Medemprunt |
| **Hébergement** | Netlify | Même infra que Medemprunt, déploiement automatique |
| **Formulaire contact** | Tally (embed) | Déjà utilisé sur le WordPress actuel |
| **Prise de RDV** | SimplyBook.me (widget embed) | Déjà utilisé (rdvlgmed.simplybook.it) |
| **Newsletter** | À définir (Brevo, Mailchimp, ou natif) | Widget d'inscription sur homepage |
| **Analytics** | Google Analytics (GT-NS49LX5) | Existant, à conserver |
| **Icônes** | Heroicons (SVG inline) | Cohérence avec Medemprunt |
| **Images** | Format WebP/AVIF + lazy loading | Optimisation performance |

### Structure du projet

```
patrimed-astro/
├── public/
│   ├── images/
│   │   ├── logo-patrimed.svg
│   │   ├── logo-patrimed-white.svg
│   │   ├── partners/           # Logos partenaires (25+)
│   │   └── blog/               # Images articles PatriActu
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Section.astro
│   │   ├── SectionTitle.astro
│   │   ├── HeroCompact.astro
│   │   ├── ServiceCard.astro    # Nouveau — cartes services détaillées
│   │   ├── StatCounter.astro    # Nouveau — compteur animé réutilisable
│   │   ├── PartnerLogo.astro    # Nouveau — logo partenaire avec tooltip
│   │   └── BlogCard.astro       # Nouveau — aperçu article PatriActu
│   ├── layouts/
│   │   └── Layout.astro
│   ├── styles/
│   │   └── global.css
│   ├── content/
│   │   └── blog/               # Articles PatriActu en Markdown
│   │       ├── livret-a-2026.md
│   │       ├── pourquoi-patrimed.md
│   │       ├── taux-usure.md
│   │       ├── diversification.md
│   │       ├── scpi.md
│   │       └── loi-girardin.md
│   └── pages/
│       ├── index.astro
│       ├── gestion-patrimoine.astro
│       ├── parrainage.astro
│       ├── partenaires.astro
│       ├── patriactu/
│       │   ├── index.astro      # Liste des articles
│       │   └── [...slug].astro  # Article dynamique
│       ├── rdv.astro
│       ├── contact.astro
│       ├── mentions-legales.astro
│       └── donnees-personnelles.astro
├── tailwind.config.mjs
├── astro.config.mjs
├── netlify.toml
└── package.json
```

---

## 3. Design System partagé

### 3.1 Palette de couleurs

Le design system est **identique** à celui de Medemprunt. Le fichier `tailwind.config.mjs` doit être copié depuis le projet medemprunt-astro (branche `claude/youthful-brattain`).

#### Couleurs principales

| Token | Hex | Usage |
|---|---|---|
| `primary-500` | `#0088e6` | Couleur principale |
| `med-blue` | `#2196F3` | Accent primaire, boutons, liens |
| `med-cyan` | `#00BCD4` | Accent secondaire, dégradés |
| `med-teal` | `#009688` | Accent tertiaire |
| `accent` | `#00b4d8` | Highlights |
| `dark` | `#0a1628` | Texte foncé, arrière-plans sombres |
| `dark-light` | `#1a2a44` | Sections sombres |

#### Dégradés

```css
/* Dégradé principal (arrière-plans sombres) */
background: linear-gradient(135deg, #0a1628 0%, #1a3a5c 50%, #2196F3 100%);

/* Dégradé texte (titres accentués) */
background: linear-gradient(135deg, #2196F3, #00b4d8);
-webkit-background-clip: text;

/* Dégradé accent Patrimed (pour le card CTA patrimoine) */
background: linear-gradient(135deg, #2196F3 0%, #00BCD4 100%);
```

### 3.2 Typographie

| Élément | Police | Poids | Taille |
|---|---|---|---|
| H1 (hero) | Plus Jakarta Sans | 800 (extrabold) | 3rem → 4.5rem (responsive) |
| H2 (sections) | Plus Jakarta Sans | 800 | 2rem → 3rem |
| H3 (cartes) | Plus Jakarta Sans | 700 (bold) | 1.25rem → 1.5rem |
| Corps | Inter | 400 | 1rem (16px) |
| Labels / tags | Inter | 600 (semibold) | 0.75rem → 0.875rem |
| Boutons | Inter | 600 | 0.875rem → 1rem |

### 3.3 Ombres

```javascript
// Dans tailwind.config.mjs → theme.extend.boxShadow
'soft': '0 2px 15px -3px rgba(0,0,0,0.04), 0 1px 6px -2px rgba(0,0,0,0.03)',
'soft-md': '0 4px 25px -5px rgba(0,0,0,0.06), 0 2px 10px -3px rgba(0,0,0,0.04)',
'soft-lg': '0 10px 40px -10px rgba(0,0,0,0.08), 0 4px 15px -5px rgba(0,0,0,0.04)',
'blue-glow': '0 8px 30px -5px rgba(33,150,243,0.2)',
'blue-glow-lg': '0 15px 50px -10px rgba(33,150,243,0.3)',
```

### 3.4 Animations

| Animation | Durée | Usage |
|---|---|---|
| `fade-in` | 0.7s ease-out | Apparition des éléments |
| `slide-up` | 0.7s ease-out | Scroll reveal (translateY 40px→0) |
| `float` | 6s infinite | Éléments décoratifs |
| `count-up` | 0.6s cubic-bezier | Compteurs stats |
| `.reveal` | 0.8s ease | IntersectionObserver scroll reveal |
| `.card-hover` | 0.3s ease | Élévation au hover (-translateY 6px) |

### 3.5 Coins & Espacements

| Élément | Valeur |
|---|---|
| Cartes | `rounded-2xl` (16px) |
| Boutons | `rounded-xl` (12px) |
| Tags | `rounded-full` |
| Inputs | `rounded-xl` (12px) |
| `container-custom` | `max-w-7xl mx-auto px-5 sm:px-8` |

---

## 4. Architecture des pages

```
URL                              Page                    Header variant
─────────────────────────────────────────────────────────────────────────
/                                Homepage                light (fond blanc)
/gestion-patrimoine              Services détaillés      dark
/parrainage                      Programme parrainage    dark
/partenaires                     Logos partenaires       dark
/patriactu                       Blog — liste            dark
/patriactu/[slug]                Blog — article          dark
/rdv                             Prise de rendez-vous    dark
/contact                         Formulaire contact      dark
/mentions-legales                Mentions légales        dark
/donnees-personnelles            RGPD                    dark
```

> **Note** : Seule la homepage utilise le header en mode `light` (transparent sur fond blanc). Toutes les autres pages utilisent le header `dark` (dégradé).

---

## 5. Composants réutilisables

### Composants à copier directement depuis Medemprunt

Ces composants existent déjà dans `medemprunt-astro/src/components/` et doivent être copiés tels quels (ou avec des ajustements mineurs du logo) :

| Composant | Fichier | Props |
|---|---|---|
| **Layout** | `Layout.astro` | `title`, `description`, `headerVariant` |
| **Header** | `Header.astro` | `variant` ('light' \| 'dark') |
| **Footer** | `Footer.astro` | — (adapter liens et réseaux sociaux) |
| **Button** | `Button.astro` | `variant`, `size`, `href`, `icon` |
| **Card** | `Card.astro` | `title`, `description`, `icon` |
| **Section** | `Section.astro` | `bg` ('white' \| 'gray' \| 'dark' \| 'subtle') |
| **SectionTitle** | `SectionTitle.astro` | `title`, `highlight`, `subtitle` |
| **HeroCompact** | `HeroCompact.astro` | `title`, `highlight`, `subtitle` |

### Nouveaux composants à créer

#### `ServiceCard.astro`
Carte détaillée pour un service (Patrimoine, Fiscalité, Protection, Retraite, Immobilier).
```
Props:
  - number: string       # "01", "02", "03"...
  - title: string
  - description: string
  - features: string[]   # Liste à puces des sous-services
  - icon: string         # SVG path
  - href: string         # Lien CTA
  - accent?: boolean     # Couleur inversée
```

#### `StatCounter.astro`
Compteur animé (réutilisable entre les deux sites).
```
Props:
  - value: string        # "6", "500", "0"
  - suffix: string       # "j/7", "+", "€"
  - label: string        # Texte sous le chiffre
```

#### `BlogCard.astro`
Aperçu d'un article PatriActu.
```
Props:
  - title: string
  - excerpt: string
  - date: Date
  - slug: string
  - image?: string
  - tag?: string         # "Épargne", "Fiscalité", etc.
```

#### `PartnerLogo.astro`
Logo partenaire avec tooltip et catégorie.
```
Props:
  - name: string
  - logo: string         # Chemin vers l'image
  - category: string     # "Assureurs", "SCPI", "Fiscalité"
```

---

## 6. Page par page — Contenu & Maquette

### 6.1 Homepage (`/`)

La homepage suit le même esprit que le nouveau Medemprunt : hero light, sections alternées, animations au scroll.

#### Structure (de haut en bas)

```
┌──────────────────────────────────────────────────────────┐
│  HEADER (light mode — transparent sur fond blanc)        │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  HERO LIGHT                                              │
│  ─────────                                               │
│  H1: "Gestion de patrimoine"                             │
│      "pour les professionnels de santé" (gradient)       │
│  Sous-titre: "Pour la santé de votre patrimoine"         │
│                                                          │
│  Trust badges: ✓ 100% indépendant                        │
│                ✓ Conseil gratuit                          │
│                ✓ Disponible 6j/7                          │
│                                                          │
│  [CTA primaire: "Prendre rendez-vous"]                   │
│  [CTA secondaire: "Découvrir nos services"]              │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  LOGOS PARTENAIRES (défilement horizontal)                │
│  Bandeau de confiance avec 12+ logos partenaires         │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  STATS BANNER (fond dark)                                │
│  ─────────────                                           │
│  Compteurs animés:                                       │
│  [500+] Clients accompagnés                              │
│  [25+]  Partenaires financiers                           │
│  [98%]  Taux de satisfaction                             │
│  [6j/7] Disponibilité                                    │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  3 PROPOSITIONS DE VALEUR (grille 3 colonnes)            │
│  ──────────────────────                                  │
│  [📈 Rentabilité] [🤝 Proximité] [💧 Liquidité]          │
│  Chaque carte avec icône, titre, description             │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  SERVICES — BENTO GRID (5 services)                      │
│  ────────────────────                                    │
│  Layout identique à Medemprunt :                         │
│  ┌─────────────────┬──────────┐                          │
│  │  01 Patrimoine   │ 02 Fisca │                         │
│  │  (lg, 7 cols)    │ (md, 5)  │                         │
│  │                  ├──────────┤                          │
│  │                  │ 03 Protec│                          │
│  │                  │ (sm, 5)  │                          │
│  ├──────────────────┴──────────┤                          │
│  │ 04 Retraite (wide, accent)  │                         │
│  ├─────────────────────────────┤                          │
│  │ 05 Immobilier (wide)        │                         │
│  └─────────────────────────────┘                          │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  SECTION DISPONIBILITÉ                                   │
│  ─────────────────────                                   │
│  "Vos horaires ? Nos horaires !"                         │
│  Lundi → Samedi, jusqu'à 23h en visio                    │
│  [CTA: "Réserver un créneau"]                            │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  DERNIERS ARTICLES PATRIACTU (3 cartes)                  │
│  ──────────────────────────────                          │
│  Aperçu des 3 derniers articles du blog                  │
│  [CTA: "Voir tous les articles"]                         │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  CTA FINAL (fond dark)                                   │
│  ────────                                                │
│  "Prêt à optimiser votre patrimoine ?"                   │
│  [CTA: "Prendre rendez-vous gratuit"]                    │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  FOOTER                                                  │
└──────────────────────────────────────────────────────────┘
```

### 6.2 Gestion de Patrimoine (`/gestion-patrimoine`)

Page détaillant les 5 offres de services. Contenu à migrer depuis la page WordPress actuelle.

```
┌──────────────────────────────────────────────┐
│  HeroCompact: "Nos solutions patrimoniales"  │
├──────────────────────────────────────────────┤
│  Section 01: Patrimoine                      │
│  - Assurance Vie, PER, SCPI                  │
│  - Compte-titres, PEA                        │
│  - Ingénierie financière (SCI, SARL)         │
├──────────────────────────────────────────────┤
│  Section 02: Fiscalité                       │
│  - Dispositif Girardin                       │
│  - Dispositif Malraux                        │
│  - Stratégies d'optimisation fiscale         │
├──────────────────────────────────────────────┤
│  Section 03: Protection                      │
│  - Prévoyance                                │
│  - Capital décès                             │
│  - Rente éducation                           │
│  - Frais obsèques                            │
├──────────────────────────────────────────────┤
│  Section 04: Retraite                        │
│  - Optimisation PER                          │
│  - ETF et réduction frais de gestion         │
│  - Projection chiffrée                       │
├──────────────────────────────────────────────┤
│  Section 05: Immobilier & Crédit             │
│  - SCPI                                      │
│  - Stratégies d'investissement               │
│  - Lien avec Medemprunt                      │
├──────────────────────────────────────────────┤
│  CTA Final                                   │
└──────────────────────────────────────────────┘
```

### 6.3 Parrainage (`/parrainage`)

Identique en structure à la page Medemprunt parrainage, adapté avec les récompenses Patrimed.

**Récompenses** : 200€ en parts de SCPI **OU** 100€ en cash par filleul.

**3 étapes** :
1. Inviter un confrère (formulaire)
2. Le confrère prend RDV visio gratuit
3. Ouverture Assurance Vie ou PER → récompense débloquée

### 6.4 Partenaires (`/partenaires`)

3 catégories de partenaires avec logos :

1. **Assureurs & Sociétés de gestion** (~15 logos)
2. **SCPI & Immobilier direct** (~7 logos)
3. **Optimisation fiscale & Investissements atypiques** (~3 logos)

> Affichage en grille responsive. Les logos doivent être en niveaux de gris par défaut avec couleur au hover (même effet que Medemprunt).

### 6.5 PatriActu — Blog (`/patriactu`)

#### Page liste (`/patriactu/index.astro`)
- Grille de cartes BlogCard (2 colonnes desktop, 1 mobile)
- Filtrage par tag (Épargne, Fiscalité, SCPI, Retraite...)
- Pagination si > 6 articles

#### Page article (`/patriactu/[slug].astro`)
- Articles en Markdown dans `src/content/blog/`
- Layout : HeroCompact + contenu prose (Tailwind Typography)
- Sidebar optionnelle : articles connexes

**6 articles à migrer** :
1. Le Livret A a baissé en 2026
2. Pourquoi faire appel à Patrimed ?
3. Taux d'usure & Hausse des taux
4. La diversification de l'investissement
5. SCPI
6. La loi Girardin

### 6.6 RDV (`/rdv`)

Embed du widget SimplyBook.me (identique à Medemprunt).
- URL widget : `rdvlgmed.simplybook.it`
- Thème : classic, couleur bleue (#00a4ff)

### 6.7 Contact (`/contact`)

- Embed formulaire Tally (identique au WordPress actuel)
- Coordonnées : 01 77 62 44 81, contact@patrimed.fr
- Adresse : 131 boulevard Pereire, 75017 Paris

### 6.8 Pages légales

- **Mentions légales** (`/mentions-legales`) — migrer le contenu WordPress existant
- **Données personnelles** (`/donnees-personnelles`) — migrer le contenu WordPress existant

---

## 7. Header & Navigation

### Menu principal

```
Logo Patrimed | Nos Solutions | Partenaires | Parrainage | PatriActu | Contact | [RDV VISIO GRATUIT]
```

### Comportement

Le header suit **exactement le même comportement** que celui de Medemprunt :

| État | Fond | Texte | Logo |
|---|---|---|---|
| **Light (homepage, top)** | Transparent | Gris foncé | Logo sombre |
| **Light (homepage, scrolled)** | Dégradé + blur | Blanc | Logo blanc |
| **Dark (autres pages)** | Dégradé | Blanc | Logo blanc |

### Adaptation

- Remplacer `logo-medemprunt.svg` par `logo-patrimed.svg`
- Remplacer `logo-medemprunt-white.svg` par `logo-patrimed-white.svg`
- Adapter les liens de navigation (voir menu ci-dessus)
- Le CTA header reste : "RDV VISIO GRATUIT" (identique)

---

## 8. Footer

### Structure

```
┌─────────────────────────────────────────────────────────────┐
│  Logo Patrimed (blanc)    │  Liens rapides  │  Contact      │
│  "Pour la santé de        │  - Nos Solutions │  📞 01 77 62  │
│   votre patrimoine"       │  - Partenaires   │  ✉️ contact@  │
│                           │  - Parrainage    │    patrimed.fr│
│  [Facebook] [Instagram]   │  - PatriActu     │               │
│  [LinkedIn]               │                  │               │
│                           │  Liens utiles    │               │
│                           │  - RDV           │               │
│                           │  - Mentions lég. │               │
│                           │  - Données perso │               │
├─────────────────────────────────────────────────────────────┤
│  © 2026 LPMED — Tous droits réservés                        │
│  ORIAS 23003677 • CIF • COA                                │
└─────────────────────────────────────────────────────────────┘
```

### Réseaux sociaux

| Réseau | URL |
|---|---|
| Facebook | https://facebook.com/profile.php?id=100095108701526 |
| Instagram | https://instagram.com/patrimed.fr |
| LinkedIn | https://linkedin.com/company/patrimed-fr/ |

---

## 9. Intégrations tierces

| Service | Usage | Méthode d'intégration |
|---|---|---|
| **SimplyBook.me** | Prise de RDV | Widget iframe embed |
| **Tally** | Formulaire contact | Embed HTML |
| **Google Analytics** | Tracking | Script GA4 (GT-NS49LX5) |
| **Newsletter** | Inscription | Widget embed (à définir) |

### Configuration SimplyBook

```html
<!-- Widget de prise de RDV -->
<script>
  var defined_widget_url = "https://rdvlgmed.simplybook.it";
  // Thème: classic, couleur: #00a4ff
</script>
```

---

## 10. SEO & Performance

### Métadonnées par page

| Page | Title | Description |
|---|---|---|
| `/` | Patrimed — Gestion de patrimoine pour professionnels de santé | Conseil patrimonial indépendant dédié aux médecins et professions médicales. Assurance vie, PER, SCPI, fiscalité. RDV gratuit. |
| `/gestion-patrimoine` | Nos solutions patrimoniales — Patrimed | Patrimoine, fiscalité, protection, retraite et immobilier. Solutions personnalisées pour les professionnels de santé. |
| `/parrainage` | Programme de parrainage — Patrimed | Parrainez un confrère et recevez 200€ en SCPI ou 100€ en cash. |
| `/partenaires` | Nos partenaires — Patrimed | Plus de 25 partenaires financiers sélectionnés pour leur pertinence et solidité. |
| `/patriactu` | PatriActu — Blog Patrimed | Actualités financières et patrimoniales pour les professionnels de santé. |
| `/contact` | Contact — Patrimed | Contactez Patrimed. Disponible 6j/7 jusqu'à 23h en visio. |

### Performance cibles

| Métrique | Cible |
|---|---|
| Lighthouse Performance | > 95 |
| First Contentful Paint | < 1.0s |
| Largest Contentful Paint | < 2.0s |
| Cumulative Layout Shift | < 0.1 |
| Total Blocking Time | < 100ms |

### Sitemap & robots.txt

Astro avec `@astrojs/sitemap` génère automatiquement le sitemap. Le `robots.txt` doit autoriser l'indexation complète.

---

## 11. Déploiement

### Configuration Netlify

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

### Domaine

- **Production** : patrimed.fr (DNS à pointer vers Netlify)
- **Preview** : auto-généré par Netlify pour chaque PR

### Workflow Git

1. Branche `main` = production
2. Feature branches pour chaque modification
3. Pull Request obligatoire avec preview Netlify automatique
4. Merge dans `main` = déploiement automatique

---

## 12. Contenu existant à migrer

### Textes à récupérer depuis WordPress

| Page WP | Page Astro | Action |
|---|---|---|
| Homepage | `/` | Réécrire avec nouveau design |
| Gestion de patrimoine... | `/gestion-patrimoine` | Migrer le contenu des 5 sections |
| Parrainage | `/parrainage` | Adapter la mécanique |
| Partenaires | `/partenaires` | Récupérer les logos |
| PatriActu (6 articles) | `/patriactu/[slug]` | Convertir en Markdown |
| RDV | `/rdv` | Copier le widget SimplyBook |
| Contact | `/contact` | Copier le Tally embed |
| Mentions légales | `/mentions-legales` | Copier le texte intégral |
| Données personnelles | `/donnees-personnelles` | Copier le texte intégral |

### Logos partenaires à récupérer

~25 logos à exporter depuis le WordPress en format SVG ou PNG transparent :
- **Assureurs & Sociétés de gestion** : ~15 logos
- **SCPI & Immobilier direct** : ~7 logos
- **Fiscalité & Investissements atypiques** : ~3 logos

---

## 13. Assets nécessaires

### À fournir par le client

| Asset | Format | Usage |
|---|---|---|
| Logo Patrimed (sombre) | SVG | Header light, favicon |
| Logo Patrimed (blanc) | SVG | Header dark, footer |
| Favicon | ICO + PNG 192×192 | Navigateur |
| Logos partenaires (25+) | SVG ou PNG transparent | Page partenaires + homepage |
| Photos articles blog | JPG/WebP min 1200px | PatriActu |
| Open Graph image | PNG 1200×630 | Partage réseaux sociaux |

### À récupérer depuis Medemprunt

| Asset | Fichier source |
|---|---|
| tailwind.config.mjs | `medemprunt-astro/tailwind.config.mjs` |
| global.css | `medemprunt-astro/src/styles/global.css` |
| Composants de base | `medemprunt-astro/src/components/*.astro` |
| Layout | `medemprunt-astro/src/layouts/Layout.astro` |

---

## 14. Annexes

### A. Différences clés Patrimed vs Medemprunt

| Aspect | Medemprunt | Patrimed |
|---|---|---|
| **Activité** | Courtage crédit immobilier | Gestion de patrimoine |
| **Baseline** | (pas de baseline) | « Pour la santé de votre patrimoine » |
| **Hero CTA** | Barre de simulation crédit | Boutons RDV + Découvrir |
| **Services** | 4 (résidence, cabinet, travaux, patrimoine) | 5 (patrimoine, fiscalité, protection, retraite, immobilier) |
| **Blog** | Non (MedActu = lien externe) | Oui (PatriActu intégré) |
| **Parrainage** | Carte cadeau 50€ | 200€ SCPI ou 100€ cash |
| **Newsletter** | Non | Oui (formulaire sur homepage) |
| **Couleurs** | Identiques | Identiques |

### B. Référence design system — fichier tailwind.config.mjs complet

Le fichier complet est disponible dans :
```
medemprunt-astro (branche claude/youthful-brattain) → tailwind.config.mjs
```

### C. CSS custom — fichier global.css

Le fichier complet est disponible dans :
```
medemprunt-astro (branche claude/youthful-brattain) → src/styles/global.css
```

Classes CSS custom documentées :
- `.gradient-bg`, `.gradient-text`, `.divider-gradient`
- `.hero-light`, `.trust-badge`
- `.sim-bar`, `.sim-bar-input`, `.sim-bar-select`, `.sim-bar-label`
- `.stats-banner`, `.stat-value`
- `.bento-item-accent`, `.bento-tag`
- `.header-light`, `.header-scrolled`
- `.reveal`, `.reveal.active`
- `.card-hover`
- `.btn-primary`, `.btn-secondary`, `.btn-white`
- `.container-custom`

### D. Sites d'inspiration

| Site | Ce qu'on retient |
|---|---|
| [qonto.fr](https://qonto.fr) | Hero épuré, espaces blancs généreux, typographie bold |
| [pretto.fr](https://pretto.fr) | Bento grid services, cartes arrondies, animations douces |
| [alan.com](https://alan.com) | Couleurs vives sur fond blanc, illustrations simples |

### E. Estimation effort de développement

| Tâche | Estimation |
|---|---|
| Setup projet + design system | 0.5 jour |
| Layout + Header + Footer | 0.5 jour |
| Homepage | 1.5 jours |
| Page gestion patrimoine | 1 jour |
| Parrainage + Partenaires | 1 jour |
| PatriActu (blog + articles) | 1.5 jours |
| RDV + Contact + pages légales | 0.5 jour |
| SEO + performance + tests | 0.5 jour |
| Déploiement Netlify + DNS | 0.5 jour |
| **Total estimé** | **~7-8 jours développeur** |

---

> **Document généré le 3 mars 2026**
> Pour toute question, contacter Maximilien Brami — contact@patrimed.fr
