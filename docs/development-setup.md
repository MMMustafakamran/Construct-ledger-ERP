# Development Setup

This is the team reference for keeping the project consistent.

## Standard Versions

- Node.js: `22.x`
- npm: `11.x`

Use the version files in the repo root:

- `.nvmrc`
- `.node-version`

## First-Time Setup

1. Install Node.js 22.x.
2. Create the env files:
   - `backend/.env.example` -> `backend/.env`
   - `frontend/.env.example` -> `frontend/.env`
3. Run `npm install` from the repository root.
4. Run `npm run setup` if you want the guided setup flow.

## Daily Start

- Run `npm start` from the repository root.

## Team Rules

- Install dependencies from the repo root, not inside workspaces.
- Commit lockfile changes when dependencies change.
- Do not use floating Node versions locally.
- Do not commit local `.env` files.
- Keep money values as decimals in the backend model and never use floats for accounting calculations.

