import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/app/lib/db'
import { purchases } from '@/app/lib/schema'
import { createInventory } from '@/app/lib/compute'
import { inArray } from 'drizzle-orm'
import { getPurchases } from '@/app/lib/serverGetters'

type ResponseData = {
  message: string
}

export async function GET(
  req: NextRequest,
  res: NextResponse<ResponseData>
) {
  const data = await getPurchases()
  return NextResponse.json(data)
}


export async function POST(
  req: NextRequest) {
  const data = await req.json()
  const returnData = await db.insert(purchases).values(data).returning();
  await createInventory(returnData)
  return NextResponse.json({ returnData })
}