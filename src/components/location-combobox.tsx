'use client';

import React, { useCallback, useEffect } from 'react'
import { Popover, PopoverContent } from "@/components/ui/popover"
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from './ui/button'
import { Zone } from '@prisma/client'
import { Check, ChevronsDown, ChevronsUp, ChevronsUpDown, MapPin } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import slugify from 'slugify';


export default function LocationComboBox({ zones }: { zones: Zone[] }) {
    const [open, setOpen] = React.useState(false)

    const { replace } = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const currentZone = zones.find((zone) => slugify(zone.name) === searchParams.get('municipio'))


    //TODO: If on mobile use a drawer instead of a popover

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    <div className='flex gap-2'>
                        <MapPin className="w-4 h-4 shrink-0 opacity-50" />
                        {currentZone ? currentZone.name : "Município"}
                    </div>
                    <ChevronsUpDown className="ml-2 w-4 h-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder='Pesquisar municípios...' />
                    <CommandList>
                        <CommandEmpty>Nenum município encontrado.</CommandEmpty>
                        <CommandGroup>
                            {zones.map((zone) => (
                                <CommandItem
                                    key={zone.id}
                                    value={zone.name}
                                    className="w-full text-left"
                                    onSelect={(current) => {
                                        const params = new URLSearchParams(searchParams)

                                        if (current == currentZone?.name) {
                                            params.delete("municipio")
                                        } else {
                                            params.set("municipio", slugify(zone.name))
                                        }

                                        replace(`${pathName}?${params.toString()}`)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "w-4 h-4 mr-2",
                                            currentZone?.id === zone.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {zone.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>

                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

