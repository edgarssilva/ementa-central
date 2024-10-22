import RestaurantList from '@/components/restaurant-list'
import { PrismaClient } from '@prisma/client'

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
