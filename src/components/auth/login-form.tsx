"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
// import { useToast } from "../ui/use-toast";

const loginConfig = z.object({
  email: z.string().email(),
  password: z.string().min(4, { message: "Password is required" }),
});

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const { toast } = useToast();

  const form = useForm<z.infer<typeof loginConfig>>({
    defaultValues: {
      email: "test.account@gmail.com",
      password: "Abc123",
    },
    resolver: zodResolver(loginConfig),
  });

  const onSubmit = async (values: z.infer<typeof loginConfig>) => {
    setLoading(true);
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    console.log(result);
    if (result?.error) {
      setLoading(false);
      console.error(result.error);
    } else {
      router.push("/");
    }
    // loginMutation.mutate(values);
  };

  return (
    <CardWrapper
      headerLabel="Sign in to your account"
      backbuttonhref="/signup"
      backbuttonlabel="Don't have an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="your.email@gmail.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="*******" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button disabled={loading} type="submit" className="w-full">
            Log in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
