"use client"

import { useForm } from "react-hook-form"
import { CardWrapper } from "./cardWrapper"
import { SignupSchema } from "@/schemas"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export const SignupForm = () => {
    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="johndoe@example.com"
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
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Sign up</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}