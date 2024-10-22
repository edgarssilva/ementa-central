'use client';

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link";
import { Restaurant } from "@prisma/client";


export default function RestaurantList({ restaurants }: { restaurants: Restaurant[] }) {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-grow">
                    <div className="relative">
                        <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Pesquisar restaurantes..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <Button className="w-full md:w-auto">Filtrar</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                                    <p className="text-muted-foreground">{restaurant.description}</p>
                                    <p className="text-muted-foreground">{restaurant.phoneNumber}</p>
                                    <p className="text-muted-foreground">{restaurant.hours}</p>
                                </CardContent>
                                <CardFooter>
                                    <Link href={"/restaurantes/" + restaurant.slug}>
                                        <Button variant="default" className="w-full">Ver Detalhes</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="bg-muted rounded-lg p-4 h-full flex items-center justify-center">
                        <p className="text-muted-foreground">Map will be displayed here</p>
                    </div>
                </div>
            </div>
        </>
    )
}
