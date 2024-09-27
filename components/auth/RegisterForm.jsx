"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
//Components imports
import * as ReactHookForm from "react-hook-form";
import { promise, z } from "zod";
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
import { useToast } from "../hooks/use-toast";

const formSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    username: z
      .string()
      .min(5, {
        message: "Username must be at least 5 characters.",
      })
      .max(10, {
        message: "Username must not exceed 10 characters.",
      }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .max(12, {
        message: "Password must not exceed 12 characters.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  //Router intialized
  const router = useRouter();

  //Form initialization
  const form = ReactHookForm.useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async () => {
    //Clear the forms and prompt a shadcn confirmed message
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      //Check existing User
      const existingUser = localStorage.getItem("registeredUser");
      if(existingUser){
        const existingUserData = JSON.parse(existingUser);
        if(existingUserData.email === form.getValues("email") || existingUserData.username === form.getValues("username")){
          toast({
            title: "User with the same email or username already exists.",
            timeout: "1000",
            variant: "destructive",
          });
          setIsLoading(false);
          setTimeout(() => {
            router.push("/auth/login");
          }, 1500);
        }
      }
      else{
      //Saves user information into localData for testing purpose
      const userData = {
        email: form.getValues("email"),
        username: form.getValues("username"),
        password: form.getValues("password"),
      };

      localStorage.setItem("registeredUser", JSON.stringify(userData));
      toast({
        title: "Account Created!",
      });
      form.reset();
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description:
          "There was a problem creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <CardWrapper
      title="Welcome To CICERO!"
      label="Create an Account"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account? Login here."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md mx-auto"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="johndoe@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="error-message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe123" {...field} />
                  </FormControl>
                  <FormMessage className="error-message" />
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
                    <Input type="password" placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage className="error-message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage className="error-message" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Registering.." : "Register"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
