import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";


export default async function Home() {
    const prisma = new PrismaClient();
    const zones = await prisma.zone.findMany();

    return (
        <div className="container mx-auto my-4">
            <h1 className="text-3xl font-bold mb-8">Localidades</h1>
            <div className="flex justify-between items-center mb-4">
                {zones.map((zone) => (

                    <Card key={zone.id} >
                        <CardTitle>
                            <Image
                                src={zone.image}
                                alt={zone.name}
                                width={300}
                                height={200}
                            />
                        </CardTitle>
                        <CardContent>
                            <h2 className="text-xl font-bold">{zone.name}</h2>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div >
    );
}
