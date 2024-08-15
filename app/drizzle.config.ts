
import { defineConfig } from 'drizzle-kit';

console.log(process.env.POSTGRES_HOST)
const db = process.env.POSTGRES_DB ? process.env.POSTGRES_DB : "postgres"
const host = process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : "localhost"

export default defineConfig({
    schema: './src/app/lib/schema.ts',
    out: './drizzle',
    dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
    dbCredentials: {
        host: host,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: db,
        ssl: false
    },
});