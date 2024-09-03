export const dynamic = 'force-dynamic'
import { getArmageddonDate, getConsumedWeightByMonth, getGramsPerHour, getLastPurchase, getTotalCostByMonth, getTotalWeight } from "@/app/lib/serverGetters"
import { NextRequest, NextResponse } from "next/server"

export type InfoCardsAPI = {
    totalBoughtWeight: Awaited<ReturnType<typeof getTotalWeight>>
    lastPurchase: Awaited<ReturnType<typeof getLastPurchase>>
    consumedWeightByMonth: Awaited<ReturnType<typeof getConsumedWeightByMonth>>
    costByMonth: Awaited<ReturnType<typeof getTotalCostByMonth>>
    gramsAnHour: Awaited<ReturnType<typeof getGramsPerHour>>
    armageddonDate: Awaited<string | undefined>

}

export async function GET(
    req: NextRequest): Promise<NextResponse<InfoCardsAPI>> {
    const totalBought = await getTotalWeight()
    const lastPurchase = await getLastPurchase()
    const consumedWeightByMonth = await getConsumedWeightByMonth()
    const costByMonth = await getTotalCostByMonth()
    const gramsAnHour = await getGramsPerHour()
    const armageddonDate = await getArmageddonDate()

    return NextResponse.json({ totalBoughtWeight: totalBought, armageddonDate: armageddonDate ? armageddonDate.toISOString() : '', consumedWeightByMonth: consumedWeightByMonth, lastPurchase: lastPurchase, costByMonth: costByMonth, gramsAnHour: gramsAnHour })
}
