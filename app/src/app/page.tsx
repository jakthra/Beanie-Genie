import { Flex } from "@radix-ui/themes";

import React, { Suspense } from "react";
import { purchases } from "./lib/schema";
import { PurchaseForm } from "./components/forms/PurchaseForm";
import { getQueryClient } from "./lib/getQueryClient";
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { PurchaseEntries } from "./components/PurchaseEntries";
import { db } from "./lib/db";







export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['purchases'],
    queryFn: () => db.select().from(purchases),
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Flex gap="3">

        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <PurchaseEntries />
            <PurchaseForm />
          </Suspense>
        </HydrationBoundary>
      </Flex>
    </main >
  );
}
