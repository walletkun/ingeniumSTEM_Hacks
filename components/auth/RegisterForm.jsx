"use client";

//Components
import CardWrappper from "@/components/auth/card-wrapper";

const RegisterForm = () => {
  return (
    <CardWrappper 
    label="Create an Account" 
    title="Register"
    backButtonHref='/auth/login'
    backButtonLabel='Already haven an account? Login here.'>
        <div>

        </div>
    </CardWrappper>
  );
};

export default RegisterForm;
