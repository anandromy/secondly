"use client"

import { useForm } from "react-hook-form"
import { CardWrapper } from "./cardWrapper"
import { SignupSchema } from "@/schemas"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import { signup } from "@/actions/signup"
import { FormSuccess } from "../form-success"
import { FormError } from "../form-error"


export const SignupForm = () => {
    const [ isPending, startTransition ] = useTransition()
    const [ error, setError ] = useState<string | undefined>("")
    const [ success, setSuccess ] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof SignupSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            signup(values)
            .then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        })
    }
    return(
        <CardWrapper
            backButtonHref="/sign-in"
            backButtonLabel="Already have an account?"
            headerLabel="Create your account"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
                <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="John Doe"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="johndoe@example.com"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="12345678"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button disabled={isPending} type="submit" className="w-full">Sign up</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}