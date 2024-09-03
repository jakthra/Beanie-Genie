'use server'
import { and, asc, desc, eq, inArray, sql, sum, sumDistinct } from "drizzle-orm";
import { db } from "./db";
import { inventory, inventoryStatusChanges, products, purchases } from "./schema";

export async function getPurchases() {
    return db.select().from(purchases).leftJoin(products, eq(purchases.productId, products.id))
}

export async function getConsumableInventory() {
    return db.select().from(inventory).where(eq(inventory.inventoryType, 'consumable')).leftJoin(purchases, eq(purchases.id, inventory.purchaseId)).leftJoin(products, eq(purchases.productId, products.id)).orderBy(asc(inventory.status), asc(purchases.purchaseDate), products.supplier, products.productName, inventory.purchaseBagIndex)
}

export async function getTotalWeight() {
    return db.select({ value: sql`sum(${purchases.weightPerBag}*${purchases.numberOfBags})`.mapWith(String) }).from(purchases)
}


export async function getConsumedWeightByMonth() {
    return db.select({ weight: sql`sum(${purchases.weightPerBag})`.mapWith(String), 'purchaseDate': sql`date_trunc('month', ${purchases.purchaseDate})` }).from(purchases).leftJoin(inventory, eq(purchases.id, inventory.purchaseId)).where(and(eq(inventory.status, "empty"), eq(inventory.inventoryType, "consumable"))).groupBy(sql`date_trunc('month', ${purchases.purchaseDate})`)
}

export async function getTotalCostByMonth() {
    const sq = db.$with('sq').as(db.select({ id: sql`${purchases.id}`.as('id'), cost: sql`${purchases.cost}`.as('cost'), 'purchaseDate': sql`date_trunc('month', ${purchases.purchaseDate})`.as('purchaseDate') }).from(purchases).leftJoin(inventory, eq(purchases.id, inventory.purchaseId)).where(eq(inventory.inventoryType, "consumable")).groupBy(purchases.id, purchases.cost, sql`date_trunc('month', ${purchases.purchaseDate})`));
    return db.with(sq).select({ cost: sum(sq.cost), month: sq.purchaseDate }).from(sq).groupBy(sq.purchaseDate);
}

export async function getLastPurchase() {
    return db.select().from(purchases).orderBy(desc(purchases.purchaseDate)).limit(1)
}

export async function getGramsPerHour() {
    const sq = db.$with('sq').as(db.select({ emptyDate: inventoryStatusChanges.createdDate, purchaseDate: purchases.purchaseDate, weightPerBag: purchases.weightPerBag, hoursSince: sql`extract(EPOCH from (${inventoryStatusChanges.createdDate} - ${purchases.purchaseDate})/3600)`.as("hoursSince") }).from(inventoryStatusChanges).leftJoin(inventory, eq(inventoryStatusChanges.inventoryId, inventory.id)).leftJoin(purchases, eq(inventory.purchaseId, purchases.id)).where(eq(inventoryStatusChanges.statusTo, "empty")))
    return db.with(sq).select({ gramsAnHours: sql`sum(${sq.weightPerBag} / ${sq.hoursSince})`.mapWith(Number) }).from(sq);
}


export async function getArmageddonDate() {
    const gramsAnHour = await getGramsPerHour()
    const nonConsumedTotalGram = await db.select({ grams: sum(purchases.weightPerBag).mapWith(Number) }).from(inventory).leftJoin(products, eq(products.id, inventory.productId)).leftJoin(purchases, eq(products.id, purchases.productId)).where(inArray(inventory.status, ["inprogress", "unopened"]))
    if (nonConsumedTotalGram.length == 0 || nonConsumedTotalGram[0].grams === null) {
        return null
    }
    const resultingHours = nonConsumedTotalGram[0].grams / gramsAnHour[0].gramsAnHours
    const resultingDateEpochHour = new Date().getTime() / (3600 * 1000) + resultingHours
    const dateToReturn = new Date(resultingDateEpochHour * (3600 * 1000))
    if (isNaN(dateToReturn.getTime())) {
        return null
    }
    return dateToReturn
}