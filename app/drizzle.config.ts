
import { defineConfig } from 'drizzle-kit';

const db = process.env.POSTGRES_DB ? process.env.POSTGRES_DB : "postgres"
const host = process.env.POSTGRESS_HOST ? process.env.POSTGRESS_HOST : "localhost"

export default defineConfig({
    schema: './src/app/lib/schema.ts',
    out: './drizzle',
    dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
    dbCredentials: {
        host: host,
        user: process.env.POSTGRESS_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: db,
        ssl: false
    },
});