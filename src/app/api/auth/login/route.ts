import { NextRequest, NextResponse } from "next/server";
import { loginAction, requestLoginOtpAction, loginWithOtpAction } from "@/actions/login-actions";

export const dynamic = 'force-dynamic';

/**
 * POST /api/auth/login
 * Login with email and password
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, redirectTo } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const result = await loginAction({ email, password }, redirectTo);

    if (!result.success) {
      return NextResponse.json(
        { 
          error: result.error || "Login failed",
          requiresVerification: result.requiresVerification
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        redirectUrl: result.redirectUrl
      },
      { status: 200 }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV === "development") console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
