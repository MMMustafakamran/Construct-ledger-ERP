import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import AccountsPage from "../pages/AccountsPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getAccounts: vi.fn(),
  },
}));

describe("AccountsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the chart of accounts table", async () => {
    (api.getAccounts as any).mockResolvedValue([
      { id: "1", code: "1000", name: "Cash", category: "asset", status: "active" }
    ]);

    render(
      <BrowserRouter>
        <AccountsPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Chart of Accounts/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Cash")).toBeInTheDocument();
      expect(screen.getByText("1000")).toBeInTheDocument();
    });
  });
});
