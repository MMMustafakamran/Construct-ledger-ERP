import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getDashboard: vi.fn(),
  },
}));

describe("DashboardPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the dashboard summary cards with data from API", async () => {
    const mockData = {
      receivables: 1000,
      payables: 500,
      cashBalance: 5000,
      totalTransactions: 5,
      recentTransactions: [],
    };

    (api.getDashboard as any).mockResolvedValue(mockData);

    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Executive Overview/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/\$1,000.00/i)).toBeInTheDocument();
      expect(screen.getByText(/\$500.00/i)).toBeInTheDocument();
      expect(screen.getByText(/\$5,000.00/i)).toBeInTheDocument();
    });
  });
});
