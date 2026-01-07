import NextAuth from "next-auth";

import { appConfig } from "@/config";
import { authConfig } from "./auth-config";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const nextAuth = NextAuth({
  secret: appConfig.auth.secret,
  session: { strategy: "jwt" },
  jwt: { maxAge: appConfig.auth.maxAge },

  callbacks: {
    async session({ session, token }) {
      if (session && session.user) {
        session.user.id = token.sub!;
        session.user.name = token.name!;
        session.user.email = token.email!;
        session.user.image = token.image as string;
      }

      return session;
    },
    async jwt({ token, user, trigger }) {
      if (trigger === "update" && token?.sub) {
        // Fetch user from Express backend
        try {
          const response = await fetch(`${API_BASE_URL}/api/auth/user/${token.sub}`);
          if (response.ok) {
            const userData = await response.json();
            if (userData.data) {
              token.name = userData.data.name;
              token.image = userData.data.image;
            }
          }
        } catch {
          // Keep existing token data on error
        }
      }

      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }

      return token;
    }
  },

  pages: {
    signIn: appConfig.auth.login,
    signOut: appConfig.auth.afterSignout,
    newUser: appConfig.auth.newUser
  },

  theme: {
    colorScheme: "auto",
    brandColor: appConfig.colors.primary,
    logo:
      process.env.NODE_ENV === "production"
        ? `${appConfig.domainUrl}/logo.png`
        : `http://localhost:3000/logo.png`
  },

  ...authConfig
});

export const { handlers, signIn, signOut, auth } = nextAuth;
