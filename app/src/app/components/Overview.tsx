
import { Box, Card, Flex, Tabs } from "@radix-ui/themes"
import { PurchaseForm } from "./forms/PurchaseForm"
import { ConsumableInventoryEntries } from "./ConsumableInventoryEntries"
import { PurchaseEntries } from "./PurchaseEntries"

import { InfoCards } from "./InfoCards"
import { InventoryContent } from "./InventoryContent"


export async function Overview() {

    return (

        <div className="p-4">
            <InfoCards />
            <Flex gap="3" direction={{ 'initial': 'column', 'lg': 'row' }}>
                <InventoryContent />
                <PurchaseForm />
            </Flex>
        </div>
    )
}