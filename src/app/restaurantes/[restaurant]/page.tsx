import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RestaurantCarousel from '@/components/restaurant-carousel'
import { Accessibility, Car, CreditCard, Music, Utensils, Wifi } from 'lucide-react'

const restaurant = {
    id: 1,
    name: "Pasta Paradise",
    cuisine: "Italian",
    images: [
        "https://placehold.co/600x400/png?text=Interior",
        "https://placehold.co/600x400/png?text=Dish+1",
        "https://placehold.co/600x400/png?text=Dish+2",
        "https://placehold.co/600x400/png?text=Exterior",
    ],
    description: "Indulge in the flavors of Italy at Pasta Paradise. Our handmade pasta and authentic sauces will transport you straight to the heart of Rome. With a warm ambiance and attentive service, we offer a dining experience that's truly paradisiacal.",
    address: "123 Pasta Lane, Noodle City, PC 12345",
    phone: "(555) 123-4567",
    hours: "Mon-Sat: 11am-10pm, Sun: 12pm-9pm",
    amenities: [
        { name: "Free WiFi", icon: "Wifi" },
        { name: "Parking Available", icon: "Car" },
        { name: "Accepts Credit Cards", icon: "CreditCard" },
        { name: "Outdoor Seating", icon: "Utensils" },
        { name: "Live Music on Weekends", icon: "Music" },
        { name: "Wheelchair Accessible", icon: "Accessibility" },
    ],
    menu: {
        "Appetizers": [
            { name: "Bruschetta", description: "Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil", price: 8.99 },
            { name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, and sweet basil with a balsamic glaze", price: 10.99 },
        ],
        "Pasta": [
            { name: "Spaghetti Carbonara", description: "Spaghetti with a creamy sauce of eggs, cheese, pancetta, and black pepper", price: 16.99 },
            { name: "Fettuccine Alfredo", description: "Fettuccine tossed with butter and parmesan cheese", price: 15.99 },
            { name: "Lasagna", description: "Layers of pasta, ricotta cheese, and our signature meat sauce", price: 18.99 },
        ],
        "Desserts": [
            { name: "Tiramisu", description: "Coffee-flavored Italian dessert made of ladyfingers dipped in coffee, layered with a whipped mixture of eggs, sugar, and mascarpone cheese", price: 7.99 },
            { name: "Panna Cotta", description: "Italian dessert of sweetened cream thickened with gelatin and molded", price: 6.99 },
        ],
    },

}

const IconMap = {
    Wifi: Wifi,
    Car: Car,
    CreditCard: CreditCard,
    Utensils: Utensils,
    Music: Music,
    Accessibility: Accessibility,
}

export default function RestaurantPage({ params }: { params: { restaurant: string } }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="overflow-hidden">
                <CardHeader>
                    <RestaurantCarousel restaurant={restaurant} />
                    <CardTitle className="text-3xl">{restaurant.name}</CardTitle>
                    <CardDescription>{restaurant.cuisine} Cuisine</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <p>{restaurant.description}</p>
                        <div>
                            <h3 className="font-semibold mb-2">Contact Information:</h3>
                            <p>{restaurant.address}</p>
                            <p>{restaurant.phone}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Hours:</h3>
                            <p>{restaurant.hours}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Amenities:</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {restaurant.amenities.map((amenity, index) => {
                                    const Icon = IconMap[amenity.icon as keyof typeof IconMap]
                                    return (
                                        <div key={index} className="flex items-center gap-2">
                                            <Icon className="h-4 w-4" />
                                            <span>{amenity.name}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Menu</h2>
                <Tabs defaultValue="Appetizers" className="w-full">
                    <TabsList className="mb-4">
                        {Object.keys(restaurant.menu).map((category) => (
                            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                        ))}
                    </TabsList>
                    {Object.entries(restaurant.menu).map(([category, items]) => (
                        <TabsContent key={category} value={category}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{category}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {items.map((item, index) => (
                                            <li key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-semibold">{item.name}</h4>
                                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                                    </div>
                                                    <span className="font-semibold">${item.price.toFixed(2)}</span>
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
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <div className="bg-muted rounded-lg p-4 h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">Map will be displayed here</p>
                </div>
            </div>
        </div>
    )
}
