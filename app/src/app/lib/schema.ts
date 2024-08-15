import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar, doublePrecision, date, timestamp } from 'drizzle-orm/pg-core';


export const purchases = pgTable('purchases', {
    id: serial('id').primaryKey().notNull(),
    supplier: varchar('supplier', { length: 256 }).notNull(),
    originRegion: varchar('originRegion', { length: 256 }),
    originCountry: varchar('originCountry', { length: 256 }),
    numberOfBags: integer("numberOfBands"),
    weightPerBag: doublePrecision('weightPerBag'),
    cost: doublePrecision("cost"),
    createdDate: timestamp("createdDate").defaultNow().notNull(),
    purchaseDate: date("purchaseDate")
});