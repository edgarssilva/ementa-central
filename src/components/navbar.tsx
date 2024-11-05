'use client'

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false)

    addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
    })

    return (
        <header className={` transition-all fixed w-screen h-20 px-48 py-4 z-50 ${isScrolled ? "bg-primary-foreground text-black" : "bg-transparent text-white"}`}>
            <div className="flex justify-between items-center">
                <div>
                    <Link href="/" className=" text-lg font-bold flex items-center">
                        <Image src="/ementacentral.png" alt="Ementa Central" width={100} height={25} />
                        <h1>Ementa Central</h1>
                    </Link>
                </div>
                <nav className='flex gap-4'>
                    <Link href="/" className='hover:underline'>Municípios</Link>
                    <Link href="/restaurantes" className='hover:underline'>Restaurantes</Link>
                    <Link href="/sobre" className='hover:underline'>Sobre</Link>
                </nav>
            </div>
        </header>
    )
}

