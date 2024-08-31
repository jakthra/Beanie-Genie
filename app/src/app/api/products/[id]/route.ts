import { db } from "@/app/lib/db";
import { products } from "@/app/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    const data = await req.json()

    const inventoryData = await db.select().from(products).where(eq(products.id, params.id))
    if (inventoryData.length === 0) {
        return NextResponse.json({}, { status: 404 })
    }

    const updatedInventory = await db.update(products)
        .set({ originCountry: data.originCountry, originRegion: data.originRegion, rating: data.rating, productName: data.productName, goodWithMilk: data.goodWithMilk })
        .where(eq(products.id, params.id))
        .returning();

    return NextResponse.json(updatedInventory)
}