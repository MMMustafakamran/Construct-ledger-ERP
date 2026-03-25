import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ReceiptsPage from "../pages/ReceiptsPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getReceipts: vi.fn(),
    getBankAccounts: vi.fn(),
    getCustomerInvoices: vi.fn(),
    createReceipt: vi.fn(),
  },
}));

describe("ReceiptsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the receipts list and opens drawer", async () => {
    (api.getReceipts as any).mockResolvedValue([
      { 
        id: "1", receiptDate: "2026-03-05", amount: 1500, reference: "ACH-999",
        customerInvoice: { invoiceNumber: "C-456" }, bankAccount: { accountName: "Savings" }
      }
    ]);
    (api.getBankAccounts as any).mockResolvedValue([]);
    (api.getCustomerInvoices as any).mockResolvedValue([]);

    render(
      <BrowserRouter>
        <ReceiptsPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Customer Receipts/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("ACH-999")).toBeInTheDocument();
    });

    // Open drawer
    fireEvent.click(screen.getByText(/\+ Record Receipt/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Record New Receipt/i)).toBeInTheDocument();
    });
  });
});
