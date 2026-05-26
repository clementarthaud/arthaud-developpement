# Arthaud Développement — Site web (V3 multi-pages)

Site statique 5 pages, palette « Méditerranée vivante », déployable sur Netlify Drop ou GitHub Pages.

```
arthaud-developpement/
├── index.html              ← Accueil (hero vidéo + 3 tuiles + à propos)
├── operations.html         ← Opérations en cours (3 grandes cards)
├── stock.html              ← Stock disponible (filtres collants + 10 lots)
├── realisations.html       ← Réalisations livrées (5 projets)
├── contact.html            ← Formulaire + coordonnées (2 colonnes)
├── style.css               ← Feuille de style partagée
├── main.js                 ← Navigation, vidéo, filtres, formulaire
├── README.md
└── assets/
    ├── videos/
    │   ├── hero-1.mp4
    │   ├── hero-2.mp4
    │   └── hero-3.mp4
    └── img/
        ├── sade/           ← Les Jardins de Sade (21/23 rue Sade)
        │   ├── facade.jpg
        │   ├── render.png
        │   └── lots/       ← 9 plans de lots
        ├── sade-25/        ← 25 rue Sade (en préparation)
        ├── bateau/         ← 9 rue du Bateau (en cours)
        └── realisations/
            ├── republique/   (10 photos)
            ├── lacan/        (6 photos)
            ├── revely/       (5 photos)
            ├── petit-four/   (6 photos)
            └── felix-faure/  (1 photo)
```

---

## Identité visuelle

| Token | Valeur | Usage |
|---|---|---|
| `--c-bg` | `#FAFAF7` | Fond principal |
| `--c-bg-warm` | `#F2EDE4` | Sections alternées, form-card |
| `--c-sand` | `#D9D0C4` | Filets, séparateurs |
| `--c-stone` | `#8C8378` | Libellés, eyebrows |
| `--c-sky` | `#7BAEC8` | Accent clair, sélection |
| `--c-sky-deep` | `#5A90AE` | CTA, liens, focus |
| `--c-ink` | `#1E1C1A` | Texte, footer, contact band |

**Typographie**
- **Playfair Display** — titres (h1–h4) et chiffres clés
- **Syne** — labels, navigation, eyebrows, boutons
- **Outfit** — corps de texte, formulaires

---

## Déploiement

### Netlify Drop (30 secondes)
1. Aller sur **app.netlify.com/drop**
2. Glisser-déposer le dossier `arthaud-developpement/` entier

### GitHub Pages
1. Créer un repository, pousser les fichiers à la racine
2. Settings → Pages → Source : `main` / `root`

---

## Hero vidéo

L'accueil affiche une rotation séquentielle des 3 vidéos (`assets/videos/hero-1.mp4`, `hero-2.mp4`, `hero-3.mp4`).

- **Desktop** : autoplay muet en boucle, transition entre vidéos en `opacity 1.4s`
- **Mobile (< 768 px)** ou **prefers-reduced-motion** : les vidéos sont retirées du DOM, l'image `render.png` reste affichée
- **Fallback** : si `play()` est refusé par le navigateur, l'image statique reprend la main

Pour remplacer une vidéo, écraser le fichier en conservant le nom : `hero-1.mp4`, `hero-2.mp4` ou `hero-3.mp4`. Format recommandé : **H.264 720p, débit modéré (3–5 Mb/s), pas d'audio**.

---

## Ajouter un lot au stock

Dans `stock.html`, juste avant `</div>` qui ferme `#stock-grid`, ajouter :

```html
<article class="lot-card reveal"
  data-operation="jardins-sade"
  data-type="T3"
  data-budget="700k-1m"
  data-surface="70-100"
  data-ref="JDS-XX">
  <div class="lot-card__media">
    <span class="lot-card__floor">R+2</span>
    <span class="lot-card__op">Jardins de Sade</span>
    <img src="assets/img/sade/lots/lot-xxx.png" alt="..." loading="lazy">
  </div>
  <div class="lot-card__body">
    <span class="lot-card__type">T3 · Traversant</span>
    <h3 class="lot-card__title">Titre du lot</h3>
    <ul class="lot-card__specs">
      <li>XX m²</li>
      <li>Vieil Antibes</li>
    </ul>
    <p class="lot-card__price">XXX 000 € <small>FAI</small></p>
    <a href="contact.html" class="btn btn--primary btn--sm listing-cta lot-card__cta">Demander une information</a>
  </div>
</article>
```

Pour afficher une **photo** plutôt qu'un plan, ajouter la classe `lot-card__media--photo` au div media.

### Valeurs des `data-*` (filtres)

| Attribut | Valeurs acceptées |
|---|---|
| `data-operation` | `jardins-sade` · `9-bateau` · `25-sade` |
| `data-type` | `T2` · `T3` · `T4` |
| `data-budget` | `inf-400k` · `400k-700k` · `700k-1m` · `sup-1m` |
| `data-surface` | `inf-40` · `40-70` · `70-100` · `sup-100` |

### Masquer un bien vendu
Ajouter `hidden` sur l'article :
```html
<article class="lot-card reveal" hidden ...>
```

---

## Ajouter une opération

Dans `operations.html`, dupliquer un bloc `<article class="op-row reveal">`. Pour inverser l'ordre image/texte, c'est automatique (sélecteur `:nth-child(even)`).

---

## Ajouter une réalisation

Dans `realisations.html`, dupliquer un bloc `<article class="real-card reveal">` à l'intérieur de `.real-grid`.

---

## Modifier les coordonnées

L'adresse `contact@arthaud-developpement.fr` apparaît dans :
- `index.html` (footer)
- `operations.html` (footer)
- `stock.html` (footer)
- `realisations.html` (footer)
- `contact.html` (footer + bloc coordonnées)
- `main.js` (ligne `mailto:` du formulaire)

Pour passer à **Formspree** (sans client mail) :

1. Créer un compte sur **formspree.io**, copier l'endpoint
2. Dans `contact.html`, ajouter sur le `<form>` :
   ```html
   <form id="contact-form" class="contact-form"
         action="https://formspree.io/f/VOTRE_ID"
         method="POST" novalidate>
   ```
3. Dans `main.js`, à la fin du `submit`, remplacer le bloc `mailto` par :
   ```js
   form.submit();
   ```

---

## Pages & rôles

| Page | Rôle |
|---|---|
| `index.html` | Vitrine émotionnelle. Header **transparent** sur le hero vidéo |
| `operations.html` | Projets en cours, avec stats, badges et CTA vers stock/contact |
| `stock.html` | Catalogue avec **filtres collants** sous le header. Compteur live |
| `realisations.html` | Portfolio des livraisons (Antibes + Nice) |
| `contact.html` | Layout 2 colonnes : infos à gauche, formulaire à droite. Validation + mailto |

Toutes les pages partagent un même **header**, un même **footer** et la classe `.active` est appliquée sur l'onglet courant.

---

## Accessibilité

- Contraste AA respecté sur l'ensemble des paires
- `:focus-visible` visible sur tous les contrôles interactifs
- `aria-label`, `aria-expanded`, `aria-live` sur menu, filtres, formulaire
- Respect de `prefers-reduced-motion` (animations désactivées, vidéo arrêtée)
- Skip mobile : vidéo désactivée < 768 px (économie de data + autoplay capricieux)
- Cibles tactiles ≥ 44 × 44 px (boutons, sélecteurs, items de nav)
