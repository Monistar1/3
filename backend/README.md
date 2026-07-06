# Ever After — Backend

Premium wedding anniversary website API.

## Getting Started

1. Copy `.env.example` to `.env` and fill in your database URL and JWT secret.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run migrations:
   ```bash
   npm run db:migrate
   ```
4. Seed demo data:
   ```bash
   npm run db:seed
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## API Overview

- `POST /api/auth/register` — create admin/client account
- `POST /api/auth/login` — receive JWT
- `GET /api/profiles/slug/:slug` — public profile metadata
- `GET /api/profiles/:id/full` — full profile with all relations
- `POST /api/profiles` — create profile (auth required)
- `PATCH /api/profiles/:id` — update profile (auth required)
- `POST /api/uploads/image` — upload and optimize image (auth required)

## Security

- Helmet headers
- CORS limited to `CLIENT_URL`
- Rate limiting on `/api/*`
- Password hashing with bcrypt
- JWT authentication
- File type whitelist and size limits
- Sharp image optimization
