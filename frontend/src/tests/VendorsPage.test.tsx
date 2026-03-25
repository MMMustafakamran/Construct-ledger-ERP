import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import VendorsPage from "../pages/VendorsPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getVendors: vi.fn(),
  },
}));

describe("VendorsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the vendors list", async () => {
    (api.getVendors as any).mockResolvedValue([
      { id: "1", name: "Lumber Co", phone: "111-222", address: "Remote", status: "active" }
    ]);

    render(
      <BrowserRouter>
        <VendorsPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Vendors/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Lumber Co")).toBeInTheDocument();
    });
  });
});
