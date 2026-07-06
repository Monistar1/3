# Ever After — Premium Wedding Anniversary Website

A luxury, bilingual (Arabic / English), static wedding anniversary memory website designed for premium client experiences.

---

## What Changed

The original static anniversary page has been rebuilt into a commercial-grade product with:

- **Professional design system** with tokens for colors, typography, spacing, shadows, and motion.
- **Component-based frontend** in vanilla ES modules — no build step required.
- **JSON-based internationalization** for Arabic and English with full RTL support.
- **Premium UX features**: cinematic intro, loading screen, ambient living background, dynamic anniversary counter, private memory mode, multiple themes.
- **Smooth scroll reveal animations** and elegant hover micro-interactions.

---

## Project Structure

```
.
├── index.html                    # Public website entry
├── README.md                     # This file
├── .env.example                  # Frontend env template
├── .github/workflows/pages.yml   # GitHub Pages deployment
├── locales/
│   ├── en.json                   # English content
│   └── ar.json                   # Arabic content
├── src/
│   ├── styles/                   # Design system + component styles
│   │   ├── design-system.css
│   │   ├── main.css
│   │   ├── utilities.css
│   │   ├── themes/
│   │   │   ├── burgundy-gold.css
│   │   │   ├── midnight-rose.css
│   │   │   └── ivory-garden.css
│   │   └── components/
│   └── js/
│       ├── app.js                # Application orchestrator
│       ├── config.js             # Client customization
│       ├── core/                 # i18n, theme, router, animations
│       ├── components/           # Reusable components
│       └── utils/                # Date, DOM helpers
├── admin/                        # Admin panel foundation (future)
└── assets/
    ├── images/
    ├── videos/                   # Temporary sample videos
    └── music/                    # Temporary sample music
```

---

## Quick Start

Open `index.html` in any modern browser or serve locally:

```bash
python -m http.server 8080
# Open http://localhost:8080/index.html
```

---

## Customize the Experience

Edit `src/js/config.js`:

```js
coupleNames: ['Layla', 'Omar'],
anniversaryDate: { year: 2018, month: 6, day: 15 },
musicFile: 'assets/music/ambient-romantic.wav',
theme: 'burgundy-gold',
privateModePassPhrase: null, // or 'our secret phrase'
```

Edit all text content in `locales/en.json` and `locales/ar.json`.

Replace sample images and videos in `assets/images/` and `assets/videos/` with your own.

---

## Deploy on GitHub Pages

This project is ready for GitHub Pages. The frontend is fully static and does not require a build step.

### Steps

1. Push this repository to GitHub.
2. Go to **Settings → Pages** in your repository.
3. Under **Source**, select **GitHub Actions**.
4. The included workflow `.github/workflows/pages.yml` will deploy automatically on every push to `main` or `master`.

### Custom domain (optional)

If you want a custom domain like `ourstory.com`:

1. Create a `CNAME` file in the repository root containing your domain:
   ```
   ourstory.com
   ```
2. Configure the DNS records with your domain provider.
3. Enable the custom domain in **Settings → Pages**.

---

## Design System

All visual values live in `src/styles/design-system.css`.

| Token Category | CSS Variables |
|---|---|
| Colors | `--color-bg-primary`, `--color-text-primary`, `--color-accent`, `--color-gold` |
| Typography | `--font-serif`, `--font-sans`, `--font-ar` |
| Spacing | `--space-xs` through `--space-4xl` |
| Motion | `--ease-silence`, `--ease-luxury`, `--duration-slow` |
| Shadows | `--shadow-sm` through `--shadow-xl` |
| Radii | `--radius-sm` through `--radius-pill` |

Themes are CSS files in `src/styles/themes/` that override only the color tokens.

---

## Premium Features

- Cinematic intro with animated couple names
- Premium loading screen
- Living gradient background + ambient orbs + particle canvas
- Dynamic anniversary counter (years, months, days)
- Private memory mode with pass phrase
- Multiple romantic themes
- Smooth scroll reveal animations
- Elegant hover micro-interactions
- Mobile-first responsive design
- Full Arabic RTL support

---

## Performance

- Lazy-loaded images
- Async decoding
- CSS custom properties reduce duplication
- Component-based CSS split
- No heavy frontend framework

---

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). ES modules required.

---

Made with quiet intention.
