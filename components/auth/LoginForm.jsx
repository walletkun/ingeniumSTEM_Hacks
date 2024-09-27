"use client";

import * as ReactHookForm from 'react-hook-form';
import { useState } from 'react';


//Components imports
import {z } from "zod";
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
import {useToast } from '../hooks/use-toast';

//Firebase imports
import {auth} from '@/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';


const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});


const LoginForm = () => {
  //Loading state
  const [isLoading, setIsLoading] = useState(false);
  //Toast hook
  const {toast} = useToast();
  //Router to navigate between pages
  const router = useRouter();


  //Form initialization
  const form = ReactHookForm.useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async(data) => {
    setIsLoading(true);
    try{
      //Simulate a login delay 
      await new Promise((resolve) => setTimeout(resolve, 1500));

      //Retrieve user data from firebase auth
      const user = await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Login successful",
        timeout: 1200,
      });
      form.reset();
      setTimeout(() => {
        router.push("/mainScreen");
      },1500);
    }catch(error){
      if(error.code === 'auth/user-not-found'){
        toast({
          title: "User not found, check your usernames and password",
          timeout: 1000,
        });
      }
      else if(error.code === 'auth/wrong-password'){
        toast({
          title: "Invalid username or password",
          timeout: 1000,
        });
      }
      else{
        console.log(error.message)
        toast({
          title: "Login failed",
          description: error.message,
          variant: 'destructive',
        });
      }
    }finally{
      setIsLoading(false);
    }
  //   try{
  //     await new Promise((resolve) => setTimeout(resolve, 1500));

  //     //Retrieve user data from local storage
  //     const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

  //     if(!registeredUser){
  //       toast({
  //         title: "Login failed",
  //         description: "User not found, check your usernames and password",
  //       });

  //       setIsLoading(false);
  //       return;
  //     }
      
  //     //Retrieve username and password
  //     const enteredUsername = form.getValues("username");
  //     const enteredPassword = form.getValues("password");

  //     //Check if the username and password match
  //     if(enteredUsername === registeredUser.username && enteredPassword === registeredUser.password){
  //       toast({
  //         title: "Login successful",
  //         timeout: 1200,
  //         status: "success",
  //       });
  //       form.reset();
  //       setTimeout(() => {
  //         router.push("/mainScreen")}, 1500);
  //     }
  //     else{
  //       toast({
  //         title: "Login failed",
  //         description: "Invalid username or password",
  //       })
  //     }
  //     }catch(e){
  //     toast({
  //       title: "Login Failed",
  //       description: e.message,
  //       variant: 'destructive',
  //     });
  //   }
  //   setIsLoading(false);
  // }
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
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
    </CardWrapper>
  );
};

export default LoginForm;