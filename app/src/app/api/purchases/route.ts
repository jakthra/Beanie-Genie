import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/app/lib/db'
import { purchases } from '@/app/lib/schema'

type ResponseData = {
  message: string
}

export async function GET(
  req: NextRequest,
  res: NextResponse<ResponseData>
) {
  const data = await db.select().from(purchases)
  return NextResponse.json(data)
}


export async function POST(
  req: NextRequest) {
  const data = await req.json()
  const returnData = await db.insert(purchases).values(data)
  return NextResponse.json({ returnData })
}