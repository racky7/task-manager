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
import { api } from "@/trpc/react";
// import { useToast } from "../ui/use-toast";

const signupConfig = z.object({
  name: z.string().trim().min(1, { message: "Fullname is required" }),
  email: z.string().email(),
  password: z.string().min(4, { message: "Password is required" }),
});

export default function SignupForm() {
  const router = useRouter();
  // const { toast } = useToast();
  const signUpUserMutation = api.user.signUpUser.useMutation({
    onSuccess: () => {
      // toast({
      //   title: "Sign Up Sucessfully",
      // });
      router.push("/login");
    },
    onError: (error) => {
      // toast({
      //   title: "Sign Up failed!",
      //   variant: "destructive",
      //   description: error.message,
      // });
    },
  });

  const form = useForm<z.infer<typeof signupConfig>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signupConfig),
  });

  const onSubmit = (values: z.infer<typeof signupConfig>) => {
    signUpUserMutation.mutate(values);
  };

  return (
    <CardWrapper
      headerLabel="Create a new account"
      backbuttonhref="/login"
      backbuttonlabel="Already have an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Your name" />
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
                    placeholder="your.email@gmail.com"
                    type="email"
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
                  <Input {...field} placeholder="*******" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            // disabled={
            //   signUpUserMutation.isPending || signUpUserMutation.isSuccess
            // }
            type="submit"
            className="w-full"
          >
            Create an Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
