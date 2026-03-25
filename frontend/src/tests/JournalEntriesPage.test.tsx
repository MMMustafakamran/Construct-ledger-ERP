import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import JournalEntriesPage from "../pages/JournalEntriesPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getJournalEntries: vi.fn(),
  },
}));

describe("JournalEntriesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the journal entries list with lines", async () => {
    (api.getJournalEntries as any).mockResolvedValue([
      { 
        id: "1", entryDate: "2026-03-24", referenceType: "PAYMENT", referenceId: "PAY-1", memo: "Test JE",
        lines: [
          { id: "L1", account: { name: "Cash", code: "1000" }, debit: 100, credit: 0 },
          { id: "L2", account: { name: "Revenue", code: "4000" }, debit: 0, credit: 100 }
        ]
      }
    ]);

    render(
      <BrowserRouter>
        <JournalEntriesPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/General Ledger/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Test JE")).toBeInTheDocument();
      expect(screen.getByText("Cash")).toBeInTheDocument();
      expect(screen.getByText("Revenue")).toBeInTheDocument();
    });
  });
});
