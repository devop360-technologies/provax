import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { loginSchema } from "@/lib/zod-schemas";

class InvalidLoginError extends CredentialsSignin {
  code = "invalid_credentials";
}

// TODO: Update this to your Express backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const authConfig = {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Validate credentials using zod schema
          const result = loginSchema.safeParse(credentials);

          // If validation fails
          if (!result.success) {
            throw new Error("Invalid credentials");
          }

          // Call Express backend for authentication
          const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: result.data.email,
              password: result.data.password
            })
          });

          if (!response.ok) {
            throw new Error("Invalid credentials");
          }

          const user = await response.json();
          return user;
        } catch (error) {
          const message = error instanceof Error ? error.message : "Invalid credentials";
          throw new InvalidLoginError(message);
        }
      }
    })
  ]
} satisfies NextAuthConfig;
