import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { env } from "process";

const dbName = process.env.POSTGRES_DB ? process.env.POSTGRES_DB : "postgres"

// or
export const client = new Client({
    host: "psql.home.io",
    port: 5432,
    user: "postgres",
    password: env.POSTGRES_PASSWORD,
    database: dbName,
});
await client.connect();
export const db = drizzle(client);