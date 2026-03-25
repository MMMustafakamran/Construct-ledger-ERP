# LLM Project Context

## Goal

Build a barebones accounting prototype for a construction client.
The product should replace spreadsheet/manual-ledger work with a simple web app for:

- chart of accounts
- vendors and customers
- vendor invoices
- customer invoices
- payments and receipts
- cash/bank balance
- basic dashboard
- optional `Job Order #` and `Equipment #` reference fields on invoices and payments

Prototype also includes lightweight stub/mock screens for:

- journal entries view (read-only, auto-generated)
- AP and AR summary cards
- stub Job Orders page
- stub Equipment Register page
- reports placeholder screen

This is not the full ERP yet. It is the accounting foundation that proves the core workflow and signals the construction context.

## Current Direction

- Frontend: Vite + React + TypeScript
- Backend: Express + TypeScript
- Future DB target: PostgreSQL
- Stack choice is pragmatic, but the product goal remains accounting-first
- Node 22.x is the intended team runtime

## What Exists Now

- Root workspace setup
- Shared setup/start scripts
- Frontend app shell wired to backend APIs
- Backend API skeleton with seed data
- Core accounting entities in memory:
  - accounts
  - transactions
  - journal entry lines

## Important Files

- `README.md` - top-level project summary
- `Setup-guide.md` - install/run steps
- `docs/development-setup.md` - team consistency rules
- `docs/proposal-docs/prototype-scope.md` - **canonical prototype scope (three-tier: must build / nice to mock / not yet)**
- `docs/proposal-docs/06-barebones-accounting-proposal.md` - client proposal
- `docs/proposal-docs/07-barebones-mvp-requirements.md` - MVP requirements
- `docs/proposal-docs/08-barebones-visual-diagram.md` - ERD/flow diagrams
- `docs/proposal-docs/09-barebones-prototype-plan.md` - prototype screens and demo story
- `frontend/src/App.tsx` - current UI shell
- `backend/src/app.ts` - API wiring
- `backend/src/services/accounting.service.ts` - dashboard/account logic

## How The Prototype Should Work

**Must build (real logic):**
1. Create vendor → create vendor invoice (tag with optional Job Order # / Equipment #) → record payment → see payable and cash/bank update.
2. Create customer → create customer invoice (tag with optional Job Order # / Equipment #) → record receipt → see receivable and cash/bank update.
3. Dashboard reflects current cash, receivables, and payables at all times.
4. Every invoice and payment action auto-posts a journal entry.

**Nice to mock (visual only):**
5. Read-only journal entries view shows auto-generated accounting entries.
6. Stub Job Orders page and stub Equipment Register page show the planned expansion.
7. Reports placeholder screen lists Trial Balance and P&L as coming next.

## Design Rules

- Keep the UI simple and readable for non-technical users.
- Keep money values as decimals, never floats.
- Prefer server-side accounting logic.
- Do not add ERP modules before the accounting core is stable.
- Keep the first version small enough to demo quickly.

## Next Build Steps

1. persistent database setup
2. CRUD for accounts, vendors, customers
3. vendor/customer invoices with optional `Job Order #` and `Equipment #` fields
4. payments/receipts with invoice settlement
5. journal posting + dashboard totals
6. read-only journal entries view
7. stub pages: Job Orders, Equipment Register, Reports placeholder

## Navigation Tip

If unsure where to look first, read in this order:

1. `README.md`
2. `docs/proposal-docs/07-barebones-mvp-requirements.md`
3. `frontend/src/App.tsx`
4. `backend/src/services/accounting.service.ts`

