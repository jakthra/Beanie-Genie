'use client'
import { Card, Spinner, Table, Text, Badge, DropdownMenu, HoverCard, Flex, Box, Link, IconButton } from "@radix-ui/themes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getInventory, patchInventory, patchProduct } from "../lib/clientGetters";
import { IconStar, IconStarFilled, IconStarOff } from "@tabler/icons-react";

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

    const mutationInventory = useMutation({
        mutationFn: patchInventory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory', 'consumable'] })
        },
    })

    const mutationProduct = useMutation({
        mutationFn: patchProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory', 'consumable'] })
        },
    })


    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Supplier/Roaster</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Product name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Bag #</Table.ColumnHeaderCell>
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
                                    <DropdownMenu.Item onClick={() => mutationInventory.mutate({ ...entry.inventory, status: 'unopened' })}>Unopened</DropdownMenu.Item>
                                    <DropdownMenu.Item onClick={() => mutationInventory.mutate({ ...entry.inventory, status: 'inprogress' })}>Inprogress</DropdownMenu.Item>
                                    <DropdownMenu.Item onClick={() => mutationInventory.mutate({ ...entry.inventory, status: 'empty' })}>Empty</DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </Table.RowHeaderCell>
                        <Table.Cell>{entry.products.supplier}</Table.Cell>
                        <Table.Cell>
                            <HoverCard.Root>
                                <HoverCard.Trigger>
                                    <Text>
                                        <Link href="">
                                            {entry.products.productName} {entry.products.rating === 5 && '🔥'}
                                        </Link>
                                    </Text>
                                </HoverCard.Trigger>
                                <HoverCard.Content>
                                    <Flex>
                                        <Box asChild flexShrink="0">
                                            <Flex direction={"column"} gap="2">
                                                <Text size={"1"}>Rating</Text>
                                                <Flex gap="1">
                                                    <IconButton radius="full" variant={entry.products.rating > 0 ? "solid" : "soft"} onClick={() => { mutationProduct.mutate({ ...entry.products, rating: 1 }) }}><IconStarFilled size="12" /></IconButton>
                                                    <IconButton radius="full" variant={entry.products.rating > 1 ? "solid" : "soft"} onClick={() => { mutationProduct.mutate({ ...entry.products, rating: 2 }) }}><IconStarFilled size="12" /></IconButton>
                                                    <IconButton radius="full" variant={entry.products.rating > 2 ? "solid" : "soft"} onClick={() => { mutationProduct.mutate({ ...entry.products, rating: 3 }) }}><IconStarFilled size="12" /></IconButton>
                                                    <IconButton radius="full" variant={entry.products.rating > 3 ? "solid" : "soft"} onClick={() => { mutationProduct.mutate({ ...entry.products, rating: 4 }) }}><IconStarFilled size="12" /></IconButton>
                                                    <IconButton radius="full" variant={entry.products.rating > 4 ? "solid" : "soft"} onClick={() => { mutationProduct.mutate({ ...entry.products, rating: 5 }) }}><IconStarFilled size="12" /></IconButton>
                                                </Flex>
                                            </Flex>
                                        </Box>
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                        </Table.Cell>
                        <Table.Cell>{entry.inventory.purchaseBagIndex}</Table.Cell>
                        <Table.Cell>{`${entry.purchases.weightPerBag}`} <Text color="gray">g</Text></Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>);
}
