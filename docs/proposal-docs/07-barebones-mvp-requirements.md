# Barebones Accounting MVP Requirements

## 1. Product Goal

Build a simple web-based accounting system that replaces spreadsheet-led bookkeeping with one central place to manage:

- accounts
- invoices
- payments
- receipts
- cash and bank balances

## 2. MVP Modules

### A. Chart of Accounts

- create account categories
- create ledger accounts
- organize accounts under assets, liabilities, equity, revenue, expenses

### B. Vendors

- create vendor records
- store contact details
- view vendor balance summary

### C. Customers

- create customer records
- store contact details
- view customer balance summary

### D. Vendor Invoices

- create purchase/vendor invoices
- record invoice date, amount, reference, vendor
- assign expense account
- track paid vs unpaid status

### E. Customer Invoices

- create sales/customer invoices
- record invoice date, amount, reference, customer
- assign revenue account
- track paid vs unpaid status

### F. Payments and Receipts

- record vendor payments
- record customer receipts
- link transactions to bank/cash account
- mark related invoices as partially or fully settled

### G. Cash and Bank

- create bank/cash accounts
- show current balance
- show inflows and outflows

### H. Dashboard

- total receivables
- total payables
- cash/bank summary
- recent transactions
- overdue invoices

## 3. Nice-To-Have But Not Required

- optional job reference field
- PDF invoice print layout
- simple filters and search
- export to Excel

## 4. Out Of Scope

- payroll
- inventory
- fixed assets
- depreciation
- equipment tracking
- job costing engine
- tax engine
- advanced approval flows
- reconciliation workflows

## 5. Success Criteria

The barebones MVP succeeds if the client can:

- create accounts, vendors, and customers
- record purchase and sales invoices
- record payments and receipts
- see what is due and payable
- see current cash position
- stop depending on manual ledgers for basic accounting tracking

## 6. Recommended Core Workflow

1. create vendor or customer
2. create invoice
3. record payment or receipt
4. update cash/bank balance
5. reflect impact on dashboard and ledger summary
