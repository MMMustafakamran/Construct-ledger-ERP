# Construction Accounting Prototype

This repository documents a prototype for a construction company that currently manages accounting operations through spreadsheets and manual ledgers.

The client's broader vision points toward a construction ERP, but the immediate goal is smaller: build a believable, barebones accounting prototype that proves the core workflow can move into software.

## What The Client Wants

The source notes suggest a business that needs one system to eventually manage:

- chart of accounts and general ledger
- vendors and customers
- accounts payable and accounts receivable
- cash and bank tracking
- fixed assets and equipment
- parts and spares
- payroll
- job order costing

For now, the prototype should focus on the accounting foundation first, not the full ERP scope.

## Current Prototype Direction

The recommended prototype is a simple accounting MVP that covers:

- chart of accounts
- vendors
- customers
- vendor invoices
- customer invoices
- payments and receipts
- cash and bank balances
- dashboard summaries

This gives the client something easy to review and approve while keeping development effort focused on the most important workflows.

## Problem Being Solved

Today, the client's records appear to be spread across Excel files, paper books, and disconnected tracking methods. That makes it difficult to:

- see what is owed to vendors
- see what customers still owe
- track cash position clearly
- connect invoices with payments
- understand business performance quickly

The prototype should show how those activities can live in one place with cleaner data entry and clearer visibility.

## Long-Term Product Vision

Once the accounting base is approved, the system can expand toward the client's broader construction ERP vision, including:

- equipment and fixed asset registers
- depreciation tracking
- parts and spares linked to equipment
- payroll with cost allocation
- job order costing
- equipment-level and job-level profitability

## Recommended Prototype Workflow

1. Create chart of accounts entries.
2. Create vendor and customer records.
3. Enter vendor and customer invoices.
4. Record payments and receipts through cash or bank.
5. Show payable, receivable, and cash balance changes on a dashboard.

## Repository Guide

- [Project understanding](docs/Project-understanding/what-we-understand.md)
- [Client extracted notes](docs/Project-understanding/client-givendocs/image-totext.md)
- [Barebones accounting proposal](docs/proposal-docs/06-barebones-accounting-proposal.md)
- [Barebones MVP requirements](docs/proposal-docs/07-barebones-mvp-requirements.md)
- [Prototype plan](docs/proposal-docs/09-barebones-prototype-plan.md)

## Summary

This project should currently be understood as:

- client vision: construction ERP/accounting platform
- immediate deliverable: barebones accounting prototype
- purpose of the prototype: validate core accounting workflows before investing in deeper ERP modules
