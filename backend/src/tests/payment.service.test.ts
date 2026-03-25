import { describe, it, expect, beforeAll } from "vitest";
import { createPayment } from "../services/payment.service.js";
import { createVendorInvoice } from "../services/vendorInvoice.service.js";
import { prisma } from "../core/prisma.js";

describe("Payment Service", () => {
  let vendorId: string;
  let expenseAccountId: string;
  let bankAccountId: string;
  let invoiceId: string;
  let initialBankBalance: number;

  beforeAll(async () => {
    const vendor = await prisma.vendor.findFirst();
    const account = await prisma.account.findFirst({ where: { type: "expense" } });
    const bank = await prisma.bankAccount.findFirst();
    
    if (!vendor || !account || !bank) throw new Error("Seed data missing for tests");
    
    vendorId = vendor.id;
    expenseAccountId = account.id;
    bankAccountId = bank.id;
    initialBankBalance = bank.currentBalance;

    // Create an invoice specifically to pay
    const invoice = await createVendorInvoice({
      vendorId,
      expenseAccountId,
      invoiceNumber: `PAY-TEST-${Date.now()}`,
      invoiceDate: new Date().toISOString(),
      totalAmount: 1000,
    });
    invoiceId = invoice.id;
  });

  it("should record a partial payment and update invoice status", async () => {
    const payment = await createPayment({
      vendorInvoiceId: invoiceId,
      bankAccountId,
      paymentDate: new Date().toISOString(),
      amount: 400,
      reference: "Partial Payment",
    });

    expect(payment.id).toBeDefined();

    // Verify invoice
    const updatedInvoice = await prisma.vendorInvoice.findUnique({ where: { id: invoiceId } });
    expect(updatedInvoice?.paidAmount).toBe(400);
    expect(updatedInvoice?.status).toBe("partial");

    // Verify bank account was decremented
    const updatedBank = await prisma.bankAccount.findUnique({ where: { id: bankAccountId } });
    expect(updatedBank?.currentBalance).toBe(initialBankBalance - 400);
    
    // Update initial state for next test
    initialBankBalance = updatedBank!.currentBalance;
  });

  it("should record full payment and mark invoice as paid", async () => {
    await createPayment({
      vendorInvoiceId: invoiceId,
      bankAccountId,
      paymentDate: new Date().toISOString(),
      amount: 600, // Remaining balance
      reference: "Final Payment",
    });

    const updatedInvoice = await prisma.vendorInvoice.findUnique({ where: { id: invoiceId } });
    expect(updatedInvoice?.paidAmount).toBe(1000);
    expect(updatedInvoice?.status).toBe("paid");
  });
});
