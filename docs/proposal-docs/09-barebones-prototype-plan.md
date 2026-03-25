# Barebones Accounting Prototype Plan

## Goal

Create the simplest believable accounting prototype the client can approve quickly.

## Prototype Screens

### Must Build (Real Logic)

1. dashboard — cash balance, receivables, payables, recent transactions
2. chart of accounts — account groups and sample ledger accounts
3. vendors and customers — create and list records
4. vendor invoice form/list
5. customer invoice form/list
6. payments and receipts — settle against invoices
7. cash and bank summary — running balance per account

All invoice and payment forms must include optional `Job Order #` and `Equipment #` reference fields.

### Nice To Mock (Visual Only, No Full Logic)

8. journal entries view — read-only, auto-generated from invoice/payment actions
9. AP and AR summary cards
10. stub Job Orders page — shows future direction, sample fields only
11. stub Equipment Register page — sample fields only
12. reports placeholder screen — lists Trial Balance and P&L as "coming next"

## Demo Story

1. create a vendor
2. enter a vendor invoice — tag with an optional Job Order # or Equipment #
3. record a payment from bank
4. see payable reduce and cash/bank balance update
5. create a customer invoice — tag with an optional Job Order # or Equipment #
6. record receipt from customer
7. see receivable reduce and cash/bank balance update
8. show dashboard summary (cash, receivables, payables)
9. briefly show the journal entries view so the client sees proper accounting entries were created
10. point to stub Job Orders and Equipment Register pages to show the planned expansion path

This story demonstrates:
- you understand accounting flow
- the system is construction-aware via Job Order # and Equipment # tagging
- the platform can expand into the full ERP the client envisions

## Recommended Build Order

1. accounts (chart of accounts)
2. vendors and customers
3. vendor and customer invoices (with Job Order # and Equipment # fields)
4. payments and receipts
5. cash/bank summary with running balance
6. dashboard totals
7. journal entries view (read-only, auto-generated)
8. stub pages: Job Orders, Equipment Register, Reports placeholder

## Time-Saving Rule

Do not build advanced accounting features in version 1.

Only build what is needed to prove:

- invoice entry
- payment tracking
- cash visibility
- receivables and payables summary

## Expansion Path Later

After this prototype is approved, the next phase can build on the stubs:

- full Job Order Costing module (costs, budget vs. actual, profit per job)
- full Fixed Assets / Equipment Register with depreciation engine
- Parts and Spares Inventory linked to equipment
- Payroll with assignment to equipment or job order
- Purchase Order workflow
- Detailed reports: Trial Balance, Balance Sheet, P&L
- Bank reconciliation
- PDF invoice printing and export
