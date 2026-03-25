import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import BankPage from "../pages/BankPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getBankAccounts: vi.fn(),
    getPayments: vi.fn().mockResolvedValue([]),
    getReceipts: vi.fn().mockResolvedValue([]),
  },
}));

describe("BankPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the bank accounts summary", async () => {
    (api.getBankAccounts as any).mockResolvedValue([
      { id: "1", accountName: "Main Operating", accountNumber: "123456789", currentBalance: 25000 }
    ]);

    render(
      <BrowserRouter>
        <BankPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Bank & Cash/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText("Main Operating")[0]).toBeInTheDocument();
      expect(screen.getByText("123456789")).toBeInTheDocument();
    });
  });
});
