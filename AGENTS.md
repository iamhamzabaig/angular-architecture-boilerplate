# Repository Guidelines

## Project Structure & Module Organization
This is an Nx Angular workspace. The main app lives in `apps/web`, with assets in `apps/web/public`, source in `apps/web/src`, environments in `apps/web/src/environments`, and localization files in `apps/web/src/locale`. Playwright e2e tests live in `apps/web-e2e/src`.

Reusable code is organized by domain and layer under `libs/`: `auth`, `dashboard`, `platform`, and `shared`. Prefer the most specific library boundary. Generated OpenAPI output is in `libs/platform/api-client-generated`; do not hand-edit it.

## Build, Test, and Development Commands
- `npm ci`: install locked dependencies.
- `npm start`: serve the `web` app through Nx.
- `npm run build`: build the `web` app.
- `npm run build:fr`: build the French-localized app configuration.
- `npm run lint`: run ESLint across workspace projects.
- `npm test`: run Jest unit tests across workspace projects.
- `npm run e2e`: run Playwright tests for `web-e2e`.
- `npm run affected:ci`: validate affected lint, test, and build targets against `origin/main`.
- `npm run generate:api`: regenerate OpenAPI client artifacts after API spec changes.
- `npm run i18n:extract`: extract Angular i18n messages.

## Coding Style & Naming Conventions
Use TypeScript, standalone Angular patterns, SCSS, and Nx project boundaries. `.editorconfig` requires UTF-8, two-space indentation, final newlines, and trimmed trailing whitespace. Prettier uses single quotes. Name specs `*.spec.ts`; keep public library exports in each `src/index.ts`. Import libraries through `@boilerplate/*` aliases instead of deep cross-library relative paths.

## Testing Guidelines
Jest is configured per app/library with Nx caching and CI coverage support. Add or update tests next to changed behavior, especially for guards, services, mappers, components, and API adapters. Playwright covers browser flows in `apps/web-e2e/src`. Run `npm test` for unit coverage and `npm run e2e` when routing or critical workflows change.

## Commit & Pull Request Guidelines
Use Conventional Commits, for example `feat: add session timeout warning`, `fix: handle auth token parse failure`, or `docs: update architecture guide`. Semantic-release depends on this format.

Pull requests should state what changed, why, affected apps/libs, test results, and any migration or operational impact. Link related issues when available and include screenshots for visible UI changes.

## Architecture & Configuration Notes
Respect Nx `scope:*` and `type:*` dependency constraints; fix blocked imports by moving code to the right layer, not by disabling lint. Do not commit secrets. When API contracts change, update `openapi/specs/core-api.yaml`, regenerate the client, and verify adapter code in `libs/platform/api-client`.
