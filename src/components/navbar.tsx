import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function Navbar() {
    return (
        <header className="bg-gray-800">
            <div className="px-16">
                <div className="flex justify-between items-center py-4">
                    <div>
                        <Link href="/" className="text-white text-2xl font-bold">
                            <Image src="/ementacentral.png" alt="Ementa Central" width={200} height={50} />
                        </Link>
                    </div>
                    <nav className='flex gap-4'>
                        <Link href="/" className='text-white hover:underline'>Municípios</Link>
                        <Link href="/restaurantes" className='text-white hover:underline'>Restaurantes</Link>
                        <Link href="/sobre" className='text-white hover:underline'>Sobre</Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

