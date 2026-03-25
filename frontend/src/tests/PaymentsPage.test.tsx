import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import PaymentsPage from "../pages/PaymentsPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getPayments: vi.fn(),
    getBankAccounts: vi.fn().mockResolvedValue([]),
    getVendorInvoices: vi.fn().mockResolvedValue([]),
  },
}));

describe("PaymentsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the payments list", async () => {
    (api.getPayments as any).mockResolvedValue([
      { 
        id: "1", paymentDate: "2026-03-01", amount: 500, reference: "CHK-100",
        vendorInvoice: { invoiceNumber: "V-123" }, bankAccount: { accountName: "Checking" }
      }
    ]);

    render(
      <BrowserRouter>
        <PaymentsPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Payments/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("CHK-100")).toBeInTheDocument();
    });
  });
});
