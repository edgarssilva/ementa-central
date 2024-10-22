import Link from 'next/link'
import React from 'react'
import { MapPin } from 'lucide-react'

export default function Navbar() {
    return (
        <nav className="bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div>
                        <Link href="/" className="text-white text-2xl font-bold">Ementa
                            <MapPin size={24} className="inline-block" />
                            Central</Link>
                    </div>
                    <div className='flex gap-4'>
                        <Link href="/" className='text-white hover:underline'>Localidades</Link>
                        <Link href="/restaurantes" className='text-white hover:underline'>Restaurantes</Link>
                        <Link href="/sobre" className='text-white hover:underline'>Sobre</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

