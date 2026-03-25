# Contributing

## Tooling

- Node.js `22.x`
- npm `11.x`
- install from the repository root

## Workflow

1. Pull latest changes.
2. Ensure your Node version matches `.nvmrc`.
3. Run `npm.cmd install` from the root.
4. Copy the example env files if needed.
5. Run the app with:
   - `npm.cmd run dev:backend`
   - `npm.cmd run dev:frontend`

## Consistency Rules

- Use the root workspace setup only.
- Keep dependency versions exact.
- Commit lockfile updates with dependency changes.
- Follow `.editorconfig` and `.gitattributes`.
- Do not change line endings manually.
- Do not commit secrets or local env files.

