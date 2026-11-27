# AGENTS.md

EduComparte Huancayo is a two-app repository: an Angular SPA in `frontend/` and a FastAPI API in `backend/`. There is no root workspace, package manager, CI, linter, or usable root README; treat this file and the per-app configs as the setup docs.

## Layout

- `frontend/` — Angular 22 standalone app, workspace project `educomparte-app`, TypeScript + Vitest/jsdom.
- `backend/` — FastAPI/Pydantic API, Python 3.15, dependencies locked with `uv` in `backend/uv.lock`.
- The Angular app previously lived in `educomparte-app/` and the Python app at the repo root. Current work belongs in `frontend/` and `backend/`; don't revive the deleted paths.
- `README.md` and `backend/README.md` are empty. `frontend/README.md` is stock Angular CLI text; it mentions `ng e2e`, but no e2e target or framework is configured.

## Commands

Frontend, from `frontend/` (use npm; `package-lock.json` is authoritative):

- `npm start` — dev server on `http://localhost:4200`.
- `npm run build` — production build (default configuration).
- `npx ng build --configuration development` — faster unoptimized build.
- `npm test` — Vitest. Add `--watch=false` outside a TTY. Focus with `--include src/app/path/file.spec.ts` or `--filter "^App"`.
- `npx prettier --write <paths>` — formatting only (100 columns, single quotes, Angular HTML parser). There is no lint script or ESLint config.

Backend, from `backend/`:

- `uv run uvicorn src.backend.main:app --reload --port 8000` — API on `http://127.0.0.1:8000`; Swagger at `/docs`.
- Imports are `src.backend.*`. They resolve only with `backend/` as the working directory (or `PYTHONPATH=backend`); running from the repo root fails with `ModuleNotFoundError: No module named 'src'`.
- No backend tests or test runner are configured.

## Known breakage at time of writing

- `npm run build` fails: `src/app/components/detalle-recurso/detalle-recurso.ts:34-35` calls `RecursoService.obtenerRecursos()` (an `Observable`) and then `recursos.find(...)`. Use `obtenerRecursoPorId(id)` with `subscribe`/`firstValueFrom`, or subscribe to the list.
- `npm test` also fails on stale generated specs: `detalle-recurso.spec.ts` imports `DetalleRecurso` (exported class is `DetalleRecursoComponent`) and `recurso-formulario.spec.ts` imports `RecursoFormulario` (exported class is `RecursoFormularioComponent`). `app.spec.ts` asserts `"Hello, educomparte-app"`, which `app.html` does not render. `auth.service.spec.ts` is an old copy of `AuthService`, not a test. Re-check before assuming a red run is your fault.

## Backend behavior

- CRUD endpoints are under `/api/recursos`; routers are in `src/backend/apis/`.
- Storage is an in-memory list seeded with two demo resources in `RecursoService.__init__`. Created/updated data disappears on restart. No database, migrations, or backend auth exist.
- Keep the layering: `apis/` (HTTP) → `services/` (logic) → `repositorio/` (storage) → `schemas/` (Pydantic).
- CORS allows only `http://localhost:4200` and `http://127.0.0.1:4200`. The frontend API base is `http://127.0.0.1:8000` in `frontend/src/environments/environment.ts`; keep ports aligned on both sides.

## Frontend conventions

- Login is a mock: `src/app/services/auth.service.ts` hardcodes `estudiante@continental.edu.pe` / `123456` and stores the session in memory. There are no auth endpoints or route guards.
- Components are standalone. The shell is `src/app/app.ts`; routes are in `src/app/app.routes.ts`.
- Bootstrap 5 and Bootstrap Icons come from CDN `<link>`/`<script>` tags in `src/index.html`; `angular.json` only includes `src/styles.css`. The `bootstrap` npm packages are unused, so add global CSS to `src/styles.css`.
- Domain names, routes, and UI copy are Spanish (`Recurso`, `publicar`, `explorar`); keep new domain code Spanish. User-facing alerts use SweetAlert2.
