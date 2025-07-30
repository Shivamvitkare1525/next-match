"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schema/loginSchema";
import { prisma } from "@/schema/prisma";
import { registerSchema, RegisterSchema } from "@/schema/registerSchema";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";


export async function signInUser(data: LoginSchema) {
  const result = await signIn('credentials', {
    email: data.email,
    password: data.password,
    redirect: false,
  });

  if (result?.error) {
    return { error: "Invalid credentials" };
  }

  return { data: "Logged IN" };
}




export async function registerUser(data: RegisterSchema) {
 try {
     const validated = registerSchema.safeParse(data);

  if (!validated.success) {
    return { error: validated.error };
  }

  const { name, email, password } = validated.data;

  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) return { error: "User already exists" };

  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashPassword, 
    },
  });
 } catch (error) {
    console.log("Something went wrong",error);
    
 }
}


export async function getUserByEmail(email:string){
return prisma.user.findUnique({where:{email}})
}


export async function getUserById(id:string){
return prisma.user.findUnique({where:{id}})
}

