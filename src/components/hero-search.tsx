import { cn } from '@/lib/utils'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { MapPin, SearchIcon } from 'lucide-react'

export default function HeroSearch({ className }: { className?: string }) {
    return (
        <div className={cn('w-full p-1 bg-white flex gap-4 rounded-md', className)}>
            <div className='flex basis-2/6 h-14 bg-white'>
                <input placeholder="Município que procuras..." className="w-full h-full pl-4 text-primary font-medium focus:outline-none " />
                <SearchIcon className="h-14 w-6 text-primary/75" />
            </div>
            <div className='flex-1 flex h-14 bg-white border-l-2 border-l-muted'>
                <input placeholder="Restaurante..." className="w-full h-full pl-6 text-primary font-medium focus:outline-none " />
                <MapPin className="h-14 w-6 text-primary/75" />
            </div>
            <Button className="h-14 w-52 font-semibold">Procurar</Button>
        </div>
    )
}

