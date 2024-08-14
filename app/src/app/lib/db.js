import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool } from "pg";
import { env } from "process";

const dbName = process.env.POSTGRES_DB ? process.env.POSTGRES_DB : "postgres"

// or
export const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: dbName,
});
export const db = drizzle(pool);