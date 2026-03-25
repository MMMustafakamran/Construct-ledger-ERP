import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import VendorFormPage from "../pages/VendorFormPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    createVendor: vi.fn(),
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

describe("VendorFormPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits the form and navigates on success", async () => {
    render(
      <BrowserRouter>
        <VendorFormPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/e.g. Acme Supplies/i), {
      target: { value: "Test Vendor" },
    });
    fireEvent.change(screen.getByPlaceholderText(/e.g. 555-0100/i), {
      target: { value: "111-222" },
    });

    fireEvent.click(screen.getByText(/Create Vendor/i));

    await waitFor(() => {
      expect(api.createVendor).toHaveBeenCalledWith({
        name: "Test Vendor",
        phone: "111-222",
        address: "",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/vendors");
    });
  });

  it("shows error message on API failure", async () => {
    (api.createVendor as any).mockRejectedValue(new Error("Network Error"));

    render(
      <BrowserRouter>
        <VendorFormPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/e.g. Acme Supplies/i), {
      target: { value: "Test Vendor" },
    });
    fireEvent.click(screen.getByText(/Create Vendor/i));

    await waitFor(() => {
      expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
    });
  });
});
