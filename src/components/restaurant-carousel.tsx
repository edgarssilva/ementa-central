'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from './ui/carousel';

export default function RestaurantCarousel({ restaurant }: { restaurant: any }) {
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!api) return

        const interval = setInterval(() => {
            api.scrollNext()
        }, 5000) // Change slide every 5 seconds

        return () => clearInterval(interval)
    }, [api])

    return (
        <Carousel className="w-full"
            setApi={setApi}
            opts={{
                loop: true,
            }}>
            <CarouselContent>
                {restaurant.images.map((image, index) => (
                    <CarouselItem key={index}>
                        <Image
                            src={image}
                            alt={`${restaurant.name} - Image ${index + 1}`}
                            width={600}
                            height={400}
                            className="w-full object-cover h-64 sm:h-80 md:h-96"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='m-8' />
            <CarouselNext className='mr-8' />
        </Carousel>
    )
}

