"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Components imports
import * as ReactHookForm from "react-hook-form";
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
import { useToast } from "../hooks/use-toast";

// Database imports
import { db, auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";

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
  // Router initialized
  const router = useRouter();

  // Form initialization
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

  const onSubmit = async (data) => {
    // Clear the forms and prompt a shadcn confirmed message
    setIsLoading(true);
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Create a new document in the 'users' collection with the uid
      const userCollection = collection(db, "users");
      const userDoc = doc(userCollection, user.uid);

      // Save user data to Firestore
      await setDoc(userDoc, {
        email: data.email,
        username: data.username,
        createdAt: new Date().toISOString(),
      });

      // Show toast
      toast({
        title: "Account Created!",
        timeout: 1800,
      });

      // Delay redirection slightly
      setTimeout(() => {
        window.location.href = '/auth/login/email'
      }, 2000);

      form.reset();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast({
          title: "Email already in use.",
          description: 'Rerouting you to the sign in page',
          timeout: 1800,
        });
        // Delay before redirecting to login page
        setTimeout(() => {
          window.location.href = '/auth/login/email';
        }, 2000)
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper
      title="Welcome To CICERO!"
      label="Create an Account"
      backButtonHref="/auth/login/email"
      backButtonLabel="Already have an account? Login here with email."
      usernameLoginHref="/auth/login/username"
      usernameLoginLabel={"Already have an account? Login here with username."}
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