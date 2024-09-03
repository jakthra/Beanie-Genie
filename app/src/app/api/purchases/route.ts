import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/app/lib/db'
import { products, purchases } from '@/app/lib/schema'
import { createInventory } from '@/app/lib/compute'
import { getPurchases } from '@/app/lib/serverGetters'
import { eq } from 'drizzle-orm'

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
  // Check if a product exist 
  let productData = await db.select().from(products).where(eq(products.productName, data.productName))
  if (productData.length === 0) {
    productData = await db.insert(products).values({ supplier: data.supplier, originCountry: data.originCountry, originRegion: data.originRegion, productName: data.productName }).returning();
  }
  const returnData = await db.insert(purchases).values({ numberOfBags: data.numberOfBags, cost: data.cost, productId: productData[0].id, purchaseDate: data.purchaseDate, weightPerBag: data.weightPerBag }).returning();
  await createInventory(returnData)
  return NextResponse.json({ returnData })
}