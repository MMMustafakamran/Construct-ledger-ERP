import { Router } from "express";
import type { HealthResponse } from "../core/accounting.types.js";

export const healthRouter = Router();

healthRouter.get("/", (_request, response) => {
  const payload: HealthResponse = {
    status: "ok",
    service: "barebones-accounting-api",
    timestamp: new Date().toISOString()
  };

  response.json(payload);
});

