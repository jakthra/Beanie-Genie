import { getConsumableInventory } from '@/app/lib/serverGetters'
import { NextRequest, NextResponse } from 'next/server'

type ResponseData = {
    message: string
}

export async function GET(
    req: NextRequest,
    res: NextResponse<ResponseData>
) {
    const data = await getConsumableInventory()
    return NextResponse.json(data)
}

export async function POST(
    req: NextRequest,
    res: NextResponse<ResponseData>
) { }