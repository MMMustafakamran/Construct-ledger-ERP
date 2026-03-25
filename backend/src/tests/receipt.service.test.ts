import { expect, test, describe } from 'vitest';
import { createReceipt } from '../services/receipt.service.js';
import { createCustomerInvoice, getCustomerInvoice } from '../services/customerInvoice.service.js';
import { createCustomer } from '../services/customer.service.js';
import { getBankAccounts } from '../services/bankAccount.service.js';
import { prisma } from '../core/prisma.js';

describe('Receipt Service', () => {
  test('should record a receipt and update invoice status', async () => {
    const accounts = await prisma.account.findMany({ where: { category: 'revenue' } });
    if (accounts.length === 0) return; // skip if no seed data

    const customer = await createCustomer({ name: 'Receipt Test Customer', phone: '', address: '' });
    
    const invoice = await createCustomerInvoice({
      customerId: customer.id,
      revenueAccountId: accounts[0].id,
      invoiceNumber: `RCT-TEST-${Date.now()}`,
      invoiceDate: new Date().toISOString(),
      totalAmount: 1000,
    });

    const bankAccounts = await getBankAccounts();
    if (bankAccounts.length === 0) return;

    const receipt = await createReceipt({
      customerInvoiceId: invoice.id,
      bankAccountId: bankAccounts[0].id,
      amount: 1000,
      receiptDate: new Date().toISOString(),
      reference: "TEST-REF"
    });

    expect(receipt).toHaveProperty('id');
    expect(receipt.amount).toBe(1000);

    const updatedInvoice = await getCustomerInvoice(invoice.id);
    expect(updatedInvoice?.status).toBe('paid');
    expect(updatedInvoice?.receivedAmount).toBe(1000);
  });
});
