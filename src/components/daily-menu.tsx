'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DailyMenu({ menu }: { menu: string }) {
    const [isZoomed, setIsZoomed] = useState(false)

    const toggleZoom = () => setIsZoomed(!isZoomed)

    return (
        <div className="relative">
            <Card className="w-full max-h-[26rem] overflow-hidden">
                <CardContent className="p-0">
                    <button
                        onClick={toggleZoom}
                        className="w-full h-full focus:outline-none"
                        aria-label="Zoom in on daily menu"
                    >
                        <Image
                            src={menu}
                            alt="Daily Menu"
                            width={400}
                            height={300}
                            layout="responsive"
                            className="transition-transform duration-300 hover:scale-105"
                        />
                    </button>
                </CardContent>
            </Card>

            {isZoomed && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                    onClick={toggleZoom}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 text-white"
                        onClick={toggleZoom}
                        aria-label="Close full screen view"
                    >
                        <X className="h-6 w-6" />
                    </Button>
                    <Image
                        src={menu}
                        alt="Daily Menu"
                        width={1920}
                        height={1080}
                        layout="responsive"
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            )}
        </div>
    )
}
