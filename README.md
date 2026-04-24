# Angular Enterprise Boilerplate

Nx monorepo starter for medium to large Angular projects.

## Stack

- Angular 19.x with standalone APIs
- Nx integrated workspace
- Jest + Testing Library + Playwright
- Angular Material + theme tokens
- OpenAPI contract pipeline (`openapi-typescript-codegen`)
- Signals + RxJS hybrid state
- GitHub Actions + semantic-release

## Architecture

- `apps/web`: reference app (CSR-first, SSR-ready path)
- `libs/auth/*`: auth feature and data access
- `libs/dashboard/*`: dashboard feature
- `libs/platform/*`: app environment + API adapters + generated contracts
- `libs/shared/*`: shared UI shell and DTO contracts

Module boundaries are enforced with `@nx/enforce-module-boundaries` tags (`scope:*`, `type:*`) in root ESLint config.

## Commands

```sh
npm start
npm run lint
npm run test
npm run build
npm run e2e
```

### OpenAPI generation

```sh
npm run generate:api
```

Input spec: `openapi/specs/core-api.yaml`  
Generated output: `libs/platform/api-client-generated/src/lib/generated`

### i18n

```sh
npm run i18n:extract
npm run build:fr
```

Source locale is `en-US` and French translations are stored in `apps/web/src/locale/messages.fr.xlf`.

## CI and Release

- CI workflow: `.github/workflows/ci.yml` (affected lint/test/build)
- Release workflow: `.github/workflows/release.yml`
- semantic-release config: `.releaserc.json`
