import { notFound } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RestaurantCarousel from "@/components/restaurant-carousel";
import {
    Accessibility,
    Car,
    CreditCard,
    Music,
    Utensils,
    Wifi,
} from "lucide-react";
import { PrismaClient } from "@prisma/client";

const IconMap = new Map<string, any>();
IconMap.set("Wifi", Wifi);
IconMap.set("Car", Car)
IconMap.set("CreditCard", CreditCard)
IconMap.set("Utensils", Utensils)
IconMap.set("Music", Music)
IconMap.set("Accessibility", Accessibility)


interface Props {
    params: Promise<{ restaurant: string[] }>;
}

export default async function RestaurantPage({ params }: Props) {
    const prisma = new PrismaClient();
    const slug = (await params).restaurant[0];

    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        include: {
            location: true,
            menus: {
                include: {
                    items: true,
                },
            },
        },
    });

    if (!restaurant) return notFound();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap lg:flex-nowrap gap-6">
                <Card className="overflow-hidden">
                    <CardHeader>
                        <RestaurantCarousel restaurant={restaurant} />
                        <CardTitle className="text-3xl">{restaurant.name}</CardTitle>
                        <CardDescription>{restaurant.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <p>{restaurant.description}</p>
                            <div>
                                <h3 className="font-semibold mb-2">Contact Information:</h3>
                                <p>ADD ADRESS</p>
                                <p>{restaurant.phoneNumber}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Hours:</h3>
                                <p>{restaurant.hours}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Amenities:</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {restaurant.amenities.map((a: string) => {
                                        const Icon = IconMap.get(a) || CreditCard;
                                        return (
                                            <div key={a} className="flex items-center gap-2">
                                                <Icon className="h-4 w-4" />
                                                <span>{a}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="min-w-96">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold mb-4">Menu Diário</h2>
                        <div className="bg-muted rounded-lg p-4 h-96 flex items-center justify-center">
                            <p className="text-muted-foreground">Daily menu will be displayed here</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Reservas</h2>
                        <div className="bg-muted rounded-lg p-4 h-64 flex items-center justify-center">
                            <p className="text-muted-foreground">Reservas will be displayed here</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Menu</h2>
                <Tabs defaultValue={restaurant.menus[0]?.name} className="w-full">
                    <TabsList className="mb-4" >
                        {restaurant.menus.map((menu) => (
                            <TabsTrigger key={menu.name} value={menu.name}>
                                {menu.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {restaurant.menus.map(({ name, items }) => (
                        <TabsContent key={name} value={name}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {items.map((item, index) => (
                                            <li
                                                key={index}
                                                className="border-b pb-4 last:border-b-0 last:pb-0"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-semibold">{item.name}</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                    <span className="font-semibold">
                                                        ${item.price.toFixed(2)}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Localização</h2>
                <div className="bg-muted rounded-lg p-4 h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">Map will be displayed here</p>
                </div>
            </div>
        </div>
    );
}
