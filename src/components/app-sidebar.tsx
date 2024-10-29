"use client"

import * as React from "react"
import {
    Calendar,
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
}
const links = [{ name: "Reservas", url: "/dashboard/reservas", icon: Calendar }];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { open } = useSidebar()

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader >
                <div className="px-2 pt-4">
                    <h1 className="text-xl font-bold">{open ? "Ementra Central" : "E"}</h1>
                    {open && <p className="text-sm text-muted-foreground">Dashboard</p>}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Restaurante</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu >
                            {links.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
