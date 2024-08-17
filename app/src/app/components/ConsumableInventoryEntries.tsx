'use client'
import { Card, Spinner, Table, Text, Badge, DropdownMenu } from "@radix-ui/themes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getInventory, patchInventory } from "../lib/clientGetters";
import { IconChevronCompactDown } from "@tabler/icons-react";

function getStatusColor(status: 'unopened' | 'inprogress' | 'empty') {
    if (status === 'unopened') {
        return 'orange'
    }
    if (status === 'inprogress') {
        return 'blue'
    }
    if (status === 'empty') {
        return 'red'
    }
}


export function ConsumableInventoryEntries() {
    const queryClient = useQueryClient()
    const { status, data } = useQuery({
        queryKey: ['inventory', 'consumable'],
        queryFn: getInventory
    })

    const mutation = useMutation({
        mutationFn: patchInventory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory', 'consumable'] })
        },
    })


    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Product name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Weight</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {status == 'pending' && <Spinner />}
                {data && data.map((entry) => (
                    <Table.Row key={entry.inventory.id}>
                        <Table.RowHeaderCell>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Badge color={getStatusColor(entry.inventory.status)}>{entry.inventory.status} <DropdownMenu.TriggerIcon /></Badge>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Item onClick={() => mutation.mutate({ ...entry.inventory, status: 'unopened' })}>Unopened</DropdownMenu.Item>
                                    <DropdownMenu.Item onClick={() => mutation.mutate({ ...entry.inventory, status: 'inprogress' })}>Inprogress</DropdownMenu.Item>
                                    <DropdownMenu.Item onClick={() => mutation.mutate({ ...entry.inventory, status: 'empty' })}>Empty</DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </Table.RowHeaderCell>
                        <Table.Cell>{entry.purchases.productName}</Table.Cell>
                        <Table.Cell>{`${entry.purchases.weightPerBag}`} <Text color="gray">g</Text></Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>);
}
