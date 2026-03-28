import { z } from "zod";
import { prisma } from "../core/prisma.js";

export const vendorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
});

export type VendorInput = z.infer<typeof vendorSchema>;

export const getVendors = async () => {
  const vendors = await prisma.vendor.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      invoices: {
        where: { status: { in: ["unpaid", "partial"] } },
        select: { totalAmount: true, paidAmount: true }
      }
    }
  });

  return vendors.map((v: any) => {
    const outstandingBalance = v.invoices.reduce(
      (sum: number, inv: any) => sum + (inv.totalAmount - inv.paidAmount), 0
    );
    const { invoices, ...vendor } = v;
    return { ...vendor, outstandingBalance };
  });
};

export const getVendor = async (id: string) => {
  return await prisma.vendor.findUnique({
    where: { id },
  });
};

export const createVendor = async (data: VendorInput) => {
  const validated = vendorSchema.parse(data);
  return await prisma.vendor.create({
    data: validated,
  });
};

export const updateVendor = async (id: string, data: Partial<VendorInput>) => {
  return await prisma.vendor.update({
    where: { id },
    data,
  });
};
