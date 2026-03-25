import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import CustomerFormPage from "../pages/CustomerFormPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    createCustomer: vi.fn(),
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

describe("CustomerFormPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits the form and redirects", async () => {
    (api.createCustomer as any).mockResolvedValue({ id: "1" });

    render(
      <BrowserRouter>
        <CustomerFormPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Customer Name/i), { target: { value: "New Client" } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: "111-2222" } });
    fireEvent.click(screen.getByText(/Create Customer/i));

    await waitFor(() => {
      expect(api.createCustomer).toHaveBeenCalledWith(expect.objectContaining({
        name: "New Client",
        phone: "111-2222"
      }));
      expect(mockNavigate).toHaveBeenCalledWith("/customers");
    });
  });
});
