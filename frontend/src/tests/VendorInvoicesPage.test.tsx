import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import VendorInvoicesPage from "../pages/VendorInvoicesPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getVendorInvoices: vi.fn(),
  },
}));

describe("VendorInvoicesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the vendor invoices list", async () => {
    (api.getVendorInvoices as any).mockResolvedValue([
      { 
        id: "1", vendor: { name: "Supplier A" }, invoiceNumber: "INV-101", 
        invoiceDate: "2026-01-01", totalAmount: 1000, paidAmount: 0, status: "unpaid" 
      }
    ]);

    render(
      <BrowserRouter>
        <VendorInvoicesPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Vendor Bills/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Supplier A")).toBeInTheDocument();
      expect(screen.getByText("INV-101")).toBeInTheDocument();
      expect(screen.getByText(/unpaid/i)).toBeInTheDocument();
    });
  });
});
