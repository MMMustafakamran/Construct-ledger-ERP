import { describe, it, expect, beforeAll } from "vitest";
import { createVendorInvoice, getVendorInvoices } from "../services/vendorInvoice.service.js";
import { prisma } from "../core/prisma.js";

describe("Vendor Invoice Service", () => {
  let vendorId: string;
  let expenseAccountId: string;

  beforeAll(async () => {
    // Get valid IDs from the database (seeded data)
    const vendor = await prisma.vendor.findFirst();
    const account = await prisma.account.findFirst({ where: { type: "expense" } });
    
    if (!vendor || !account) throw new Error("Seed data missing for tests");
    
    vendorId = vendor.id;
    expenseAccountId = account.id;
  });

  it("should create a vendor invoice and auto-post journal entries", async () => {
    const invoiceData = {
      vendorId,
      expenseAccountId,
      invoiceNumber: `TEST-INV-${Date.now()}`,
      invoiceDate: new Date().toISOString(),
      totalAmount: 1500,
    };

    const invoice = await createVendorInvoice(invoiceData);

    expect(invoice.id).toBeDefined();
    expect(invoice.invoiceNumber).toBe(invoiceData.invoiceNumber);
    expect(invoice.status).toBe("unpaid");
    expect(invoice.totalAmount).toBe(1500);

    // Verify journal entry was created
    const je = await prisma.journalEntry.findFirst({
      where: { referenceId: invoice.id, referenceType: "VendorInvoice" },
      include: { lines: true }
    });

    expect(je).toBeDefined();
    expect(je?.lines.length).toBe(2);

    const debitLine = je?.lines.find(l => l.debitAmount > 0);
    const creditLine = je?.lines.find(l => l.creditAmount > 0);

    // DR Expense
    expect(debitLine?.accountId).toBe(expenseAccountId);
    expect(debitLine?.debitAmount).toBe(1500);

    // CR Accounts Payable (should be code 2000)
    const apAccount = await prisma.account.findUnique({ where: { id: creditLine!.accountId } });
    expect(apAccount?.code).toBe("2000");
    expect(creditLine?.creditAmount).toBe(1500);
  });
});
