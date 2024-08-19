'use client'
import { Card, Spinner, Table, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPurchases } from "../lib/clientGetters";


export function PurchaseEntries() {
    const { status, data } = useQuery({
        queryKey: ['purchases'],
        queryFn: getPurchases
    })
    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Purchase date</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Supplier</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Product name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Number of bags (#)</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Weight per bag (g)</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Cost (DKK)</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {status == 'pending' && <Spinner />}
                {data && data.map((entry) => (
                    <Table.Row key={entry.purchases.id}>
                        <Table.RowHeaderCell>{entry.purchases.purchaseDate}</Table.RowHeaderCell>
                        <Table.Cell>{entry.products.supplier}</Table.Cell>
                        <Table.Cell>{entry.products.productName}</Table.Cell>
                        <Table.Cell>{`${entry.purchases.numberOfBags}`} <Text color="gray">#</Text></Table.Cell>
                        <Table.Cell>{`${entry.purchases.weightPerBag}`} <Text color="gray">g</Text></Table.Cell>
                        <Table.Cell>{`${entry.purchases.cost}`} <Text color="gray">DKK</Text></Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>);
}
