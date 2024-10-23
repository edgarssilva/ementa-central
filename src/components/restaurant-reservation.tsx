"use client"

import { useState } from "react"
import { CalendarIcon, Clock } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils"

const formSchema = z.object({
    phoneNumber: z.string().regex(/^\d{9}$/, {
        message: "O número de telefone deve ter 9 dígitos",
    }),
    date: z.date({
        required_error: "A data é obrigatória",
    }),
    time: z.string({
        required_error: "A hora é obrigatória",
    }),
    people: z.string({
        required_error: "O número de pessoas é obrigatório",
    }),
})

export default function ReservationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: "",
            date: new Date(),
            time: "12:00",
            people: "1",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            toast({
                title: "Reserva Submetida!",
                description: `Tlm: ${values.phoneNumber}, Data: ${values.date.toDateString()}, Hora: ${values.time}, Nº: ${values.people}\nAguarde pela confirmação.`,
            })
            form.reset()
        }, 2000)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Número de Telemóvel</FormLabel>
                            <FormControl>
                                <Input placeholder="911222333" {...field} />
                            </FormControl>
                            <FormDescription>
                                Introduza o seu número de telemóvel.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Data</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                field.value.toDateString()
                                            ) : (
                                                <span>Escolha uma data</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Escolha uma data para a sua reserva.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecionar a hora" />
                                        <Clock className="ml-auto h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {[...Array(9)].map((_, i) => {
                                        const hour = i + 12
                                        return (
                                            <SelectItem key={hour} value={`${hour}:00`}>
                                                {`${hour}:00`}
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                            <FormDescription>Escolha uma hora para a sua reserva.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="people"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Número de Pessoas</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Número de pessoas" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {[...Array(10)].map((_, i) => (
                                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                                            {i + 1}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Selecione o número de pessoas para a sua reserva.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "A Submeter..." : "Marcar Reserva"}
                </Button>
            </form>
        </Form>
    )
}
