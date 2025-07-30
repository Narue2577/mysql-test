'use client'

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useActionState, useState } from "react";
import { saveFormDatasToDatabase } from '../registration/action'


export default function Registration(){

 {/*    const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Registration successful!');
                // Redirect to login page
                window.location.href = '/login';
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error(error);
            alert('Registration failed. Please try again.');
        }
            
    };*/
 
}
const initialState = {
  success: false,
  message: "",
};

const [state, formAction, pending] = useActionState(
    saveFormDatasToDatabase,
    initialState
  );
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        console.log(formData.get("name"));   
    }

    const [formInputs, setFormInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    });

    const handleChange = (e) => {
  const { name, value } = e.target;
  setFormInputs((prev) => ({ ...prev, [name]: value }));
};
    return(
        <>
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
            <h2 className="mb-6 text-2xl font-semibold text-center">Registration</h2>
                <form className="space-y-4" /*onSubmit={handleSubmit}*/ action={formAction} >
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">
                                            Full Name
                                            </label>
                       
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                           placeholder="Enter your name" name="fullName" value={formInputs.fullName} onChange={handleChange}
                        required/>
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
                  {/*  <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">
                                            Confirm Password
                                            </label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            // placeholder="Confirm your password" 
                        />
                    </div>
                     <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-600">
                                            I agree to the terms and conditions
                                            </label>
                    </div>*/}
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-700"
                         disabled={pending} >
                            Register
                        </button>
                        <p>{state?.message}</p>
                    </div>
                    <Link href="/auth/login" className="grid text-center justify-items-center" >Click to Login</Link>
                </form>
        </div>
    </div>
        </>
    );
}