# Angular Enterprise Boilerplate

Production-oriented Nx monorepo starter for medium to large Angular applications.

## What This Provides

- Angular 19 standalone-first architecture
- Nx integrated workspace with enforceable module boundaries
- Domain-driven library structure (`feature`, `data-access`, `platform`, `shared`)
- Angular Material theming and shell
- OpenAPI contract-first generation flow
- Built-in i18n workflow (`en-US` source + `fr` sample locale)
- CI quality gates and semantic-release automation

## Tech Stack

- Angular `~19.2.x`
- Nx `22.x`
- TypeScript `~5.8.x`
- Jest + `jest-preset-angular`
- Playwright for e2e
- ESLint + angular-eslint

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```sh
npm ci
```

### Run the App

```sh
npm start
```

App default URL: `http://localhost:4200`

## Workspace Structure

```text
apps/
  web/          # Main Angular application
  web-e2e/      # Playwright e2e tests

libs/
  auth/
    data-access-auth/
    feature-auth/
  dashboard/
    feature-dashboard/
  platform/
    app-config/
    api-client/
    api-client-generated/
  shared/
    contracts/
    ui-shell/

openapi/
  specs/core-api.yaml

tools/
  openapi/generate.mjs
```

## Architecture Rules

Module boundaries are enforced by `@nx/enforce-module-boundaries` in `eslint.config.mjs` using:

- `scope:*` tags for domain ownership (`scope:auth`, `scope:dashboard`, etc.)
- `type:*` tags for layer constraints (`type:feature`, `type:data-access`, `type:ui`, `type:contracts`, `type:generated`)

This is the main guardrail that keeps large codebases maintainable as teams scale.

## Scripts

- `npm start` - serve `web` app
- `npm run build` - production build
- `npm run build:fr` - localized French build
- `npm run lint` - lint all projects
- `npm run test` - run unit tests across projects
- `npm run e2e` - run Playwright e2e
- `npm run affected:ci` - lint/test/build affected projects
- `npm run generate:api` - generate OpenAPI client artifacts
- `npm run i18n:extract` - extract translation messages
- `npm run release` - semantic-release

## OpenAPI Workflow

### Source of Truth

- Spec: `openapi/specs/core-api.yaml`

### Generate Contracts

```sh
npm run generate:api
```

Generated models are written to:

- `libs/platform/api-client-generated/src/lib/generated`

## Internationalization

- Source locale: `en-US`
- Sample translation locale: `fr`
- Translation files:
  - `apps/web/src/locale/messages.xlf`
  - `apps/web/src/locale/messages.fr.xlf`

Commands:

```sh
npm run i18n:extract
npm run build:fr
```

## Quality and CI/CD

- CI workflow: `.github/workflows/ci.yml`
  - Runs affected lint/test/build on PRs and `main`
- Release workflow: `.github/workflows/release.yml`
  - Runs semantic-release on `main`
- Release config: `.releaserc.json`

## Notes

- Playwright requires browser binaries. If missing:

```sh
npx playwright install chromium firefox webkit
```

- This repo is pinned to TypeScript `5.8.x`. In VS Code, use workspace TypeScript (`.vscode/settings.json` is configured for this).
