import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/app/lib/db'
import { inventory, purchases } from '@/app/lib/schema'
import { eq } from 'drizzle-orm'
import { getConsumableInventory } from '@/app/lib/serverGetters'



export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const data = await getConsumableInventory()
    return NextResponse.json(data)
}