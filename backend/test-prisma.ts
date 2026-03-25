import "dotenv/config";
import { PrismaClient } from "@prisma/client";

console.log("URL:", process.env.DATABASE_URL);
try {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  });
  console.log("Success with datasourceUrl");
} catch (e) {
  console.error("Failed with datasourceUrl", e.message);
}

try {
  const prisma2 = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });
  console.log("Success with datasources.db.url");
} catch (e) {
  console.error("Failed with datasources.db.url", e.message);
}
