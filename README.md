# Barebones Accounting Foundation

This repository now contains the first implementation foundation for a barebones accounting product. The broader client vision is still a construction ERP, but the codebase is intentionally starting smaller with the accounting core.

## Current Stack

- `frontend/`: static Node-served UI with plain JavaScript
- `backend/`: Express + TypeScript
- future database target: PostgreSQL

## Team Consistency

This repo now includes baseline setup controls so teammates stay aligned:

- `.nvmrc` and `.node-version` pin Node to `22.x`
- `.npmrc` enforces exact dependency installs and engine checks
- `.editorconfig` standardizes whitespace and formatting basics
- `.gitattributes` standardizes line endings across Windows/macOS/Linux
- `backend/.env.example` and `frontend/.env.example` define the shared env shape
- `setup.ps1` and `start.ps1` give the team a one-command setup and launch flow
- `CONTRIBUTING.md` and [Setup-guide.md](C:\Users\dynamic computer\Desktop\work\projects\rayyan project\Setup-guide.md) document the canonical setup flow

## What Has Been Implemented

- workspace structure for frontend and backend
- backend API skeleton
- core accounting types for:
  - accounts
  - transactions
  - journal entry lines
- seeded in-memory accounting data
- foundation endpoints:
  - `GET /api/health`
  - `GET /api/accounts`
  - `GET /api/transactions`
  - `GET /api/dashboard`
- frontend shell that reads from the API and renders:
  - dashboard summary
  - chart of accounts foundation
  - recent transactions

## Why The Foundation Looks Like This

The first implementation slice is meant to prove the architecture and the accounting model before adding business workflows like vendors, customers, invoices, payments, and receipts.

The current backend is intentionally small:

- no database yet
- no authentication yet
- no mutations yet
- no invoice modules yet

That keeps the project easy to extend in the next phase.

## Next Recommended Steps

1. add persistent database setup
2. implement vendors and customers
3. implement vendor and customer invoices
4. implement payments and receipts
5. connect those actions to transaction and journal entry posting

## Docs

- [Install guide](C:\Users\dynamic computer\Desktop\work\projects\rayyan project\Setup-guide.md)
- [Project understanding](C:\Users\dynamic computer\Desktop\work\projects\rayyan project\docs\Project-understanding\what-we-understand.md)
- [Barebones accounting proposal](C:\Users\dynamic computer\Desktop\work\projects\rayyan project\docs\proposal-docs\06-barebones-accounting-proposal.md)
- [Barebones MVP requirements](C:\Users\dynamic computer\Desktop\work\projects\rayyan project\docs\proposal-docs\07-barebones-mvp-requirements.md)
- [Barebones visual diagram](C:\Users\dynamic computer\Desktop\work\projects\rayyan project\docs\proposal-docs\08-barebones-visual-diagram.md)
- [Development setup](C:\Users\dynamic computer\Desktop\work\projects\rayyan project\docs\development-setup.md)
