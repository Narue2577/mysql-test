"use client"

import Image from "next/image"
import Link from "next/link"
import { FormEvent, useState } from "react";

import { useEffect} from 'react'
//import { useRouter } from 'next/navigation'
 
export default function Login() {
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

 useEffect(() => {
        const fetchData = async () => {
          try{
            const data = await fetch('/api/login')
            const response = data.json()
            console.log(response)
          }catch(error)
          {
            console.log(error)
          }
        }
        fetchData()
    }, [])

     const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    });

    const handleChange = (e) => {
  const { name, value } = e.target;
  setFormInputs((prev) => ({ ...prev, [name]: value }));
};
  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <div className="relative flex flex-col items-center justify-center w-full ">
          <Image
                          src="/swuEng.png"
                          width={150}
                          height={150}
                          alt="SWU Logo"
                      />
          </div>
            <h2 className="mb-6 text-2xl font-semibold text-center">Login</h2>
                <form className="space-y-4">
                     <div>
                
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">
                                            Email Address
                                            </label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                         placeholder="Enter your email" name="email" value={formInputs.email} onChange={handleChange}
                        required/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">
                                            Password
                                            </label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your password"  name="password" value={formInputs.password} onChange={handleChange}
                        required/>
                    </div>
                    <div>
                        
                    </div>
                    {/* 
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-600">
                                            I agree to the terms and conditions
                                            </label>
                    </div>
                    */}
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-700"
                        >
                            Login
                        </button>
                    </div>
                    <Link href="/auth/registration" className="grid text-center justify-items-center" >Click to Register</Link>
                </form>
        </div>
    </div>
  )
}