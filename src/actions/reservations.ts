'use server';

import { ReservationFormValues } from "@/components/restaurant-reservation";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();


export const makeReservationAction = async (values: ReservationFormValues) => {
    values.date.setHours(parseInt(values.time.split(":")[0]));
    values.date.setMinutes(parseInt(values.time.split(":")[1]));

    const reservation = await prisma.reservation.create({
        data: {
            restaurantId: values.restaurantId,
            phone: values.phoneNumber,
            date: values.date,
            partySize: parseInt(values.people),
        }
    });

    return reservation;
};
