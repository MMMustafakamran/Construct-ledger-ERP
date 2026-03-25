import { Router } from "express";
import { accountingService } from "../services/accounting.service.js";

export const accountingRouter = Router();

accountingRouter.get("/accounts", (_request, response) => {
  response.json({ data: accountingService.listAccounts() });
});

accountingRouter.get("/transactions", (_request, response) => {
  response.json({ data: accountingService.listTransactions() });
});

accountingRouter.get("/dashboard", (_request, response) => {
  response.json({ data: accountingService.getDashboardSummary() });
});

