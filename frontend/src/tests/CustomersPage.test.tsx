import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import CustomersPage from "../pages/CustomersPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getCustomers: vi.fn(),
  },
}));

describe("CustomersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the customers list", async () => {
    (api.getCustomers as any).mockResolvedValue([
      { id: "1", name: "Premium Client", phone: "555-123", address: "Local", status: "active" }
    ]);

    render(
      <BrowserRouter>
        <CustomersPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Customers/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Premium Client")).toBeInTheDocument();
      expect(screen.getByText("555-123")).toBeInTheDocument();
    });
  });
});
