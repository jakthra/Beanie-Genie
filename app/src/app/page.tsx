'use client'
import { DotsHorizontalIcon, MagnifyingGlassIcon, SlashIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, IconButton, Select, Table, Text, TextField } from "@radix-ui/themes";
import { IconHash, IconMoneybag, IconPaperBag, IconWeight } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";


interface Brand {
  name: string
}


interface Purchase {
  brand: Brand
  numberOfBags: number
  weightPerBag: number
  cost: number
  entryDate: Date
  purchaseDate: Date
}

interface PurchaseProps {
  entries: Purchase[]
}

export function PurchaseEntries({ entries }: PurchaseProps) {
  return <Card><Table.Root>
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
      {entries.map((entry) => (
        <Table.Row>
          <Table.RowHeaderCell>{entry.purchaseDate.toISOString()}</Table.RowHeaderCell>
          <Table.Cell>{entry.brand.name}</Table.Cell>
          <Table.Cell>{entry.numberOfBags}</Table.Cell>
          <Table.Cell>{entry.weightPerBag}</Table.Cell>
          <Table.Cell>{entry.cost}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
  </Card>
}

export function AddPurchaseForm() {
  return (
    <Box>
      <Card>
        <Box p="2">
          <Flex gap="3" direction="column">
            <Text as="div" size="2" weight="bold">
              Add new purchase
            </Text>
            <Text as="div" color="gray" size="2">
              Add a new coffee purchase to the database
            </Text>
            <Box maxWidth="250px">
              <TextField.Root placeholder="Coffee brand" size="2">
                <TextField.Slot>
                  <SlashIcon height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            </Box>
            <Box>
              <TextField.Root placeholder="Number of bags">
                <TextField.Slot>
                  <IconPaperBag size="14" />
                </TextField.Slot>
                <TextField.Slot>
                  <IconHash height="14" width="14" />
                </TextField.Slot>
              </TextField.Root>
            </Box>
            <Box>
              <TextField.Root placeholder="Weight pr. bag (g)">
                <TextField.Slot>
                  <IconWeight size="14" />
                </TextField.Slot>
                <TextField.Slot>
                  <Text>g</Text>
                </TextField.Slot>
              </TextField.Root>
            </Box>
            <Box>
              <TextField.Root placeholder="Cost (DKK)">
                <TextField.Slot>
                  <IconMoneybag size="14" />
                </TextField.Slot>
                <TextField.Slot>
                  <Text>dkk</Text>
                </TextField.Slot>
              </TextField.Root>
            </Box>
            <Button>
              Add
            </Button>
          </Flex>
        </Box>
      </Card>
    </Box >)
}


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Flex gap="3">
        <PurchaseEntries entries={[]} />
        <AddPurchaseForm />
      </Flex>
    </main >
  );
}
