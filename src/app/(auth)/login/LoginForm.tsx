"use client";

import { signInUser } from '@/app/actions/authAction';
import { loginSchema, LoginSchema } from '@/schema/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import {toast} from "react-toastify"
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const router=useRouter()
  const { register, handleSubmit, formState: { errors,isSubmitting } } = useForm<LoginSchema>({
    resolver:zodResolver(loginSchema),
    mode:"onTouched"
  });

  const onSubmit = async(data: LoginSchema) => {
    const result=await signInUser(data)
    console.log(result);
    
  if (result.error) {
    toast.error(result.error); 
  } else {
    toast.success("Login Success ✅"); 
    router.push('/members');
    router.refresh()
  }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md border-2">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
        
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 text-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
