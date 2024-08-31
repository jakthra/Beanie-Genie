
import { Box, Card, Flex, Tabs } from "@radix-ui/themes"
import { ConsumableInventoryEntries } from "./ConsumableInventoryEntries"
import { PurchaseEntries } from "./PurchaseEntries"

export function InventoryContent() {
    return (<Box>
        <Card>
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
    </Box>)
}