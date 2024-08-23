import { Box, Card, Container, Flex, Tabs, Text } from "@radix-ui/themes"
import { PurchaseForm } from "./forms/PurchaseForm"
import { ConsumableInventoryEntries } from "./ConsumableInventoryEntries"
import { PurchaseEntries } from "./PurchaseEntries"
import { Card as ShadnCard, CardHeader, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Sparkline } from '@mantine/charts'
import { IconMoneybag } from "@tabler/icons-react"
import { Coffee, PiggyBank, ShoppingBasket, Skull } from "lucide-react"

export function Overview() {
    return (

        <div>
            <Text size={'8'}>Inventory</Text>
            <div className="flex pt-8 pb-8 gap-3">

                <Card >
                    <div className="flex flex-col gap-2 p-2">
                        <div className="flex items-center gap-2">
                            <ShoppingBasket className="h-5 w-5" />
                            <Text as="div" size="2" weight="bold">
                                Bought
                            </Text>
                        </div>

                        <Text size={"8"}>1800g</Text>
                        <Text size={"1"}>+1000g from last month</Text>
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
                        <Text size={"8"}>800g</Text>
                        <Text size={"1"}>+400g from last month</Text>
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

                        <Text size={"8"}>420dkk</Text>
                        <Text size={"1"}>+420dkk from last month</Text>
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

                        <Text size={"8"} color="orange">2nd of December</Text>
                        <Text size={"1"}>Click here for a purchase recommendation</Text>
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