"use client";
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginAction } from "@/actions/login"
import { useActionState } from "react";

export function LoginForm() {
    const [state, action, isPending] = useActionState(loginAction, undefined);
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Insira as suas credenciais para aceder à sua conta.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={action}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@exemplo.com"
                                defaultValue={state?.email}
                                className={state?.errors?.email && "border-2 border-red-300"}
                                required
                            />
                            {state?.errors?.email && (
                                <div className="text-red-500 text-sm">
                                    {state.errors.email}
                                </div>
                            )}

                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Esqueceu-se da password?
                                </Link>
                            </div>
                            <Input id="password" name="password" type="password" required className={state?.errors?.password && "border-2 border-red-300"} />
                            {state?.errors?.password && (
                                <div className="text-red-500 text-sm">
                                    {state.errors.password}
                                </div>
                            )}
                        </div>
                        <Button type="submit" disabled={!!isPending} className="w-full">
                            {isPending ? "A carregar..." : "Login"}
                        </Button>
                        {/* <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>*/}
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Ainda não tem conta?{" "}
                        <Link href="#" className="underline">
                            Registe-se
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
