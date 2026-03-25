import { Router } from "express";
import { accountingService } from "../services/accounting.service.js";
import { getVendors, getVendor, createVendor, updateVendor } from "../services/vendor.service.js";
import { getCustomers, getCustomer, createCustomer, updateCustomer } from "../services/customer.service.js";
import { getVendorInvoices, getVendorInvoice, createVendorInvoice } from "../services/vendorInvoice.service.js";
import { getCustomerInvoices, getCustomerInvoice, createCustomerInvoice } from "../services/customerInvoice.service.js";
import { getPayments, createPayment } from "../services/payment.service.js";
import { getReceipts, createReceipt } from "../services/receipt.service.js";
import { getJournalEntries } from "../services/journalEntry.service.js";
import { getBankAccounts, getBankAccount } from "../services/bankAccount.service.js";

const accountingRouter = Router();

// Dashboard & Accounts (ReadOnly)
accountingRouter.get("/dashboard", async (req, res, next) => {
  try {
    const data = await accountingService.getDashboardSummary();
    res.json(data);
  } catch (err) { next(err); }
});

accountingRouter.get("/accounts", async (req, res, next) => {
  try {
    const data = await accountingService.listAccounts();
    res.json(data);
  } catch (err) { next(err); }
});

accountingRouter.get("/journal-entries", async (req, res, next) => {
  try {
    const data = await getJournalEntries();
    res.json(data);
  } catch (err) { next(err); }
});

// Bank Accounts
accountingRouter.get("/bank-accounts", async (req, res, next) => {
  try {
    const data = await getBankAccounts();
    res.json(data);
  } catch (err) { next(err); }
});

accountingRouter.get("/bank-accounts/:id", async (req, res, next) => {
  try {
    const data = await getBankAccount(req.params.id);
    res.json(data);
  } catch (err) { next(err); }
});

// Vendors
accountingRouter.get("/vendors", async (req, res, next) => {
  try { res.json(await getVendors()); } catch (err) { next(err); }
});

accountingRouter.get("/vendors/:id", async (req, res, next) => {
  try { res.json(await getVendor(req.params.id)); } catch (err) { next(err); }
});

accountingRouter.post("/vendors", async (req, res, next) => {
  try { res.status(201).json(await createVendor(req.body)); } catch (err) { next(err); }
});

accountingRouter.put("/vendors/:id", async (req, res, next) => {
  try { res.json(await updateVendor(req.params.id, req.body)); } catch (err) { next(err); }
});

// Customers
accountingRouter.get("/customers", async (req, res, next) => {
  try { res.json(await getCustomers()); } catch (err) { next(err); }
});

accountingRouter.get("/customers/:id", async (req, res, next) => {
  try { res.json(await getCustomer(req.params.id)); } catch (err) { next(err); }
});

accountingRouter.post("/customers", async (req, res, next) => {
  try { res.status(201).json(await createCustomer(req.body)); } catch (err) { next(err); }
});

accountingRouter.put("/customers/:id", async (req, res, next) => {
  try { res.json(await updateCustomer(req.params.id, req.body)); } catch (err) { next(err); }
});

// Vendor Invoices
accountingRouter.get("/vendor-invoices", async (req, res, next) => {
  try { res.json(await getVendorInvoices()); } catch (err) { next(err); }
});

accountingRouter.get("/vendor-invoices/:id", async (req, res, next) => {
  try { res.json(await getVendorInvoice(req.params.id)); } catch (err) { next(err); }
});

accountingRouter.post("/vendor-invoices", async (req, res, next) => {
  try { res.status(201).json(await createVendorInvoice(req.body)); } catch (err) { next(err); }
});

// Customer Invoices
accountingRouter.get("/customer-invoices", async (req, res, next) => {
  try { res.json(await getCustomerInvoices()); } catch (err) { next(err); }
});

accountingRouter.get("/customer-invoices/:id", async (req, res, next) => {
  try { res.json(await getCustomerInvoice(req.params.id)); } catch (err) { next(err); }
});

accountingRouter.post("/customer-invoices", async (req, res, next) => {
  try { res.status(201).json(await createCustomerInvoice(req.body)); } catch (err) { next(err); }
});

// Payments
accountingRouter.get("/payments", async (req, res, next) => {
  try { res.json(await getPayments()); } catch (err) { next(err); }
});

accountingRouter.post("/payments", async (req, res, next) => {
  try { res.status(201).json(await createPayment(req.body)); } catch (err) { next(err); }
});

// Receipts
accountingRouter.get("/receipts", async (req, res, next) => {
  try { res.json(await getReceipts()); } catch (err) { next(err); }
});

accountingRouter.post("/receipts", async (req, res, next) => {
  try { res.status(201).json(await createReceipt(req.body)); } catch (err) { next(err); }
});

export { accountingRouter };
