import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  console.log("Seeding database...");

  // 1. Chart of Accounts
  const accCash = await prisma.account.create({
    data: { code: "1000", name: "Cash", category: "asset" }
  });
  const accAr = await prisma.account.create({
    data: { code: "1100", name: "Accounts Receivable", category: "asset" }
  });
  const accAp = await prisma.account.create({
    data: { code: "2000", name: "Accounts Payable", category: "liability" }
  });
  const accSales = await prisma.account.create({
    data: { code: "4000", name: "Sales Revenue", category: "revenue" }
  });
  const accExpense = await prisma.account.create({
    data: { code: "5000", name: "Operating Expense", category: "expense" }
  });

  // 2. Bank Account
  const bank = await prisma.bankAccount.create({
    data: { accountName: "Main Checking", accountNumber: "CHK-1234", currentBalance: 50000 }
  });

  // 3. Vendor
  const vendor = await prisma.vendor.create({
    data: { name: "Acme Supplies Ltd", phone: "555-0100", address: "123 Supply St" }
  });

  // 4. Customer
  const customer = await prisma.customer.create({
    data: { name: "BuildCorp Inc", phone: "555-0200", address: "456 Build Ave" }
  });

  // 5. Vendor Invoice (Unpaid)
  const vendorInvoice = await prisma.vendorInvoice.create({
    data: {
      vendorId: vendor.id,
      expenseAccountId: accExpense.id,
      invoiceNumber: "BILL-001",
      invoiceDate: new Date(),
      totalAmount: 12500,
      paidAmount: 0,
      status: "unpaid",
      jobReference: "JOB-77"
    }
  });

  // 6. Vendor Invoice Journal Entry
  const je1 = await prisma.journalEntry.create({
    data: {
      referenceType: "VendorInvoice",
      referenceId: vendorInvoice.id,
      memo: `Invoice ${vendorInvoice.invoiceNumber} from ${vendor.name}`,
    }
  });

  await prisma.journalEntryLine.createMany({
    data: [
      { journalEntryId: je1.id, accountId: accExpense.id, debitAmount: 12500, creditAmount: 0 },
      { journalEntryId: je1.id, accountId: accAp.id, debitAmount: 0, creditAmount: 12500 }
    ]
  });

  // 7. Customer Invoice (Unpaid)
  const customerInvoice = await prisma.customerInvoice.create({
    data: {
      customerId: customer.id,
      revenueAccountId: accSales.id,
      invoiceNumber: "INV-001",
      invoiceDate: new Date(),
      totalAmount: 25000,
      receivedAmount: 0,
      status: "unpaid",
      equipmentReference: "EXC-05"
    }
  });

  // 8. Customer Invoice Journal Entry
  const je2 = await prisma.journalEntry.create({
    data: {
      referenceType: "CustomerInvoice",
      referenceId: customerInvoice.id,
      memo: `Invoice ${customerInvoice.invoiceNumber} to ${customer.name}`,
    }
  });

  await prisma.journalEntryLine.createMany({
    data: [
      { journalEntryId: je2.id, accountId: accAr.id, debitAmount: 25000, creditAmount: 0 },
      { journalEntryId: je2.id, accountId: accSales.id, debitAmount: 0, creditAmount: 25000 }
    ]
  });

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
