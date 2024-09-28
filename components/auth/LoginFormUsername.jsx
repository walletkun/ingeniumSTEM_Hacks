"use client";

import * as ReactHookForm from 'react-hook-form';
import { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
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
import { useToast } from '../hooks/use-toast';

import { auth, db } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginFormUsername = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = ReactHookForm.useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Query Firestore to get the user document by username
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where("username", "==", data.username));
      console.log('Created query');
      const querySnapshot = await getDocs(q);
      console.log('Got query snapshot');


      if (querySnapshot.empty) {
        toast({
          title: "Login failed",
          description: "User not found. Please check your username.",
          variant: 'destructive',
          duration: 1200,
        });
        setIsLoading(false);
        return;
      }

      const userDoc = querySnapshot.docs[0];

      if(!userDoc){
        toast({
          title: "Login failed",
          description: "User not found. Please check your username.",
          variant: 'destructive',
          duration: 1200,
        });
        return;
      }
      const userData = userDoc.data();

      //Get the user UID from the userDocument
      const userUID = userDoc.id;

      // Sign in with email and password
      await signInWithEmailAndPassword(auth, userData.email, data.password).then((userCredential) => {
        const signedInUserUID = userCredential.user.uid;
        
        if (signedInUserUID !== userUID) {
          toast({
            title: "Login failed",
            description: "Invalid username or password",
            variant: 'destructive',
            duration: 1200,
          });
        }else{
          toast({
            title: "Login successful",
            description: "You have been logged in successfully.",
            variant: 'success',
            duration: 1200,
          });
          form.reset();
          setTimeout(() => {
            router.push("/mainScreen");
          }, 2000);
        }
    });
    } catch (error) {
      console.error('Error logging in:', error);
      let errorMessage = "An error occurred during login";
      if (error.code === 'auth/user-not-found' || error.message === 'User not found') {
        errorMessage = "User not found. Please check your username.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Invalid username or password";
      }
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: 'destructive',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper
      label="Login"
      title="Welcome Back!"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account? Sign up Here."
      usernameLoginHref="/auth/login/email"
      usernameLoginLabel="Login with email"
    >
      <div className="p-4 md:p-6 lg:p-8">
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
          <Button type="submit" className='w-full' disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
      </div>
    </CardWrapper>
  );
};

export default LoginFormUsername;