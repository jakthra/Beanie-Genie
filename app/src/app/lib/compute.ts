import { InferSelectModel } from "drizzle-orm";
import { inventory, purchases } from "./schema";
import { db } from "./db";

export async function createInventory(data: InferSelectModel<typeof purchases>[]) {
    await db.transaction(async (tx) => {
        data.map(async (value) => {
            for (let i = 0; i < value.numberOfBags; i++) {
                await db.insert(inventory).values({ 'inventoryType': 'consumable', 'purchaseBagIndex': i, purchaseId: value.id, status: 'unopened' })
            }
        })
    })
}