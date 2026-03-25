import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import CustomerInvoicesPage from "../pages/CustomerInvoicesPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getCustomerInvoices: vi.fn(),
  },
}));

describe("CustomerInvoicesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the customer invoices list", async () => {
    (api.getCustomerInvoices as any).mockResolvedValue([
      { 
        id: "1", customer: { name: "Client X" }, invoiceNumber: "C-INV-202", 
        invoiceDate: "2026-02-01", totalAmount: 5000, receivedAmount: 5000, status: "paid" 
      }
    ]);

    render(
      <BrowserRouter>
        <CustomerInvoicesPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Customer Invoices/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Client X")).toBeInTheDocument();
      expect(screen.getByText("C-INV-202")).toBeInTheDocument();
      expect(screen.getByText(/paid/i)).toBeInTheDocument();
    });
  });
});
