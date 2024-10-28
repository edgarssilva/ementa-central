import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";


export default async function Home() {
    const prisma = new PrismaClient();
    const zones = await prisma.zone.findMany();

    const selection = await prisma.restaurant.findMany({ take: 3 });

    return (
        <div>
            <div className="h-80 w-full bg-green-800" />
            <div className="max-w-[64rem] py-4 mx-auto px-[1rem] pb-40">
                <h1 className="text-2xl font-semibold mt-4 mb-2">Seleções Ementa Central</h1>
                <div className="flex gap-8">
                    {selection.map((restaurant) => (
                        <Card key={restaurant.id} className="basis-1/3">
                            <Link href={`/restaurantes/${restaurant.slug}`}>
                                <Image
                                    src={restaurant.images[0]}
                                    alt={restaurant.name}
                                    width={300}
                                    height={200}
                                />
                                <CardContent>
                                    <CardTitle className="mb-2">{restaurant.name}</CardTitle>
                                    {restaurant.description.length > 100 ? restaurant.description.slice(0, 100) + "..." : restaurant.description}
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </div>

                <h1 className="text-2xl font-semibold mt-8 mb-2">Municípios</h1>
                <Carousel className="w-full">
                    <CarouselContent className="items-stretch">
                        {zones.map((zone) => (
                            <CarouselItem key={zone.id} className="md:basis-1/4 lg:basis-1/5">
                                <Link href={`/localidades/${zone.id}`}>
                                    <div className="border p-2 text-center flex flex-col justify-center h-full">
                                        <Image
                                            src={zone.image}
                                            alt={zone.name}
                                            width={300}
                                            height={200}
                                        />
                                        <h2 className="text-xl font-bold">{zone.name}</h2>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div >
        </div>
    );
}
