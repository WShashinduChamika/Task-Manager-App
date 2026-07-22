import "dotenv/config";

import app from "./app";
import { getPrisma } from "./../core/database/prisma";

const port = Number(process.env.PORT ?? 3000);

const start = async (): Promise<void> => {
  const prisma = getPrisma();
  await prisma.$connect();

  app.listen(port, (): void => {
    console.log(`Server running on port ${port}`);
  });
};

start().catch((error: unknown): void => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
