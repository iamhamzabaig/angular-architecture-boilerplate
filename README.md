# Angular Enterprise Boilerplate

[![CI](https://github.com/iamhamzabaig/angular-architecture-boilerplate/actions/workflows/ci.yml/badge.svg)](https://github.com/iamhamzabaig/angular-architecture-boilerplate/actions/workflows/ci.yml)
[![Release](https://github.com/iamhamzabaig/angular-architecture-boilerplate/actions/workflows/release.yml/badge.svg)](https://github.com/iamhamzabaig/angular-architecture-boilerplate/actions/workflows/release.yml)
![Angular](https://img.shields.io/badge/angular-19.x-red)
![Nx](https://img.shields.io/badge/nx-22.x-143055)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Enterprise-ready Angular monorepo template for medium to large applications, built with Nx and designed for scalable feature development, strict boundaries, and CI-first delivery.

## Overview

This repository provides:

- Angular 19 standalone-first application architecture
- Nx integrated workspace with enforced module boundaries
- Domain-oriented library segmentation
- Angular Material baseline UI + app shell
- OpenAPI-driven contract generation pipeline
- Built-in i18n workflow (`en-US` source, `fr` example)
- Automated quality gates and semantic-release pipeline

## Technology Baseline

- Angular `~19.2.x`
- Nx `22.x`
- TypeScript `~5.8.x`
- Jest (`jest-preset-angular`) for unit tests
- Playwright for end-to-end tests
- ESLint + angular-eslint

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm 10 or newer

### Install Dependencies

```sh
npm ci
```

### Start Development Server

```sh
npm start
```

Application URL: `http://localhost:4200`

## Workspace Layout

```text
apps/
  web/                       # Main Angular application
  web-e2e/                   # Playwright E2E project

libs/
  auth/
    data-access-auth/        # Auth session, guard, interceptor
    feature-auth/            # Login feature UI
  dashboard/
    feature-dashboard/       # Protected dashboard feature UI
  platform/
    app-config/              # Environment and app-level config token
    api-client/              # Hand-authored API adapters
    api-client-generated/    # Generated OpenAPI models
  shared/
    contracts/               # Shared DTO and contract types
    ui-shell/                # Shared application shell components

openapi/
  specs/core-api.yaml        # OpenAPI source definition

tools/
  openapi/generate.mjs       # OpenAPI generation script
```

## Documentation

- Architecture guide: `docs/architecture.md`
- Contribution guide: `CONTRIBUTING.md`

## Architectural Conventions

Module boundaries are enforced in `eslint.config.mjs` via Nx tags:

- `scope:*` for ownership and domain boundaries (`scope:auth`, `scope:dashboard`, `scope:platform`, `scope:shared`, `scope:web`)
- `type:*` for layer boundaries (`type:feature`, `type:data-access`, `type:ui`, `type:util`, `type:contracts`, `type:generated`)

These constraints prevent accidental coupling and maintain clear dependency direction as the codebase grows.

## Common Commands

- `npm start` - run the `web` app in development mode
- `npm run build` - production build of `web`
- `npm run build:fr` - localized French production build
- `npm run lint` - lint all projects
- `npm run test` - run all unit tests
- `npm run e2e` - run Playwright suite (`web-e2e`)
- `npm run affected:ci` - affected lint/test/build for PR validation
- `npm run generate:api` - regenerate OpenAPI artifacts
- `npm run i18n:extract` - extract translatable messages
- `npm run release` - semantic-release execution

## API Contract Workflow

OpenAPI source of truth:

- `openapi/specs/core-api.yaml`

Generate typed models:

```sh
npm run generate:api
```

Generated output location:

- `libs/platform/api-client-generated/src/lib/generated`

## Localization Workflow

- Source locale: `en-US`
- Example translated locale: `fr`

Translation files:

- `apps/web/src/locale/messages.xlf`
- `apps/web/src/locale/messages.fr.xlf`

Extract and build localized bundle:

```sh
npm run i18n:extract
npm run build:fr
```

## CI/CD and Release

- CI: `.github/workflows/ci.yml`
  - Runs affected lint/test/build checks on pull requests and `main`
- Release: `.github/workflows/release.yml`
  - Executes semantic-release on `main`
- Release policy/config: `.releaserc.json`

## Troubleshooting

- If Playwright browsers are missing:

```sh
npx playwright install chromium firefox webkit
```

- If editor TypeScript diagnostics differ from CLI:
  - Use workspace TypeScript (configured in `.vscode/settings.json`)
  - Restart TS server in VS Code

- If port `4200` is occupied:
  - Run app on another port: `npx nx run web:serve -- --port=4300`
