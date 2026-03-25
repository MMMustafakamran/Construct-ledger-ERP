import { z } from "zod";
import { prisma } from "../core/prisma.js";

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
});

export type CustomerInput = z.infer<typeof customerSchema>;

export const getCustomers = async () => {
  return await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getCustomer = async (id: string) => {
  return await prisma.customer.findUnique({
    where: { id },
  });
};

export const createCustomer = async (data: CustomerInput) => {
  const validated = customerSchema.parse(data);
  return await prisma.customer.create({
    data: validated,
  });
};

export const updateCustomer = async (id: string, data: Partial<CustomerInput>) => {
  return await prisma.customer.update({
    where: { id },
    data,
  });
};
