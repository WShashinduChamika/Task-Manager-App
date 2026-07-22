import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../../generated/prisma/client.js';

const getPrisma = (() => {
  const state: { client: PrismaClient | null } = { client: null };

  return (): PrismaClient => {
    if (!state.client) {
      const connectionString = process.env.DATABASE_URL;

      if (!connectionString) {
        console.error('Database connection error: DATABASE_URL is not configured');
        throw new Error('DATABASE_URL is not configured');
      }

      const client = new PrismaClient({
        adapter: new PrismaPg({ connectionString }),
      });

      const originalConnect = client.$connect.bind(client);
      client.$connect = async (): Promise<void> => {
        try {
          await originalConnect();
          console.log('Database connection established successfully');
        } catch (error) {
          console.error('Database connection failed:', error);
          throw error;
        }
      };

      state.client = client;
    }

    return state.client;
  };
})();

export { getPrisma };