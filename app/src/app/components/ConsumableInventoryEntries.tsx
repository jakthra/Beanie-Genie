'use client'
import { Card, Spinner, Table, Text, Badge, DropdownMenu, Flex, Box, Link, IconButton, Popover, SegmentedControl, Checkbox, Skeleton } from "@radix-ui/themes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import { getInventory, patchInventory, patchProduct } from "../lib/clientGetters";
import { IconStar, IconStarFilled, IconStarOff } from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "../lib/schema";
import { InferSelectModel } from "drizzle-orm";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Milk } from "lucide-react";

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

const emptyAndOld = { textDecoration: 'line-through', background: 'text-accent' }

interface ProductPopoverProps {
    product: InferSelectModel<typeof products>
    children: ReactNode
}

export function ProductPopover(props: ProductPopoverProps) {

    const queryClient = useQueryClient()
    const mutationProduct = useMutation({
        mutationFn: patchProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventory', 'consumable'] })
            queryClient.invalidateQueries({ queryKey: ['info-cards'] })
        },
    })
    return (<Popover.Root>
        <Popover.Trigger>
            <Text style={{ 'cursor': 'pointer' }}>
                {props.children}
            </Text>
        </Popover.Trigger>
        <Popover.Content>
            <Flex>
                <Flex direction={"column"} gap="4">
                    <Text size={"2"}>Rating</Text>
                    <Flex gap="1">
                        <IconButton radius="full" variant={props.product.rating > 0 ? "solid" : "soft"} onClick={() => { mutationProduct.mutate({ ...props.product, rating: 1 }) }}><IconStarFilled size="12" /></IconButton>
                        <IconButton radius="full" variant={props.product.rating > 1 ? "solid" : "soft"} onClick={() => { mutationProduct.mutate({ ...props.product, rating: 2 }) }}><IconStarFilled size="12" /></IconButton>
                        <IconButton radius="full" variant={props.product.rating > 2 ? "solid" : "soft"} onClick={() => { mutationProduct.mutate({ ...props.product, rating: 3 }) }}><IconStarFilled size="12" /></IconButton>
                        <IconButton radius="full" variant={props.product.rating > 3 ? "solid" : "soft"} onClick={() => { mutationProduct.mutate({ ...props.product, rating: 4 }) }}><IconStarFilled size="12" /></IconButton>
                        <IconButton radius="full" variant={props.product.rating > 4 ? "solid" : "soft"} onClick={() => { mutationProduct.mutate({ ...props.product, rating: 5 }) }}><IconStarFilled size="12" /></IconButton>
                    </Flex>

                    <div className="flex gap-2 items-center">
                        <IconButton radius="large" variant={props.product.goodWithMilk ? "solid" : "soft"} onClick={() => { mutationProduct.mutate({ ...props.product, goodWithMilk: props.product.goodWithMilk ? false : true }) }}>
                            <Milk size="14" />
                        </IconButton>
                        <Text size={"1"}>Good with milk?</Text>

                    </div>
                </Flex>
            </Flex>
        </Popover.Content>
    </Popover.Root>)
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
            queryClient.invalidateQueries({ queryKey: ['info-cards'] })
        },
    })



    const [filter, setFilter] = useState('all')

    const _data = data?.filter((item) => filter === "all" || item.inventory.status === filter)

    return (
        <div className="grid gap-2">
            <div className="grid">
                <SegmentedControl.Root defaultValue="all" size={"1"} >
                    <SegmentedControl.Item value="all" onClick={() => setFilter('all')}>All</SegmentedControl.Item>
                    <SegmentedControl.Item value="Empty" onClick={() => setFilter('empty')}>Empty</SegmentedControl.Item>
                    <SegmentedControl.Item value="Inprogress" onClick={() => setFilter('inprogress')}>Inprogress</SegmentedControl.Item>
                    <SegmentedControl.Item value="Unopened" onClick={() => setFilter('unopened')}>Unopened</SegmentedControl.Item>
                </SegmentedControl.Root>
            </div>
            {status === "pending" &&
                <div className="grid gap-1">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            }
            {status === "success" &&
                <Table.Root variant="ghost">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Supplier/Roaster</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Product name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Bag #</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Weight</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body >
                        {_data && _data.map((entry) => (
                            <Table.Row key={entry.inventory.id} className={entry.inventory.status == "empty" ? "text-muted-foreground" : ''}>
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
                                    <ProductPopover product={entry.products}>
                                        <Link >
                                            {entry.products.productName} {entry.products.rating === 5 && '🔥'}
                                        </Link>
                                    </ProductPopover>
                                </Table.Cell>
                                <Table.Cell>{entry.inventory.purchaseBagIndex}</Table.Cell>
                                <Table.Cell>{`${entry.purchases.weightPerBag}`} <Text color="gray">g</Text></Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root >
            }
        </div>
    );
}
