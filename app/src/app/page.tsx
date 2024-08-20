import { Flex, Tabs, Box, Card } from "@radix-ui/themes";

import React, { Suspense } from "react";
import { PurchaseForm } from "./components/forms/PurchaseForm";
import { getQueryClient } from "./lib/getQueryClient";
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { PurchaseEntries } from "./components/PurchaseEntries";
import { ConsumableInventoryEntries } from "./components/ConsumableInventoryEntries";
import { getConsumableInventory, getPurchases } from "./lib/serverGetters";
import { Overview } from "./components/Overview";


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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <Overview />
      </Suspense>
    </HydrationBoundary>
  );
}
