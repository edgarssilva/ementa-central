'use client';

import { ChangeEventHandler, useState } from "react"
import { Clock, HomeIcon, Phone, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link";
import { Restaurant, Zone } from "@prisma/client";
import LocationComboBox from "./location-combobox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import slugify from "slugify";


export default function RestaurantList({ restaurants, zones }: { restaurants: Restaurant[], zones: Zone[] }) {
    const { replace } = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const searchTerm = searchParams.get("pesquisa") || ""
    const zoneSlug = searchParams.get("municipio")

    const currentZone = zones.find((zone) => slugify(zone.name) === zoneSlug)

    const filteredRestaurants = restaurants.filter((restaurant) =>
        (searchTerm === "" || restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (currentZone ? restaurant.zoneId === currentZone.id : true)
    )

    const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
        const params = new URLSearchParams(searchParams)

        if (e.target.value === "") {
            params.delete("pesquisa")
        } else {
            params.set("pesquisa", e.target.value)
        }

        replace(`${pathName}?${params.toString()}`)
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <LocationComboBox zones={zones} />
                <div className="flex-grow">
                    <div className="relative">
                        <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Pesquisar restaurantes..."
                            className="pl-8"
                            defaultValue={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <Button className="w-full md:w-auto">Filtrar</Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-6 basis-2/3">
                    {filteredRestaurants.map((restaurant) => (
                        <Card key={restaurant.id} className="overflow-hidden">
                            <Image
                                src={restaurant.images[0]}
                                alt={restaurant.name}
                                width={300}
                                height={200}
                                className="w-full object-cover h-48"
                            />
                            <CardHeader>
                                <CardTitle>{restaurant.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-8">{restaurant.description.length > 250 ? restaurant.description.slice(0, 250) + "..." : restaurant.description}</p>
                                <p className="text-muted-foreground flex gap-2 items-center"><HomeIcon className="w-4 h-4" />{restaurant.address}</p>
                                <p className="text-muted-foreground flex gap-2 items-center"><Phone className="w-4 h-4" />{restaurant.phoneNumber}</p>
                                <p className="text-muted-foreground flex gap-2 items-center"><Clock className="w-4 h-4" />{restaurant.hours}</p>
                            </CardContent>
                            <CardFooter>
                                <Link href={"/restaurantes/" + restaurant.slug}>
                                    <Button variant="default" className="w-full">Ver Detalhes</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="order-first md:order-1 pb-8 md:pb-0 flex-1 min-h-96">
                    <div className="bg-muted rounded-lg p-4 h-full flex items-center justify-center">
                        <p className="text-muted-foreground">Map will be displayed here</p>
                    </div>
                </div>
            </div>
        </>
    )
}
