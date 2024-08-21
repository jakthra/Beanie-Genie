'use client'
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    File,
    Home,
    LineChart,
    ListFilter,
    MoreVertical,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    ShoppingBag,
    ShoppingCart,
    Truck,
    Users2,
} from "lucide-react"



import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


type NavItem = {
    name: string,
    link: string,
    icon: any
}

type LinkStyle = {
    linkClassName: string
    iconClassName: string
}

export const navItems: NavItem[] = [{
    name: "Overview",
    link: "/",
    icon: ShoppingCart
},
{
    name: "Products",
    link: "/products",
    icon: ShoppingBag
}
]
const logoStyle = "group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
const activeStyle: LinkStyle = { linkClassName: "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8", iconClassName: "h-4 w-4 transition-all group-hover:scale-110" }
const nonactiveStyle: LinkStyle = { linkClassName: "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8", iconClassName: "h-5 w-5" }

export function Navbar() {
    const pathname = usePathname()

    return (
        <>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                    {navItems.map(navItem => {
                        const style = pathname == navItem.link ? activeStyle : nonactiveStyle
                        return (
                            <Tooltip key={navItem.link}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={navItem.link}
                                        className={style.linkClassName}
                                    >
                                        <navItem.icon className={style.iconClassName} />
                                        <span className="sr-only">{navItem.name}</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">{navItem.name}</TooltipContent>
                            </Tooltip>
                        )
                    })}

                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">

                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                {navItems.map(navItem => {
                                    const style = pathname == navItem.link ? "flex items-center gap-4 px-2.5 text-foreground" : "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    return (<Link
                                        href={navItem.link}
                                        className={style}
                                        key={navItem.name}
                                    >
                                        <navItem.icon className={"h-5 w-5"} />
                                        {navItem.name}
                                    </Link>)
                                })
                                }
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                <Image
                                    src="/placeholder-user.jpg"
                                    width={36}
                                    height={36}
                                    alt="Avatar"
                                    className="overflow-hidden rounded-full"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
            </div>
        </>
    )
}
