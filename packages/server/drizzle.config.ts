import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: '../shared/src/schemas/*.ts',
  out: './src/database/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_PATH ?? './data/jirakli.db',
  },
});
