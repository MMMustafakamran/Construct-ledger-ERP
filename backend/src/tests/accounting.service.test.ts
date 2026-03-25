import { describe, it, expect } from "vitest";
import { accountingService } from "../services/accounting.service.js";

describe("Accounting Service", () => {
  it("should get dashboard summary with correct types", async () => {
    const summary = await accountingService.getDashboardSummary();
    
    expect(summary).toHaveProperty("receivables");
    expect(summary).toHaveProperty("payables");
    expect(summary).toHaveProperty("cashBalance");
    expect(summary).toHaveProperty("totalTransactions");
    expect(summary).toHaveProperty("recentTransactions");
    
    expect(typeof summary.receivables).toBe("number");
    expect(typeof summary.payables).toBe("number");
    expect(typeof summary.cashBalance).toBe("number");
    expect(Array.isArray(summary.recentTransactions)).toBe(true);
  });

  it("should list valid accounts", async () => {
    const accounts = await accountingService.listAccounts();
    
    expect(accounts.length).toBeGreaterThan(0);
    // Spot check format
    const firstAccount = accounts[0];
    expect(firstAccount).toHaveProperty("id");
    expect(firstAccount).toHaveProperty("code");
    expect(firstAccount).toHaveProperty("name");
    expect(firstAccount).toHaveProperty("category");
    expect(firstAccount).toHaveProperty("balance");
    expect(typeof firstAccount.balance).toBe("number");
  });
});
