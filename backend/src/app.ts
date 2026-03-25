import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { accountingRouter } from "./routes/accounting.routes.js";
import { healthRouter } from "./routes/health.routes.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.FRONTEND_ORIGIN
    })
  );
  app.use(express.json());

  app.get("/", (_request, response) => {
    response.json({
      name: "barebones-accounting-api",
      version: "0.1.0",
      message: "Foundation API is running."
    });
  });

  app.use("/api/health", healthRouter);
  app.use("/api", accountingRouter);

  return app;
}

