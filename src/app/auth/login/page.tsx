
 // const router = useRouter()
 
/*  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
 
    if (response.ok) {
      router.push('/profile')
    } else {
      // Handle errors
    }
  }*/

 'use client'

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { loginUser } from './actione';

export default function Login() {
  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction, pending] = useActionState(loginUser, initialState);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <div className="relative flex flex-col items-center justify-center w-full">
          <Image
            src="/swuEng.png"
            width={150}
            height={150}
            alt="SWU Logo"
          />
        </div>
        <h2 className="mb-6 text-2xl font-semibold text-center">Login</h2>
        
        <form className="space-y-4" action={formAction}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              name="email"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              name="password"
              required
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-700 disabled:opacity-50"
              disabled={pending}
            >
              {pending ? 'Logging in...' : 'Login'}
            </button>
            {state?.message && (
              <p className={`mt-2 text-sm ${state.success ? 'text-green-600' : 'text-red-600'}`}>
                {state.message}
              </p>
            )}
          </div>
          
          <Link href="/auth/registration" className="grid text-center justify-items-center text-indigo-600 hover:text-indigo-800">
            Don't have an account? Register here
          </Link>
        </form>
      </div>
    </div>
  );
}