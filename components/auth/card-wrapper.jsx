"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import AuthHeader from "@/components/auth/auth-header";
import BackButton from "@/components/auth/back-button";

const CardWrappper = ({
  children,
  title,
  label,
  backButtonLabel,
  backButtonHref,
  usernameLoginHref,
  usernameLoginLabel,
}) => {
  return (
    <Card className="xl:w-1/4 md:w-1/2 drop-shadow-md">
      <CardHeader>
        <AuthHeader label={label} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>

      <CardFooter className="flex flex-wrap justify-between p-4 md:p-6 lg:p-8">
        {usernameLoginHref && usernameLoginLabel && (
          <BackButton label={usernameLoginLabel} href={usernameLoginHref} 
          className='mb-2 md:mb-0 md:mr-2'/>
        )}
        <BackButton label={backButtonLabel} href={backButtonHref} 
        className="mb-2 md:mb-0"/>
      </CardFooter>
    </Card>
  );
};

export default CardWrappper;
