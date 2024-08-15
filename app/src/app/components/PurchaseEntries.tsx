'use client'
import { Card, Spinner, Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPurchases } from "./clientGetters";


export function PurchaseEntries() {
    const { status, data } = useQuery({
        queryKey: ['purchases'],
        queryFn: getPurchases
    })
    return (<Card>
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Purchase date</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Supplier</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Product name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Number of bags</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Weight per bag</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Cost</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {status == 'pending' && <Spinner />}
                {data && data.map((entry) => (
                    <Table.Row key={entry.id}>
                        <Table.RowHeaderCell>{entry.purchaseDate}</Table.RowHeaderCell>
                        <Table.Cell>{entry.supplier}</Table.Cell>
                        <Table.Cell>{entry.productName}</Table.Cell>
                        <Table.Cell>{entry.numberOfBags}</Table.Cell>
                        <Table.Cell>{entry.weightPerBag}</Table.Cell>
                        <Table.Cell>{entry.cost}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    </Card>);
}
