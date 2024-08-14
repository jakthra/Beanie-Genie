import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar, doublePrecision, date, timestamp } from 'drizzle-orm/pg-core';


export const purchases = pgTable('purchases', {
    id: serial('id').primaryKey().notNull(),
    brand: varchar('brand', { length: 256 }),
    numberOfBags: integer("numberOfBands"),
    weightPerBag: doublePrecision('weightPerBag'),
    cost: doublePrecision("cost"),
    createdDate: timestamp("createdDate").defaultNow().notNull(),
    purchaseDate: date("purchaseDate")
});