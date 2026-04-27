# Angular Enterprise Boilerplate

[![CI](https://github.com/iamhamzabaig/angular-architecture-boilerplate/actions/workflows/ci.yml/badge.svg)](https://github.com/iamhamzabaig/angular-architecture-boilerplate/actions/workflows/ci.yml)
[![Release](https://github.com/iamhamzabaig/angular-architecture-boilerplate/actions/workflows/release.yml/badge.svg)](https://github.com/iamhamzabaig/angular-architecture-boilerplate/actions/workflows/release.yml)
![Angular](https://img.shields.io/badge/Angular-19.x-DD0031?logo=angular&logoColor=white)
![Nx](https://img.shields.io/badge/Nx-22.x-143055?logo=nx&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-2ea44f)

A production-oriented Angular monorepo starter for medium and large applications. It combines Nx project boundaries, standalone Angular architecture, OpenAPI contract generation, i18n, CI quality gates, and semantic-release into one maintainable baseline.

## Why This Exists

Modern Angular applications need more than a generated app shell. This repository provides a scalable structure for teams that want clear ownership, predictable dependency direction, testable feature slices, and automation-ready delivery from day one.

## What Is Included

- Angular 19 standalone-first application setup
- Nx 22 integrated monorepo with cached tasks and affected checks
- Domain/layer library organization with enforced boundaries
- Angular Material application shell baseline
- Jest unit tests and Playwright end-to-end tests
- OpenAPI-driven typed client generation
- Angular i18n workflow with `en-US` source and `fr` example locale
- GitHub Actions CI and semantic-release configuration

## Tech Stack

| Area | Tooling |
| --- | --- |
| Framework | Angular `~19.2.x` |
| Workspace | Nx `22.x` |
| Language | TypeScript `~5.8.x` |
| Styling | SCSS, Angular Material |
| Unit tests | Jest, `jest-preset-angular` |
| E2E tests | Playwright |
| Quality | ESLint, angular-eslint, Prettier |
| Release | semantic-release |

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```sh
npm ci
```

### Run Locally

```sh
npm start
```

Open `http://localhost:4200`.

### Optional E2E Browser Setup

```sh
npx playwright install chromium firefox webkit
```

## Common Commands

| Command | Purpose |
| --- | --- |
| `npm start` | Serve the `web` app in development mode. |
| `npm run build` | Build the production `web` app. |
| `npm run build:fr` | Build the French localized app bundle. |
| `npm run lint` | Run ESLint across workspace projects. |
| `npm test` | Run Jest unit tests across workspace projects. |
| `npm run e2e` | Run the Playwright suite for `web-e2e`. |
| `npm run affected:ci` | Run affected lint, test, and build targets against `origin/main`. |
| `npm run generate:api` | Regenerate OpenAPI client artifacts. |
| `npm run i18n:extract` | Extract Angular translation messages. |
| `npm run release` | Execute semantic-release. |

## Workspace Layout

```text
apps/
  web/                       # Main Angular application
  web-e2e/                   # Playwright E2E project

libs/
  auth/
    data-access-auth/        # Auth state, guard, interceptor
    feature-auth/            # Login feature UI
  dashboard/
    feature-dashboard/       # Protected dashboard feature UI
  platform/
    app-config/              # Environment and app-level configuration
    api-client/              # Hand-authored API adapters
    api-client-generated/    # Generated OpenAPI models and services
  shared/
    contracts/               # Shared DTO and contract types
    ui-shell/                # Shared application shell UI

openapi/
  specs/core-api.yaml        # API contract source of truth

tools/
  openapi/generate.mjs       # API generation script
```

## Architecture Principles

The application is organized around explicit domain and layer boundaries. Application bootstrap and route composition stay in `apps/web`. Feature UI belongs in `feature-*` libraries. API orchestration, guards, interceptors, and session state belong in `data-access-*` or `platform` libraries. Shared contracts and shell UI live under `libs/shared`.

Nx enforces this through tags in `eslint.config.mjs`:

- `scope:*` controls domain ownership, such as `scope:auth`, `scope:dashboard`, `scope:platform`, `scope:shared`, and `scope:web`.
- `type:*` controls layer direction, such as `type:feature`, `type:data-access`, `type:ui`, `type:contracts`, and `type:generated`.

If a boundary rule blocks an import, move the code to the correct layer instead of disabling the lint rule.

See [`docs/architecture.md`](docs/architecture.md) for dependency rules and request-flow details.

## API Contract Workflow

`openapi/specs/core-api.yaml` is the API source of truth. After changing the contract, regenerate the client:

```sh
npm run generate:api
```

Generated code is written under `libs/platform/api-client-generated`. Keep hand-authored mapping and adapter logic in `libs/platform/api-client`.

## Localization Workflow

The source locale is `en-US`; the example translated locale is `fr`.

```sh
npm run i18n:extract
npm run build:fr
```

Translation files live in `apps/web/src/locale`, including `messages.xlf` and `messages.fr.xlf`.

## Quality Gates

Before opening a pull request, run the checks that match your change:

```sh
npm run lint
npm test
npm run build
npm run e2e
```

For pull-request scoped validation, use:

```sh
npm run affected:ci
```

CI runs affected lint, test, and build targets on pull requests and pushes to `main`. The release workflow runs full verification before semantic-release.

## Documentation

- [Architecture Guide](docs/architecture.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Agent Contributor Guide](AGENTS.md)

## Troubleshooting

| Issue | Fix |
| --- | --- |
| Playwright browsers are missing | Run `npx playwright install chromium firefox webkit`. |
| TypeScript diagnostics differ between editor and CLI | Use workspace TypeScript and restart the VS Code TS server. |
| Port `4200` is already in use | Run `npx nx run web:serve -- --port=4300`. |

## License

MIT. See [LICENSE](LICENSE).
