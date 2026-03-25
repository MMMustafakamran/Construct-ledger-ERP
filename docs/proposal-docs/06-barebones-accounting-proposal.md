# Barebones Accounting Software Proposal

## What This Means

A barebones accounting software is the smallest useful version of the product that solves the main financial tracking problem without trying to build a full ERP.

For this client, that means:

- centralize accounting records now kept in Excel and ledgers
- keep the system simple for non-technical users
- support daily money-in and money-out workflows
- provide a basic view of what is owed, what is receivable, and current cash position

## Recommended Barebones Scope

The first version should only include these modules:

1. Chart of Accounts
2. Vendors
3. Customers
4. Purchase / Vendor Invoices
5. Sales / Customer Invoices
6. Payments and Receipts
7. Cash and Bank
8. Basic Dashboard

## Optional Construction-Specific Addition

If the client wants construction-specific context without turning this into a full ERP, add only:

- optional `Job Order #` reference field on invoices and payments
- optional `Equipment #` reference field on invoices and payments

These two fields let the client tag every transaction to a job or piece of equipment. This signals construction-readiness without introducing full job costing or fixed asset complexity.

## Nice To Mock In The Prototype

The prototype can include lightweight placeholder screens that show future direction without building full logic:

- a read-only journal entries view (auto-generated from invoice/payment actions)
- AP and AR summary cards
- a stub Job Orders page with sample fields
- a stub Equipment Register page with sample fields
- a reports placeholder screen listing Trial Balance and P&L as "coming next"

These help the client see the full vision without committing to ERP complexity in version one.

## What Is Not Included

These should stay out of the barebones version:

- payroll
- inventory
- parts and spares
- fixed asset depreciation engine
- equipment profitability
- purchase order workflow
- approvals
- bank reconciliation automation
- mobile app
- advanced reports beyond the basics

## Main User Problem Solved

The barebones system should answer these questions:

- how much cash do we have
- who do we need to pay
- who owes us money
- what invoices are pending
- what payments and receipts have been recorded

## Why This Is Better As A First Step

- faster to build
- easier for client to understand
- lower delivery risk
- easier to test with real data
- creates a clean foundation for later ERP expansion

## Suggested Positioning To Client

Present it like this:

"We recommend starting with a lightweight accounting core first. Once daily accounting is stable and the client is comfortable using it, we can expand into job costing, equipment, payroll, and other ERP modules in later phases."
