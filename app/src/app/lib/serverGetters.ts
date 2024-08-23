'use server'
import { asc, desc, eq } from "drizzle-orm";
import { db } from "./db";
import { inventory, products, purchases } from "./schema";

export async function getPurchases() {
    return db.select().from(purchases).leftJoin(products, eq(purchases.productId, products.id))
}

export async function getConsumableInventory() {
    return db.select().from(inventory).where(eq(inventory.inventoryType, 'consumable')).leftJoin(purchases, eq(purchases.id, inventory.purchaseId)).leftJoin(products, eq(purchases.productId, products.id)).orderBy(asc(inventory.status), asc(purchases.purchaseDate), products.supplier, products.productName, inventory.purchaseBagIndex)
}