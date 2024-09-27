'use client';

import React from "react";
import { Card, CardContent,CardHeader, CardFooter } from "../ui/card";
import AuthHeader from "@/components/auth/auth-header";
import BackButton from "@/components/auth/back-button";

const CardWrappper = ({children, title, label, backButtonLabel, backButtonHref}) => {
  return (
    <Card className='xl:w-1/4 md:w-1/2 drop-shadow-md'>
      <CardHeader>
        <AuthHeader label={label} title={title}/>
      </CardHeader>
      <CardContent>
      {children}
      </CardContent>

      <CardFooter>
        {/* <LoginWithUserName/> */}
        <BackButton label={backButtonLabel} href={backButtonHref}/>
      </CardFooter>
    </Card>
  )
}

export default CardWrappper