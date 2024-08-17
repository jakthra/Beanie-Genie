import { db } from "@/app/lib/db"
import { inventory, inventoryStatusChanges } from "@/app/lib/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    const data = await db.select().from(inventory).where(eq(inventory.id, params.id))
    return NextResponse.json(data)
}


export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    const data = await req.json()

    const inventoryData = await db.select().from(inventory).where(eq(inventory.id, params.id))
    if (inventoryData.length === 0) {
        return NextResponse.json({}, { status: 404 })
    }


    await db.transaction(async (tx) => {

        // Update item
        const updatedInventory = await tx.update(inventory)
            .set(data)
            .where(eq(inventory.id, params.id))
            .returning();

        // Create change entry
        if (data.status != inventoryData[0].status) {
            await tx.insert(inventoryStatusChanges).values({ statusFrom: inventoryData[0].status, statusTo: data.status, inventoryId: inventoryData[0].id }).returning();
        }
    })


    return NextResponse.json({})
}