import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

/**
 * Next.js Middleware
 *
 * LIMITATIONS:
 * - Only handles authentication of pages and api routes. Even server actions authentication too.
 * - Cannot reliably check subscription status like (hasAccess) via session
 * - Cannot update the session data when webhooks modify subscription status
 * - Deployment complications on non-Vercel platforms
 */

// Uncomment the code If you still wanna use it.

export default auth((req) => {
  // const isLoggedIn = !!req.auth;
  // const pathname = req.nextUrl.pathname;

  // // Protected routes that require logged in user
  // const isPrivate = pathname.startsWith("/dashboard");

  // // Public / Authentication routes (login/signup pages)
  // const isPublic = pathname.startsWith("/login") || pathname.startsWith("/register");

  // // Redirect unauthenticated users to login
  // if (isPrivate && !isLoggedIn) {
  //   const url = new URL("/login", req.nextUrl);
  //   url.searchParams.set("callbackUrl", pathname);
  //   return NextResponse.redirect(url);
  // }

  // // Redirect logged in users away from authentication pages (login/register)
  // if (isLoggedIn && isPublic) {
  //   return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  // }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/data|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
