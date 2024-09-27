"use client";


import {useFormStatus} from 'react-dom';
import * as ReactHookForm from 'react-hook-form';
import { useState } from 'react';


//Components imports
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
import { toast, useToast } from '../hooks/use-toast';


const loginSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 5 characters.",
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
      username: "",
      password: "",
    },
  });

  const onSubmit = async() => {
    setIsLoading(true);
    try{
      await new Promise((resolve) => setTimeout(resolve, 1500));

      //Retrieve user data from local storage
      const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

      if(!registeredUser){
        toast({
          title: "Login failed",
          description: "User not found, check your usernames and password",
        });

        setIsLoading(false);
        return;
      }
      
      //Retrieve username and password
      const enteredUsername = form.getValues("username");
      const enteredPassword = form.getValues("password");

      //Check if the username and password match
      if(enteredUsername === registeredUser.username && enteredPassword === registeredUser.password){
        toast({
          title: "Login successful",
          status: "success",
        });
        form.reset();
        router.push("/mainScreen");
      }
      else{
        toast({
          title: "Login failed",
          description: "Invalid username or password",
        });
      }
      }catch(e){
      toast({
        title: "Login failed",
        description: e.message,
      });
    }
    setIsLoading(false);
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
          <Button type="submit" className='w-full' disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;