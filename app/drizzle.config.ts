
import { defineConfig } from 'drizzle-kit';

const db = process.env.POSTGRES_DB ? process.env.POSTGRES_DB : "postgres"

export default defineConfig({
    schema: './src/app/lib/schema.ts',
    out: './drizzle',
    dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
    dbCredentials: {
        host: "psql.home.io",
        user: "postgres",
        password: process.env.POSTGRES_PASSWORD,
        database: db,
        ssl: false
    },
});