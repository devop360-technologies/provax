import { NextRequest, NextResponse } from "next/server";
import { loginWithOtpAction } from "@/actions/login-actions";

export const dynamic = 'force-dynamic';

/**
 * POST /api/auth/login/otp-verify
 * Login with OTP code
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp, redirectTo } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const result = await loginWithOtpAction(email, otp, redirectTo);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Login failed" },
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
    if (process.env.NODE_ENV === "development") console.error("Login with OTP API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
