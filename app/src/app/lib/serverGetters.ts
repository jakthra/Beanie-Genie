'use server'
import { asc, desc, eq } from "drizzle-orm";
import { db } from "./db";
import { inventory, purchases } from "./schema";

export async function getPurchases() {
    return db.select().from(purchases)
}

export async function getConsumableInventory() {
    return db.select().from(inventory).where(eq(inventory.inventoryType, 'consumable')).leftJoin(purchases, eq(purchases.id, inventory.purchaseId)).orderBy(asc(purchases.purchaseDate), purchases.supplier, purchases.productName, inventory.purchaseBagIndex)
}