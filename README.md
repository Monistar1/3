# Ever After — Premium Wedding Anniversary Website

A luxury, bilingual (Arabic / English), scalable wedding anniversary memory platform designed for premium client experiences.

---

## What Changed

The original static anniversary page has been rebuilt into a commercial-grade product with:

- **Professional design system** with tokens for colors, typography, spacing, shadows, and motion.
- **Component-based frontend** in vanilla ES modules — no build step required.
- **JSON-based internationalization** for Arabic and English with full RTL support.
- **Premium UX features**: cinematic intro, loading screen, ambient canvas, dynamic anniversary counter, private memory mode, multiple themes.
- **Node.js backend** with Express, Prisma, PostgreSQL, JWT auth, file upload protection, and image optimization.
- **Admin panel foundation** with profile editing, section toggles, and preview link.

---

## Project Structure

```
.
├── index.html                    # Public website entry
├── README.md                     # This file
├── .env.example                  # Frontend env template
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
│       ├── core/                 # i18n, theme, router, animations, api
│       ├── components/           # Reusable components
│       └── utils/                # Date, DOM helpers
├── admin/                        # Admin dashboard foundation
│   ├── index.html
│   └── src/
├── backend/                      # Node.js API
│   ├── src/
│   ├── prisma/
│   └── README.md
└── assets/
    ├── images/
    └── music/
```

---

## Quick Start

### 1. Static Website

Open `index.html` in any modern browser. No build step is needed.

### 2. Customize the Experience

Edit `src/js/config.js`:

```js
coupleNames: ['Layla', 'Omar'],
anniversaryDate: { year: 2018, month: 6, day: 15 },
musicFile: 'assets/music/ambient-romantic.mp3',
theme: 'burgundy-gold',
privateModePassPhrase: null, // or 'our secret phrase'
```

Edit content in `locales/en.json` and `locales/ar.json`.

### 3. Run the Backend

```bash
cd backend
cp .env.example .env
# Update DATABASE_URL and JWT_SECRET in .env
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

### 4. Open the Admin Panel

Open `admin/index.html` in a browser and sign in with the demo credentials from `backend/prisma/seed.js`.

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

## Backend Architecture

- **Express 5** REST API
- **Prisma ORM** + PostgreSQL
- **JWT** authentication
- **bcrypt** password hashing
- **Helmet**, **CORS**, **Rate Limiting**
- **Multer** + **Sharp** for secure image uploads and optimization
- **Zod** input validation

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register account |
| POST | `/api/auth/login` | Login, receive JWT |
| GET | `/api/profiles/slug/:slug` | Public profile metadata |
| GET | `/api/profiles/:id/full` | Full profile with relations |
| POST | `/api/profiles` | Create profile (auth) |
| PATCH | `/api/profiles/:id` | Update profile (auth) |
| POST | `/api/uploads/image` | Upload + optimize image (auth) |

### Database Schema

- `User` — accounts and roles
- `WeddingProfile` — couple, date, story, privacy, theme
- `Memory` — timeline entries
- `GalleryItem` — photos
- `LoveLetter` — salutation, paragraphs, signature
- `ThemeSetting` — colors and fonts
- `MusicSetting` — music file and volume
- `SiteSection` — section visibility
- `Message` — optional guest messages

---

## Premium Features

- Cinematic intro with animated couple names
- Premium loading screen
- Ambient particle canvas (low CPU, respects reduced motion)
- Dynamic anniversary counter (years, months, days)
- Private memory mode with pass phrase
- Multiple romantic themes
- Smooth scroll reveal animations
- Elegant hover micro-interactions
- Mobile-first responsive design
- Full Arabic RTL support

---

## Security Checklist

- Environment variables for secrets
- Input validation with Zod
- File type and size restrictions
- Password hashing with bcrypt
- JWT-protected admin routes
- Helmet security headers
- Rate limiting on API routes

---

## Performance

- Lazy-loaded images
- Async decoding
- CSS custom properties reduce duplication
- Component-based CSS split
- No heavy frontend framework
- Image optimization via backend

---

## Deploy on GitHub Pages

This project is ready for GitHub Pages. The frontend is fully static and does not require a build step.

### Steps

1. Push this repository to GitHub.
2. Go to **Settings → Pages** in your repository.
3. Under **Source**, select **GitHub Actions**.
4. The included workflow `.github/workflows/pages.yml` will deploy automatically on every push to `main` or `master`.

### Important notes

- GitHub Pages hosts only the static frontend (`index.html`, `src/`, `locales/`, `assets/`, `admin/`).
- The `backend/` folder remains in the repository but is **not executed** by GitHub Pages.
- If you want the backend features (login, database, image upload), host the backend separately on **Render**, **Railway**, **Heroku**, or similar.
- Do not commit `.env` files — they are ignored by `.gitignore`.

### Custom domain (optional)

If you want a custom domain like `ourstory.com`:

1. Create a `CNAME` file in the repository root containing your domain:
   ```
   ourstory.com
   ```
2. Configure the DNS records with your domain provider.
3. Enable the custom domain in **Settings → Pages**.

---

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). ES modules required.

---

Made with quiet intention.
