import { Box, Card, Flex, Tabs, Text } from "@radix-ui/themes"
import { PurchaseForm } from "./forms/PurchaseForm"
import { ConsumableInventoryEntries } from "./ConsumableInventoryEntries"
import { PurchaseEntries } from "./PurchaseEntries"

export function Overview() {
    return (
        <main className="lg:p-24">
            <Flex gap="3" direction={{ 'initial': 'column', 'lg': 'row' }}>
                <PurchaseForm />
                <Box>
                    <Card >
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
                    </Card>
                </Box>
            </Flex>
        </main >
    )
}