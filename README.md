# Barebones Accounting Prototype

This repository contains a working barebones accounting prototype for a construction client. The broader vision is still a construction ERP, but the implemented product focuses on the accounting core first so the client can review a real workflow instead of a mock-only concept.

## Current Stack

- `frontend/`: Vite + React + TypeScript + React Router
- `backend/`: Express + TypeScript
- ORM / persistence: Prisma
- dev database: SQLite
- testing: Vitest on frontend and backend
- team runtime target: Node `22.x`

## What Is Implemented

- routed frontend app with layout, sidebar navigation, and individual pages
- account, vendor, customer, invoice, payment, receipt, bank, and journal entry screens
- stub pages for job orders, equipment, and reports
- backend API with Prisma-backed models and service layer
- dashboard summary for receivables, payables, cash balance, and recent transactions
- optional `Job Order #` and `Equipment #` reference fields on invoices and settlement records
- setup/start scripts and team consistency docs
- test coverage for the main frontend and backend flows

## Core User Flows

The prototype is built around these flows:

1. Create vendors and customers.
2. Create vendor invoices and customer invoices.
3. Record payments and receipts against invoices.
4. Update cash, payables, receivables, and journal entries.
5. Review the current accounting picture from the dashboard and detail pages.

## Team Consistency

This repo includes the setup controls needed to keep the team aligned:

- `.nvmrc` and `.node-version` pin Node to `22.x`
- `.npmrc` enforces exact dependency installs and engine checks
- `.editorconfig` standardizes whitespace and formatting basics
- `.gitattributes` standardizes line endings across Windows/macOS/Linux
- `backend/.env.example` and `frontend/.env.example` define the shared env shape
- `setup.ps1`, `start.ps1`, and `start.bat` provide a repeatable setup/start flow
- `CONTRIBUTING.md` and [Setup-guide.md](./Setup-guide.md) document the canonical onboarding flow

## Current Status

The prototype implementation is complete enough to demo and extend.

What is already done:

- frontend routing and page structure
- backend API and Prisma persistence
- core accounting entities and flows
- tests and seed data
- setup/start scripts and setup documentation

What comes next:

- hardening and bug fixes
- PostgreSQL migration if the client wants it
- job orders and equipment modules
- reporting and analytics
- auth/roles/approvals if the scope expands

## Docs

- [LLM context](./LLM_CONTEXT.md)
- [Install guide](./Setup-guide.md)
- [Development setup](./docs/development-setup.md)
- [Project understanding](./docs/Project-understanding/what-we-understand.md)
- [Barebones accounting proposal](./docs/proposal-docs/06-barebones-accounting-proposal.md)
- [Barebones MVP requirements](./docs/proposal-docs/07-barebones-mvp-requirements.md)
- [Barebones visual diagram](./docs/proposal-docs/08-barebones-visual-diagram.md)
