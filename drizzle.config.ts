import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

console.log(process.env.DATABASE_URL);

export default defineConfig({
  out: './drizzle',
  schema:'./src/lib/server/db/schema.ts',
  dialect: 'turso',
  casing: 'snake_case',
  dbCredentials: {
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN
  },
  verbose: true,
  strict: true,
})
