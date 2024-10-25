import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";


export default async function Home() {
    const prisma = new PrismaClient();
    const zones = await prisma.zone.findMany();

    return (
        <div>
            <div className="h-80 w-full bg-green-800" />
            <div className="max-w-[64rem] py-4 mx-auto px-[1rem] pb-40">
                <h1 className="text-3xl font-bold mb-2 mt-4">Municípios</h1>
                <Carousel className="w-full">
                    <CarouselContent className="items-center">
                        {zones.map((zone) => (
                            <CarouselItem key={zone.id} className="md:basis-1/4 lg:basis-1/5 ">
                                <Link href={`/localidades/${zone.id}`}>
                                    <div className="border p-2 text-center ">
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
