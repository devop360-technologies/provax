import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js Middleware
 *
 * LIMITATIONS:
 * - Only handles authentication of pages and api routes. Even server actions authentication too.
 * - Cannot reliably check subscription status like (hasAccess) via session
 * - Cannot update the session data when webhooks modify subscription status
 * - Deployment complications on non-Vercel platforms
 * 
 * NOTE: Prisma cannot be used in Edge runtime middleware.
 * Authentication is handled by NextAuth.js in API routes instead.
 */

export function middleware(request: NextRequest) {
  // Simply pass through - auth is handled by NextAuth.js
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/data|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
