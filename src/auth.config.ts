import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./schema/loginSchema";
import { getUserByEmail } from "./app/actions/authAction";
import { compare } from "bcryptjs";

export default {
  providers: [
    Credentials({
      name: "credentials",
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);

        if (!validated.success) {
          console.log("Validation failed:", validated.error);
          return null;
        }

        const { email, password } = validated.data;
        const user = await getUserByEmail(email);

        if (!user) {
          console.log("User not found");
          return null;
        }

        const isPasswordValid = await compare(password, user.passwordHash);
        if (!isPasswordValid) {
          console.log("Invalid password");
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login", // Optional: your custom login page
  },
} satisfies NextAuthConfig;
