"use client";

import * as ReactHookForm from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "@/components/auth/card-wrapper";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }).max(10, {
    message: "Username must not exceed 10 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).max(12, {
    message: "Password must not exceed 12 characters.",
  }),
});

const RegisterForm = () => {
  const form = ReactHookForm.useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <CardWrapper
      label="Login"
      title="Welcome Back!"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account? Sign up Here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage className='error-message'/>
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
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage className='error-message'/>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;