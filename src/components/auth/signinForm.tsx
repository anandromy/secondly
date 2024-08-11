"use client"

import { CardWrapper } from "@/components/auth/cardWrapper";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { SigninSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormSuccess } from "@/components/form-success";
import { signin } from "@/actions/signin";
import { useState, useTransition } from "react";
import { FormError } from "../form-error";

export function SignInForm() {
  const [ isPending, startTransition ] = useTransition()

  const [ error, setError ] = useState<string | undefined>("")
  // const [ success, setSuccess ] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof SigninSchema>) => {
    // Cleaning error and success messages everytime user hits submit
    setError("")
    // setSuccess("")


    startTransition(() => {
      signin(values)
        .then((data) => {
          setError(data?.error)
          // setSuccess(data.success)
        })
    })
  }


  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/sign-up"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={( { field }) => (
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
              render={( { field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                     {...field} 
                     placeholder="123456" 
                     type="password" 
                     disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          {/* <FormSuccess message={success} /> */}
          <Button disabled={isPending} type="submit" className="w-full">
            Sign in
          </Button>
        </form>  
      </Form>
    </CardWrapper>
  )
} 