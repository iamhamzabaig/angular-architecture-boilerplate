# Contributing

Thank you for contributing. This project is designed for medium/large Angular codebases, so consistency and boundary discipline are required for all changes.

## Prerequisites

- Node.js 20+
- npm 10+
- Workspace TypeScript (configured in `.vscode/settings.json`)

## Local Setup

```sh
npm ci
npx playwright install chromium firefox webkit
```

## Branch and Commit Conventions

### Branch Names

Use descriptive branches, for example:

- `feat/auth-refresh-flow`
- `fix/dashboard-guard-redirect`
- `chore/update-openapi-spec`

### Commit Messages

Use Conventional Commits:

- `feat: add session timeout warning`
- `fix: handle auth token parse failure`
- `docs: update architecture guide`
- `chore: regenerate api contracts`

Semantic-release relies on commit message format to determine versioning and release notes.

## Development Workflow

1. Create or update code in the appropriate domain/layer library.
2. Keep feature components focused on UI composition.
3. Keep orchestration and API interaction in `data-access`/`platform` libraries.
4. Reuse shared contracts and shell components where applicable.
5. Update docs when architectural behavior changes.

## Boundary Rules (Required)

Do not bypass Nx boundary constraints.

- Domain ownership is enforced via `scope:*` tags.
- Layer direction is enforced via `type:*` tags.
- If a rule blocks an import, adjust architecture rather than disabling lint.

## Quality Checks Before PR

Run all required checks locally:

```sh
npm run lint
npm run test
npm run build
npm run e2e
```

For PR-focused validation:

```sh
npm run affected:ci
```

## API Contract Changes

If you modify API shapes:

1. Update `openapi/specs/core-api.yaml`.
2. Regenerate artifacts:

```sh
npm run generate:api
```

3. Ensure adapter code in `libs/platform/api-client` still compiles and maps correctly.

## Localization Changes

If you add or edit user-facing strings:

```sh
npm run i18n:extract
```

Then update locale files (for example `apps/web/src/locale/messages.fr.xlf`) as needed.

## Pull Request Guidelines

Include in PR description:

- What changed
- Why it changed
- Affected apps/libs
- How it was tested
- Any migration or operational impact

Keep PRs focused and bounded to one coherent concern when possible.

## Security and Secrets

- Do not commit secrets, tokens, or private keys.
- Use environment-driven configuration for deploy targets.
- Keep sample/mock values in committed files non-sensitive.
