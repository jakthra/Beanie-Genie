import { Flex, Tabs, Box, Card } from "@radix-ui/themes";

import React, { Suspense } from "react";
import { PurchaseForm } from "./components/forms/PurchaseForm";
import { getQueryClient } from "./lib/getQueryClient";
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { PurchaseEntries } from "./components/PurchaseEntries";
import { ConsumableInventoryEntries } from "./components/ConsumableInventoryEntries";
import { getConsumableInventory, getPurchases } from "./lib/serverGetters";


export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['purchases'],
    queryFn: () => getPurchases(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['inventory', 'consumable'],
    queryFn: () => getConsumableInventory(),
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Flex gap="3" direction={{ 'initial': 'column', 'lg': 'row' }}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <PurchaseForm />
            <Card>
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
          </Suspense>
        </HydrationBoundary>
      </Flex>
    </main >
  );
}
