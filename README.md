# og-procurement

This repository is now split into:
- `frontend` (React + Vite)
- `backend` (Express API with Supabase connector)

## Project Structure

- `frontend/src/App.jsx`: UI app (formerly monolithic)
- `backend/src/server.js`: API entrypoint
- `backend/src/config/supabaseClient.js`: Supabase connector
- `backend/src/routes/*`: API resource routes
- `backend/supabase/schema.sql`: starter table schema
- `backend/supabase/seed.sql`: seed data from current mock records
- `docker-compose.yml`: run frontend + backend together

## 1. Install

```bash
npm install
npm run install:all
```

## 2. Configure Environment

Backend:

```bash
cp backend/.env.example backend/.env
```

Then edit `backend/.env`:

```env
PORT=4000
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

Frontend:

```bash
cp frontend/.env.example frontend/.env
```

`frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

## 3. Run

Run both services:

```bash
npm run dev
```

Or separately:

```bash
npm run dev:backend
npm run dev:frontend
```

## API Endpoints

- `GET /health`

Tenders:
- `GET /api/tenders`
- `POST /api/tenders`
- `PUT /api/tenders/:id`
- `DELETE /api/tenders/:id`

Vendors:
- `GET /api/vendors`
- `POST /api/vendors`
- `PUT /api/vendors/:id`
- `DELETE /api/vendors/:id`

Purchase Orders:
- `GET /api/purchase-orders`
- `POST /api/purchase-orders`
- `PUT /api/purchase-orders/:id`
- `DELETE /api/purchase-orders/:id`

HSE Incidents:
- `GET /api/hse-incidents`
- `POST /api/hse-incidents`
- `PUT /api/hse-incidents/:id`
- `DELETE /api/hse-incidents/:id`

If Supabase env vars are missing, backend responds with fallback data so frontend still works.
Mutation endpoints (`POST`, `PUT`, `DELETE`) require Supabase config and return `503` if not configured.

## Supabase Setup

1. Open your Supabase SQL editor.
2. Run `backend/supabase/schema.sql`.
3. Run `backend/supabase/seed.sql` to load the mock dataset.
4. Start backend and verify `GET /health` returns `supabaseConfigured: true`.

## Run With Docker Compose

1. Ensure `backend/.env` exists with your Supabase credentials.
2. Build and start both services:

```bash
docker compose up --build
```

3. Open:
- Frontend: `http://localhost:4173`
- Backend health: `http://localhost:4000/health`