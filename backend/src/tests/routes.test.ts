import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { createApp } from "../app.js";
import { prisma } from "../core/prisma.js";

const app = createApp();

describe("API Routes Integration Tests", () => {
  let vendorId: string;
  
  beforeAll(async () => {
    const vendor = await prisma.vendor.findFirst();
    if (vendor) vendorId = vendor.id;
  });

  it("GET /api/health should return ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("GET /api/accounts should return array of accounts", async () => {
    const res = await request(app).get("/api/accounts");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/dashboard should return summary totals", async () => {
    const res = await request(app).get("/api/dashboard");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("receivables");
    expect(res.body).toHaveProperty("payables");
    expect(res.body).toHaveProperty("cashBalance");
  });

  it("POST /api/vendors should create a vendor", async () => {
    const res = await request(app)
      .post("/api/vendors")
      .send({
        name: "Acme Supplies",
        phone: "555-0199",
        address: "123 Acme St"
      });
    
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe("Acme Supplies");
  });

  it("POST /api/vendors with invalid data should return 400", async () => {
    const res = await request(app)
      .post("/api/vendors")
      .send({
        name: "" // Too short
      });
    
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Validation failed");
  });
  it("GET /api/vendors should return array", async () => {
    const res = await request(app).get("/api/vendors");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/customers should return array", async () => {
    const res = await request(app).get("/api/customers");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/customers should create a customer", async () => {
    const res = await request(app).post("/api/customers").send({
      name: "API Test Customer",
      phone: "999-9999",
      address: "123 C St"
    });
    expect(res.status).toBe(201);
  });

  it("GET /api/vendor-invoices should return array", async () => {
    const res = await request(app).get("/api/vendor-invoices");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/customer-invoices should return array", async () => {
    const res = await request(app).get("/api/customer-invoices");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/payments should return array", async () => {
    const res = await request(app).get("/api/payments");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/receipts should return array", async () => {
    const res = await request(app).get("/api/receipts");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/bank-accounts should return array", async () => {
    const res = await request(app).get("/api/bank-accounts");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/journal-entries should return array", async () => {
    const res = await request(app).get("/api/journal-entries");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
