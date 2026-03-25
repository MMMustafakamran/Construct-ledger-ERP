import { prisma } from "../core/prisma.js";

export const getJournalEntries = async () => {
  return await prisma.journalEntry.findMany({
    include: {
      lines: {
        include: { account: true },
        orderBy: { creditAmount: "asc" } // Debits (0 credit) usually shown first
      }
    },
    orderBy: { createdAt: "desc" },
  });
};
