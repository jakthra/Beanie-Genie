import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { env } from "process";

// or
export const client = new Client({
    host: "psql.home.io",
    port: 5432,
    user: "postgres",
    password: env.POSTGRES_PASSWORD,
    database: "postgres",
});
await client.connect();
export const db = drizzle(client);