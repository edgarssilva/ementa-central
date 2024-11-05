"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";


export const loginAction = async (_prev: undefined, data: FormData) => {
    const prisma = new PrismaClient();

    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const user = await prisma.user?.findUnique({
        where: { email }
    });

    if (!user)
        return { email, errors: { email: "Utilizador não encontrado" } };


    if (!(await Bun.password.verify(password, user.password)))
        return { email, errors: { password: "Password inválida" } };

    redirect("/dashboard");
};
