import { Suspense } from 'react'
import RestaurantList from '@/components/restaurant-list'
import { PrismaClient } from '@prisma/client'

const restaurants = [
    { id: 1, name: "Pasta Paradise", cuisine: "Italian", image: "https://placehold.co/200x300/png" },
    { id: 2, name: "Sushi Sensation", cuisine: "Japanese", image: "https://placehold.co/200x300/png" },
    { id: 3, name: "Burger Bliss", cuisine: "American", image: "https://placehold.co/200x300/png" },
    { id: 4, name: "Taco Temple", cuisine: "Mexican", image: "https://placehold.co/200x300/png" },
    { id: 5, name: "Curry Corner", cuisine: "Indian", image: "https://placehold.co/200x300/png" },
    { id: 6, name: "Dim Sum Delight", cuisine: "Chinese", image: "https://placehold.co/200x300/png" },
]

const prisma = new PrismaClient()

export default async function RestaurantListPage() {
    const restaurants = await prisma.restaurant.findMany();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Encontra a tua refeição</h1>
            <RestaurantList restaurants={restaurants} />
        </div>
    )
}
