# Development Setup

This project uses one shared Node.js toolchain across the team.

## Standard Versions

- Node.js: `22.x`
- npm: `11.x`

Use the version files in the repo root:

- `.nvmrc`
- `.node-version`

## First-Time Setup

1. Install Node.js 22.x.
2. Copy env files:
   - `backend/.env.example` -> `backend/.env`
   - `frontend/.env.example` -> `frontend/.env`
3. Run `npm.cmd install` from the repository root.
4. Start the backend with `npm.cmd run dev:backend`
5. Start the frontend with `npm.cmd run dev:frontend`

## Team Rules

- Install dependencies from the repo root, not separately inside workspaces.
- Commit lockfile changes when dependencies change.
- Do not use floating Node versions locally.
- Do not commit local `.env` files.
- Keep money values as decimals in the backend model and never use floats for accounting calculations.

## Recommended Next Additions

- add a root lockfile after first dependency install
- add ESLint and Prettier with shared config
- add CI to verify Node version, install, build, and test steps

