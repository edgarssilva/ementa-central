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
import { makeReservationAction } from "@/actions/reservations"

const formSchema = z.object({
    restaurantId: z.string(),
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

export type ReservationFormValues = z.infer<typeof formSchema>;

export default function ReservationForm({ restaurantId }: { restaurantId: string }) {
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

    async function onSubmit(values: ReservationFormValues) {
        setIsSubmitting(true)
        try {
            console.log(values)
            const reservation = await makeReservationAction(values);
            console.log(reservation)
            toast({
                title: "Reserva Submetida!",
                description: `Tlm: ${reservation.phone}, Data: ${reservation.date.toISOString()}, NºPessoas: ${reservation.partySize}`,
            });

            form.reset();
        } catch (error: any) {
            toast({
                title: "Erro ao submeter a reserva",
                description: "Por favor, tente novamente.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <input type="hidden" {...form.register("restaurantId")} value={restaurantId} />

                <div className="flex space-x-4">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Data</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? field.value.toLocaleDateString('pt-PT') : <span>Escolha uma data</span>}
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Hora</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a hora" />
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex space-x-4">
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Número de Telefone</FormLabel>
                                <FormControl>
                                    <Input placeholder="912345678" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="people"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Número de Pessoas</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o número de pessoas" />
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "A submeter..." : "Fazer Reserva"}
                </Button>
            </form>
        </Form>
    )
}
