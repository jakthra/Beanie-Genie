import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar, doublePrecision, date } from 'drizzle-orm/pg-core';


export const purchases = pgTable('purchases', {
    id: serial('id').primaryKey(),
    brand: varchar('brand', { length: 256 }),
    numberOfBags: integer("numberOfBands"),
    weightPerBag: doublePrecision('weightPerBag'),
    cost: doublePrecision("cost"),
    createdDate: date("entryDate"),
    purchaseDate: date("purchaseDate")
});