import { SignIn } from '@clerk/nextjs'
import React from 'react'

function signInPage() {
  return (
    <main className='auth-page bg-blue-600'>
      <SignIn appearance={{
      }}/>
    </main>
  )
}

export default signInPage