import { createInventory } from "@/app/lib/compute"
import { db } from "@/app/lib/db"
import { inventory, purchases } from "@/app/lib/schema"
import { eq, inArray, isNull } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
    req: NextRequest) {
    // Find all purchases where inventory is missing
    const missingInventoryItems = await db.select().from(purchases).leftJoin(inventory, eq(purchases.id, inventory.purchaseId)).where(isNull(inventory.id))

    // Create inventory from purchases
    const purchasesMissingInventoryItems = await db.select().from(purchases).where(inArray(purchases.id, missingInventoryItems.map((value) => value.purchases.id)))
    await createInventory(purchasesMissingInventoryItems)

    return NextResponse.json({ missingInventoryItems })
}