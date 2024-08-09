import { Card, Flex, Table } from "@radix-ui/themes";

import React, { Suspense } from "react";
import { db } from "./lib/db";
import { purchases } from "./lib/schema";
import { PurchaseForm } from "./components/forms/PurchaseForm";
import { getQueryClient } from "./lib/getQueryClient";
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'


interface PurchaseEntriesProps {
  data: typeof purchases[]
}


export function PurchaseEntries({ data }: PurchaseEntriesProps) {
  return (<Card>
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Purchase date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Brand</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Number of bags</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Weight per bag</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Cost</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((entry) => (
          <Table.Row key={entry.id}>
            <Table.RowHeaderCell>{entry.purchaseDate}</Table.RowHeaderCell>
            <Table.Cell>{entry.brand}</Table.Cell>
            <Table.Cell>{entry.numberOfBags}</Table.Cell>
            <Table.Cell>{entry.weightPerBag}</Table.Cell>
            <Table.Cell>{entry.cost}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  </Card>)
}




export default async function Home() {
  const queryClient = getQueryClient()
  const data = await db.select().from(purchases)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Flex gap="3">
        <Suspense>
          <PurchaseEntries data={data} />
        </Suspense>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <PurchaseForm />

        </HydrationBoundary>
      </Flex>
    </main >
  );
}
