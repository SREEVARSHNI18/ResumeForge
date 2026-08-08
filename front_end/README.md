# Resume Tailor — frontend (Phase 1)

Vite + React + TypeScript + Tailwind v4. Covers: signup/login and resume
upload with a parsed-sections preview.

## Testing with no backend running (mock mode)

```bash
npm install
echo "VITE_USE_MOCK_API=true" > .env
npm run dev
```

Open http://localhost:5173. Signup, login, and resume upload all work
against fake in-memory data (src/lib/mockApi.ts) — no backend, no database,
no network calls at all. This is the fastest way to test the UI on its own.

Note: mock-mode "accounts" only live in memory for that browser tab's
session — refreshing the page resets them, since there's no real backend
storing anything.

## Running against the real backend

```bash
npm install
npm run dev
```

With no .env, the dev server proxies /api/* to http://localhost:8000 (see
vite.config.ts) — make sure the backend is running there first.

If your backend runs elsewhere, copy .env.example to .env and set
VITE_API_BASE_URL to its real URL instead.

## Structure

```
src/
  lib/api.ts               -> typed fetch wrapper, JWT storage, error handling,
                               routes to mockApi.ts when VITE_USE_MOCK_API=true
  lib/mockApi.ts            -> fake in-memory API for backend-free testing
  context/AuthContext.tsx  -> auth state shared across the app
  components/
    ProtectedRoute.tsx     -> redirects to /login if not authenticated
    AuthForm.tsx           -> shared login/signup form pieces
    ResumeDropzone.tsx     -> drag-and-drop file upload
    ParsedResumeView.tsx   -> renders the backend's parsed sections
  pages/
    LoginPage.tsx
    SignupPage.tsx
    DashboardPage.tsx      -> upload + view flow
```

## What's next (not built yet)

- Company/role selection UI (the 3-tier profile sourcing)
- Match score + gap report screens
- Iterative "add skill/project, re-score" loop with score history
- Tailored resume generation + export

## Production build

```bash
npm run build   # bakes in whatever's in .env at build time
npm run preview # serve the production build locally
```
