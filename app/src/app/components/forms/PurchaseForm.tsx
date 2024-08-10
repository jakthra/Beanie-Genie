'use client'

import { DotsHorizontalIcon, MagnifyingGlassIcon, SlashIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, IconButton, Select, Spinner, Table, Text, TextField } from "@radix-ui/themes";
import { IconCalendar, IconHash, IconMoneybag, IconPaperBag, IconWeight } from "@tabler/icons-react";
import { useForm, SubmitHandler } from "react-hook-form"
import { DatePickerInput } from '@mantine/dates';

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPurchase } from "../clientGetters";

type Inputs = {
    brand: string
    numberOfBags: number
    weightPerBag: number
    cost: number
}

export function PurchaseForm() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: addPurchase,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['purchases'] })
        },
    })
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>()
    // TODO: Invalidate the SSR provided data (rehydrate the server rendered list)
    //const onSubmit: SubmitHandler<Inputs> = (data) => { console.log(data) }

    const [purchaseDate, setpurchaseDate] = useState<Date>(new Date());

    const onSubmit: SubmitHandler<Inputs> = (data) => { mutation.mutate({ ...data, purchaseDate: purchaseDate.toISOString() }); reset() }


    return (
        <Box>
            <Card>
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Flex gap="3" direction="column">
                            <Text as="div" size="2" weight="bold">
                                Add new purchase
                            </Text>
                            <Text as="div" color="gray" size="2">
                                Add a new coffee purchase to the database
                            </Text>
                            <Box>
                                <DatePickerInput
                                    placeholder="Purchase date"
                                    value={purchaseDate}
                                    onChange={setpurchaseDate}
                                    size="xs"
                                    variant="subtle"
                                    leftSection={<IconCalendar size="14" />}
                                />
                            </Box>
                            <Box >
                                <TextField.Root {...register("brand", { required: true })} placeholder="Coffee brand" size="2">
                                    <TextField.Slot>
                                        <SlashIcon height="16" width="16" />
                                    </TextField.Slot>
                                </TextField.Root>
                            </Box>
                            <Box>
                                <TextField.Root  {...register("numberOfBags", { required: true })} placeholder="Number of bags">
                                    <TextField.Slot>
                                        <IconPaperBag size="14" />
                                    </TextField.Slot>
                                    <TextField.Slot>
                                        <IconHash height="14" width="14" />
                                    </TextField.Slot>
                                </TextField.Root>
                            </Box>
                            <Box>
                                <TextField.Root {...register("weightPerBag", { required: true })} placeholder="Weight pr. bag (g)">
                                    <TextField.Slot>
                                        <IconWeight size="14" />
                                    </TextField.Slot>
                                    <TextField.Slot>
                                        <Text>g</Text>
                                    </TextField.Slot>
                                </TextField.Root>
                            </Box>
                            <Box>
                                <TextField.Root {...register("cost", { required: true })} placeholder="Cost (DKK)">
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
                    </form>
                </Box>
            </Card >
        </Box >)
}