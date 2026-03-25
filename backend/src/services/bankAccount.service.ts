import { prisma } from "../core/prisma.js";

export const getBankAccounts = async () => {
  return await prisma.bankAccount.findMany({
    orderBy: { accountName: "asc" },
  });
};

export const getBankAccount = async (id: string) => {
  return await prisma.bankAccount.findUnique({
    where: { id },
  });
};
