import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import CustomerInvoiceFormPage from "../pages/CustomerInvoiceFormPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getCustomers: vi.fn(),
    getAccounts: vi.fn(),
    createCustomerInvoice: vi.fn(),
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

describe("CustomerInvoiceFormPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (api.getCustomers as any).mockResolvedValue([{ id: "c1", name: "Client 1" }]);
    (api.getAccounts as any).mockResolvedValue([{ id: "a1", name: "Revenue 1", code: "4000", category: "revenue" }]);
  });

  it("posts an invoice and redirects", async () => {
    render(
      <BrowserRouter>
        <CustomerInvoiceFormPage />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByRole('combobox', { name: /Customer/i })).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/Customer/i), { target: { value: "c1" } });
    fireEvent.change(screen.getByLabelText(/Revenue Account/i), { target: { value: "a1" } });
    fireEvent.change(screen.getByLabelText(/Invoice #/i), { target: { value: "INV-999" } });
    fireEvent.change(screen.getByPlaceholderText(/0\.00/i), { target: { value: "500.00" } });

    fireEvent.click(screen.getByText(/Generate Invoice/i));

    await waitFor(() => {
      expect(api.createCustomerInvoice).toHaveBeenCalledWith(expect.objectContaining({
        customerId: "c1",
        totalAmount: 500,
      }));
      expect(mockNavigate).toHaveBeenCalledWith("/customer-invoices");
    });
  });
});
