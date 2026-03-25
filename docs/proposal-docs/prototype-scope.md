## Prototype Scope

### 1. Must Show In Prototype
These are the pieces I think you should actually build so the client can see a believable working foundation:

- `Dashboard`: cash balance, receivables, payables, recent transactions
- `Chart of Accounts`: core account groups and sample ledger accounts
- `Vendors` and `Customers`: create/list basic records
- `Vendor Invoices` and `Customer Invoices`: create and view status
- `Payments` and `Receipts`: record settlements against invoices
- `Cash / Bank`: at least one bank or cash account with running balance
- `Automatic posting logic`: invoice/payment actions should affect balances and statuses correctly
- `Job Order #` and `Equipment #` as optional reference fields

This matches your proposal’s accounting core while still nodding to the construction context the client described in `docs/Project-understanding/what-we-understand.md` and `docs/Project-understanding/client-givendocs/image-totext.md`.

### 2. Nice To Fake Or Mock
These are useful to visually include, but you do not need real full logic yet:

- `Vendor ledger` and `Customer ledger` pages with transaction history
- a simple `journal entries` view, even if generated automatically only
- `AP` and `AR` summary cards or tables
- a placeholder `reports` screen with Trial Balance / P&L listed as “coming next”
- basic `search / filter`
- a stub `Job Orders` page showing how accounting entries can later link into jobs
- a stub `Equipment Register` page with sample fields only

These help the client see the future direction without you committing to full ERP complexity now.

### 3. Do Not Build Yet
These should stay out of the prototype unless the client explicitly asks for them right now:

- full `fixed assets` module
- `depreciation` engine
- `parts & spares inventory`
- full `purchase order` workflow
- `payroll`
- full `job costing`
- equipment profitability reports
- bank reconciliation
- approvals / permissions complexity
- exports, PDF generation, tax engine

Those items are clearly part of the broader vision, but they are not necessary to prove that you understand the project and can deliver.

## Best Prototype Story
Your demo should tell one clean story:

1. Create a vendor.
2. Enter a vendor invoice.
3. Pay part or all of it from bank.
4. See payable reduce and cash update.
5. Create a customer invoice.
6. Record receipt.
7. See receivable reduce and cash update.
8. Show optional `Job Order #` / `Equipment #` attached to prove construction-readiness.

That is enough to demonstrate:
- you understand accounting flow
- you can structure the data correctly
- the system can later expand into the client’s full construction ERP needs

## Recommendation
If this is a prototype, I’d position it as:

- `Built now`: accounting foundation
- `Shown lightly`: construction hooks
- `Planned next`: job costing, assets, inventory, payroll

That is the safest and smartest scope.

If you want, I can next turn this into a very practical **prototype feature checklist** you can follow while building.