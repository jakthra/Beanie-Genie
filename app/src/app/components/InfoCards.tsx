'use client'
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout, Card, Skeleton, Spinner, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { Coffee, PiggyBank, ShoppingBasket, Skull } from "lucide-react";
import Link from "next/link";
import { getInfoCards } from "../lib/clientGetters";

export function InfoCards() {

    const { status, data } = useQuery({
        queryKey: ['info-cards'],
        queryFn: getInfoCards
    })

    return (
        <div>
            <Text size={'8'}>Inventory</Text>
            <div className="grid w-96 pt-8 pb-8 gap-3">
                <Callout.Root>
                    <Callout.Icon>
                        <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>
                        You&apos;re missing a few reviews - add them  <Link href="/products" className="text-secondary-foreground">here</Link>
                    </Callout.Text>
                </Callout.Root>
            </div>
            <div className="flex flex-col sm:flex-row pt-3 pb-8 gap-3 ">
                <Card >
                    <div className="flex flex-col gap-2 p-2">
                        <div className="flex items-center gap-2">
                            <ShoppingBasket className="h-5 w-5" />
                            <Text as="div" size="2" weight="bold">
                                Bought
                            </Text>
                        </div>
                        {status == 'pending' && <Skeleton />}
                        {status == 'success' && <Text size={"8"}>{data?.totalBoughtWeight && data?.totalBoughtWeight[0].value}g</Text>}
                        {status == 'success' && <Text size={"1"} color="gray">Last purchase was on {data?.lastPurchase && data?.lastPurchase[0].purchaseDate}</Text>}
                    </div>
                </Card>
                <Card >
                    <div className="flex flex-col gap-2 p-2">
                        <div className="flex items-center gap-2">
                            <Coffee className="h-5 w-5" />
                            <Text as="div" size="2" weight="bold">
                                Consumed
                            </Text>
                        </div>
                        {/* TODO: This might need to be revisited */}
                        {status == 'pending' && <Skeleton />}
                        {status == 'success' && <Text size={"8"}>{data?.consumedWeightByMonth[0].weight}g</Text>}
                        {status == 'success' && <Text size={"1"} color="gray">{Number(data?.gramsAnHour[0].gramsAnHours).toFixed(1)} g/hour</Text>}
                    </div>
                </Card>
                <Card >
                    <div className="flex flex-col gap-2 p-2">
                        <div className="flex items-center gap-2">
                            <PiggyBank className="h-5 w-5" />
                            <Text as="div" size="2" weight="bold">
                                Cost
                            </Text>
                        </div>
                        {/* TODO: This might need to be revisited */}

                        {status == 'pending' && <Skeleton />}
                        {status == 'success' && <Text size={"8"}>{data?.costByMonth[0].cost}dkk</Text>}
                        {status == 'success' && <Text size={"1"} color="gray">+{data?.costByMonth.slice(-1)[0].cost}dkk from last month</Text>}
                    </div>
                </Card>
                <Card >
                    <div className="flex flex-col gap-2 p-2">
                        <div className="flex items-center gap-2">
                            <Skull className="h-5 w-5" />
                            <Text as="div" size="2" weight="bold">
                                Expected Armageddon
                            </Text>
                        </div>
                        {status == 'pending' && <Skeleton />}
                        {status == 'success' && <Text size={"8"} color="orange">{data?.armageddonDate && new Date(Date.parse(data.armageddonDate)).toLocaleDateString()}</Text>}
                        {status == 'success' && <Text size={"1"} color="gray">Click here for a purchase recommendation</Text>}
                    </div>
                </Card>
            </div>
        </div>
    )
}