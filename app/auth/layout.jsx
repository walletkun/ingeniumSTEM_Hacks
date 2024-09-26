import React from 'react'

const AuthLayout = ({children}) =>{
  return (
    <section className='w-full'>
        <div className='h-screen flex items-center justify-center text-center'>
            {children}
        </div>
    </section>
  )
}

export default AuthLayout