import RestaurantList from '@/components/restaurant-list'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function RestaurantListPage() {
    const restaurants = await prisma.restaurant.findMany();

    return (
        <div className="w-full mx-auto px-12 my-8">
            <h1 className="text-3xl font-bold mb-8">Encontra a tua refeição</h1>
            <RestaurantList restaurants={restaurants} />
        </div>
    )
}
