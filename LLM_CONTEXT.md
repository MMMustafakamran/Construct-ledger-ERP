# LLM Project Context

## Goal

Build and maintain a barebones accounting prototype for a construction client.
The product replaces spreadsheet/manual-ledger work with a web app for:

- chart of accounts
- vendors and customers
- vendor invoices
- customer invoices
- payments and receipts
- bank accounts
- journal entries
- dashboard summaries

The prototype also keeps the construction context visible through optional `Job Order #` and `Equipment #` reference fields on invoices and settlement records.

This prototype is now implemented. The remaining work is expansion, hardening, or migration, not basic proof of concept.

## Current Stack

- Frontend: Vite + React + TypeScript + React Router
- Backend: Express + TypeScript
- ORM / DB layer: Prisma
- Dev database: SQLite
- Testing: Vitest on both frontend and backend
- Team runtime target: Node 22.x

## What Exists Now

### Frontend

- Routed app shell using `frontend/src/main.tsx` and `frontend/src/router.tsx`
- Layout/sidebar navigation
- Pages for:
  - Dashboard
  - Accounts
  - Vendors
  - Vendor create/edit form
  - Customers
  - Customer create/edit form
  - Vendor invoices
  - Vendor invoice create form
  - Customer invoices
  - Customer invoice create form
  - Payments
  - Receipts (Premium dashboard layout with animated slide-out drawer)
  - Bank accounts
  - Journal entries
  - Stub pages for Job Orders, Equipment, and Reports
- Shared UI components in `frontend/src/components` (including robust primitives like `Drawer`, `StatCard`, etc.)
- Custom CSS design system implementing a premium SaaS aesthetic
- Comprehensive Vitest + RTL component test coverage (82%+ statement coverage)
Note:
- `frontend/src/App.tsx` is currently a stub and is not the real entry point.
- The real app entry is `frontend/src/main.tsx` -> `frontend/src/router.tsx`.

### Backend

- Express API with centralized error handling
- Prisma schema and seeded database
- Core services for:
  - accounts
  - vendors
  - customers
  - bank accounts
  - vendor invoices
  - customer invoices
  - payments
  - receipts
  - journal entries
  - dashboard/accounting summary
- REST routes wired under `/api`
- Comprehensive Vitest + Supertest integration coverage (100% Route & Service coverage)

## Data Model

The Prisma schema currently includes:

- Account
- Vendor
- Customer
- BankAccount
- VendorInvoice
- CustomerInvoice
- Payment
- Receipt
- JournalEntry
- JournalEntryLine

Important modeling details:

- invoice records support optional `jobReference` and `equipmentReference`
- invoices track paid/received amounts and statuses
- journal entries are generated as the accounting audit trail
- balances are derived from journal lines and invoice settlement state

## Core User Flows

The prototype should behave like this:

1. Create or edit chart of accounts entries.
2. Create vendors and customers.
3. Create vendor invoices or customer invoices.
4. Record payments or receipts against invoices.
5. Update cash/bank, payable, receivable, and journal entry records.
6. Show the current accounting picture on the dashboard and detail pages.

## Important Files

- `README.md` - top-level project summary
- `Setup-guide.md` - install/run steps
- `docs/development-setup.md` - team consistency rules
- `docs/proposal-docs/prototype-scope.md` - canonical prototype scope
- `docs/proposal-docs/06-barebones-accounting-proposal.md` - client proposal
- `docs/proposal-docs/07-barebones-mvp-requirements.md` - MVP requirements
- `docs/proposal-docs/08-barebones-visual-diagram.md` - ERD and flow diagrams
- `docs/proposal-docs/09-barebones-prototype-plan.md` - prototype screens and demo story
- `frontend/src/main.tsx` - actual frontend mount point
- `frontend/src/router.tsx` - routing map for all screens
- `frontend/src/pages/*` - individual screens and forms
- `frontend/src/components/*` - layout and UI primitives
- `backend/src/app.ts` - API wiring and middleware
- `backend/src/routes/accounting.routes.ts` - REST endpoints
- `backend/src/services/*` - business logic
- `backend/prisma/schema.prisma` - database schema
- `backend/prisma/seed.ts` - seed data

## How The Prototype Works

### Must-have logic

1. Create vendor -> create vendor invoice -> record payment -> see payable and cash/bank update.
2. Create customer -> create customer invoice -> record receipt -> see receivable and cash/bank update.
3. Dashboard reflects current cash, receivables, and payables.
4. Journal entries are the accounting trail for transactions.

### Nice-to-have / stubbed expansion screens

5. Job Orders page is a stub placeholder.
6. Equipment page is a stub placeholder.
7. Reports page is a stub placeholder for Trial Balance, P&L, and Balance Sheet later.

## Design Rules

- Keep the UI simple and readable for non-technical users.
- Keep money values as decimals in business logic where possible.
- Prefer server-side accounting logic and persistence over frontend-only state.
- Do not add ERP modules before the accounting core is stable.
- Keep the first version small enough to demo quickly.

## Current Status

The prototype implementation is complete enough to demo and extend.

What is already done:

- frontend routing and pages
- backend API and Prisma persistence
- core accounting entities and flows
- tests and project setup
- setup/start scripts and team docs

What comes next:

- hardening and bug fixes
- potential migration from SQLite to PostgreSQL
- expansion into job orders, equipment, payroll, inventory, and reporting if the client approves

## Next Build Direction

If continuing from this point, the most likely next steps are:

1. replace SQLite dev DB with PostgreSQL if needed
2. expand job orders into a real module
3. add equipment and fixed asset tracking
4. add reports
5. add approvals/authentication/roles if the client requests them

## Navigation Tip

If unsure where to look first, read in this order:

1. `README.md`
2. `docs/proposal-docs/prototype-scope.md`
3. `frontend/src/main.tsx`
4. `frontend/src/router.tsx`
5. `backend/prisma/schema.prisma`
6. `backend/src/routes/accounting.routes.ts`
7. `backend/src/services/accounting.service.ts`

