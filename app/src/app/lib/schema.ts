import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar, doublePrecision, date, timestamp } from 'drizzle-orm/pg-core';


export const purchases = pgTable('purchases', {
    id: serial('id').primaryKey().notNull(),
    supplier: varchar('supplier', { length: 256 }).notNull(),
    productName: varchar('productName', { length: 256 }),
    originRegion: varchar('originRegion', { length: 256 }),
    originCountry: varchar('originCountry', { length: 256 }),
    numberOfBags: integer("numberOfBands").notNull(),
    weightPerBag: doublePrecision('weightPerBag'),
    cost: doublePrecision("cost"),
    createdDate: timestamp("createdDate").defaultNow().notNull(),
    purchaseDate: date("purchaseDate")
});

export const inventoryTypeEnum = pgEnum("inventoryType", ['consumable', 'non-consumable'])
export const consumableStatusTypeEnum = pgEnum("consumableStatusType", ['unopened', 'inprogress', 'empty'])

export const inventory = pgTable('inventory', {
    id: serial('id').primaryKey().notNull(),
    inventoryType: inventoryTypeEnum('inventoryType').notNull(),
    purchaseId: integer('purchase_id').references(() => purchases.id),
    inventoryName: varchar('inventoryName', { length: 256 }).notNull(),
    status: consumableStatusTypeEnum('statusType').notNull().default('unopened')
})

export const inventoryStatusChanges = pgTable('inventory_status_changes', {
    id: serial('id').primaryKey().notNull(),
    inventoryId: integer('inventory_id').references(() => inventory.id),
    createdDate: timestamp("createdDate").defaultNow().notNull(),
    statusFrom: consumableStatusTypeEnum('statusFrom').notNull(),
    statusTo: consumableStatusTypeEnum('statusTo').notNull()
})