import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import VendorInvoiceFormPage from "../pages/VendorInvoiceFormPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getVendors: vi.fn(),
    getAccounts: vi.fn(),
    createVendorInvoice: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("VendorInvoiceFormPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (api.getVendors as any).mockResolvedValue([{ id: "v1", name: "Vendor 1" }]);
    (api.getAccounts as any).mockResolvedValue([{ id: "a1", name: "Expense 1", code: "5000", category: "expense" }]);
  });

  it("posts a bill and redirects", async () => {
    render(
      <BrowserRouter>
        <VendorInvoiceFormPage />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText(/Vendor 1/i)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/Vendor/i), { target: { value: "v1" } });
    fireEvent.change(screen.getByLabelText(/Expense Account/i), { target: { value: "a1" } });
    fireEvent.change(screen.getByLabelText(/Bill \/ Invoice #/i), { target: { value: "INV-001" } });
    fireEvent.change(screen.getByPlaceholderText(/0\.00/i), { target: { value: "150.50" } });

    fireEvent.click(screen.getByText(/Post Bill to Ledger/i));

    await waitFor(() => {
      expect(api.createVendorInvoice).toHaveBeenCalledWith(expect.objectContaining({
        vendorId: "v1",
        totalAmount: 150.5,
      }));
      expect(mockNavigate).toHaveBeenCalledWith("/vendor-invoices");
    });
  });
});
