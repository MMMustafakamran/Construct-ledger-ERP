import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { accountingRouter } from "./routes/accounting.routes.js";
import { healthRouter } from "./routes/health.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) {
          callback(null, true);
          return;
        }

        const isLocalDevOrigin =
          /^http:\/\/localhost:\d+$/.test(origin) || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin);
        const isConfiguredOrigin = origin === env.FRONTEND_ORIGIN;

        if (isLocalDevOrigin || isConfiguredOrigin) {
          callback(null, true);
          return;
        }

        callback(new Error(`Blocked by CORS: ${origin}`));
      }
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

  app.use(errorHandler);

  return app;
}
