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

export default auth(() => {
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/data|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
