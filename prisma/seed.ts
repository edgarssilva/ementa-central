import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.zone.createMany({
        data: [
            { name: "Albergaria-a-Velha", image: "/albergariaavelha.png" },
            { name: "Aveiro", image: "/aveiro.png" },
            { name: "Águeda", image: "/agueda.png" },
            { name: "Estarreja", image: "/estarreja.jpg" },
            { name: "Ílhavo", image: "/ilhavo.png" },
            { name: "Murtosa", image: "/murtosa.png" },
        ]
    });

    const zoneIds = await prisma.zone.findMany({
        select: { id: true }
    });


    await prisma.location.createMany({
        data: [
            { latitude: 40.640063, longitude: -8.653753 },
            { latitude: 40.644272, longitude: -8.64554 },
            { latitude: 40.576219, longitude: -8.441521 },
            { latitude: 40.75861, longitude: -8.57211 },
            { latitude: 40.6043, longitude: -8.7057 },
            { latitude: 40.7599, longitude: -8.5721 },
        ]
    });

    const locationIds = await prisma.location.findMany({
        select: { id: true }
    });

    const names = ["Restaurante O Telheiro", "A Tasca do Zé", "Café Central", "Joaquim dos Ossos", "O Pescador", "O Tacho"];

    await prisma.$transaction(
        names.map((name, index) => prisma.restaurant.create({
            data: {
                name,

                slug: name.toLowerCase().replace(/ /g, "-"),
                locationId: locationIds[index].id,
                zoneId: zoneIds[index].id,
                images: ["/restaurante1.jpg", "/restaurante2.jpg", "/restaurante3.jpg"],
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at  " +
                    "volutpat dolor. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. " +
                    "Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. " +
                    "Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. " +
                    "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. " +
                    "Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.",
                hours: "11:30 - 15:00, 19:00 - 23:00",
                phoneNumber: "234 123 456",
                socials: ["https://facebook.com/otelheiro", "https://instagram.com/otelheiro"],
                address: "Rua do Telheiro, 123",
                menus: {
                    create: [
                        { name: "Menu do Dia", items: { create: [{ name: "Sopa", price: 2.50, description: "Sopa de peixe" }, { name: "Prato", price: 7.50 }, { name: "Sobremesa", price: 2.00 }] } },
                        { name: "Menu Especial", items: { create: [{ name: "Entrada", price: 5.00 }, { name: "Prato Principal", description: "Prato muito bom", price: 12.50 }, { name: "Sobremesa", price: 3.00 }] } },
                        { name: "Menu de Degustação", items: { create: [{ name: "Entrada", price: 7.50 }, { name: "Prato Principal", price: 15.00 }, { name: "Sobremesa", price: 4.00 }] } },
                        { name: "Bebidas", items: { create: [{ name: "Água", price: 1.00 }, { name: "Vinho", price: 5.00 }, { name: "Café", price: 1.50 }] } },
                    ]
                },
                amenities: ["Wi-Fi", "Estacionamento", "Takeaway", "Reservas", "MB Way"],
            }
        }))
    );
}

main()
    .then(async () => {
        await prisma.$disconnect();
    }).catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

