import { Box, Callout, Card, Container, Flex, Tabs, Text } from "@radix-ui/themes"
import { PurchaseForm } from "./forms/PurchaseForm"
import { ConsumableInventoryEntries } from "./ConsumableInventoryEntries"
import { PurchaseEntries } from "./PurchaseEntries"
import { Card as ShadnCard, CardHeader, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Sparkline } from '@mantine/charts'
import { IconMoneybag } from "@tabler/icons-react"
import { Coffee, PiggyBank, ShoppingBasket, Skull } from "lucide-react"
import { getTotalWeight, getLastPurchase, getConsumedWeightByMonth, getTotalCostByMonth, getGramsPerHour, getArmageddonDate } from "../lib/serverGetters"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export async function Overview() {

    const totalBought = await getTotalWeight()
    const lastPurchase = await getLastPurchase()
    const consumedWeightByMonth = await getConsumedWeightByMonth()
    const costByMonth = await getTotalCostByMonth()
    const gramsAnHour = await getGramsPerHour()
    const armageddonDate = await getArmageddonDate()
    return (

        <div >
            <Text size={'8'}>Inventory</Text>
            <div className="grid w-96 pt-8 pb-8 gap-3">
                <Callout.Root>
                    <Callout.Icon>
                        <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                        You&apos;re missing a few reviews - add them  <Link href="/products" className="text-secondary-foreground">here</Link>
                    </Callout.Text>
                </Callout.Root>
            </div>
            <div className="flex pt-3 pb-8 gap-3">
                <Card >
                    <div className="flex flex-col gap-2 p-2">
                        <div className="flex items-center gap-2">
                            <ShoppingBasket className="h-5 w-5" />
                            <Text as="div" size="2" weight="bold">
                                Bought
                            </Text>
                        </div>

                        <Text size={"8"}>{totalBought[0].value}g</Text>
                        <Text size={"1"} color="gray">Last purchase was on {lastPurchase[0].purchaseDate}</Text>
                    </div>
                </Card>
                <Card >
                    <div className="flex flex-col gap-2 p-2">
                        <div className="flex items-center gap-2">
                            <Coffee className="h-5 w-5" />
                            <Text as="div" size="2" weight="bold">
                                Consumed
                            </Text>
                        </div>
                        {/* TODO: This might need to be revisited */}
                        <Text size={"8"}>{consumedWeightByMonth[0].weight}g</Text>
                        <Text size={"1"} color="gray">{Number(gramsAnHour[0].gramsAnHours).toFixed(1)} g/hour</Text>
                    </div>
                </Card>
                <Card >
                    <div className="flex flex-col gap-2 p-2">
                        <div className="flex items-center gap-2">
                            <PiggyBank className="h-5 w-5" />
                            <Text as="div" size="2" weight="bold">
                                Cost
                            </Text>
                        </div>
                        {/* TODO: This might need to be revisited */}
                        <Text size={"8"}>{costByMonth[0].cost}dkk</Text>
                        <Text size={"1"} color="gray">+{costByMonth.slice(-1)[0].cost}dkk from last month</Text>
                    </div>
                </Card>
                <Card >
                    <div className="flex flex-col gap-2 p-2">
                        <div className="flex items-center gap-2">
                            <Skull className="h-5 w-5" />
                            <Text as="div" size="2" weight="bold">
                                Expected Armageddon
                            </Text>
                        </div>

                        <Text size={"8"} color="orange">{armageddonDate?.toLocaleDateString()}</Text>
                        <Text size={"1"} color="gray">Click here for a purchase recommendation</Text>
                    </div>
                </Card>
            </div>
            <Flex gap="3" direction={{ 'initial': 'column', 'lg': 'row' }}>

                <PurchaseForm />
                <Box>
                    <Card >
                        <Box p="2">
                            <Tabs.Root defaultValue="consumables">
                                <Tabs.List>
                                    <Tabs.Trigger value="consumables">Consumables</Tabs.Trigger>
                                    <Tabs.Trigger value="purchases">Purchases</Tabs.Trigger>
                                </Tabs.List>
                                <Box pt="3">
                                    <Tabs.Content value="consumables">
                                        <ConsumableInventoryEntries />
                                    </Tabs.Content>
                                    <Tabs.Content value="purchases">
                                        <PurchaseEntries />
                                    </Tabs.Content>
                                </Box>
                            </Tabs.Root>
                        </Box>
                    </Card>
                </Box>
            </Flex>
        </div>
    )
}