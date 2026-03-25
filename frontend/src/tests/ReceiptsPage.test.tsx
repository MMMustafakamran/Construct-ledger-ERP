import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ReceiptsPage from "../pages/ReceiptsPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getReceipts: vi.fn(),
    getBankAccounts: vi.fn().mockResolvedValue([]),
    getCustomerInvoices: vi.fn().mockResolvedValue([]),
  },
}));

describe("ReceiptsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the receipts list", async () => {
    (api.getReceipts as any).mockResolvedValue([
      { 
        id: "1", receiptDate: "2026-03-05", amount: 1500, reference: "ACH-999",
        customerInvoice: { invoiceNumber: "C-456" }, bankAccount: { accountName: "Savings" }
      }
    ]);

    render(
      <BrowserRouter>
        <ReceiptsPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Receipts/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("ACH-999")).toBeInTheDocument();
    });
  });
});
