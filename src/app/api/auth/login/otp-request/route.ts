import { NextRequest, NextResponse } from "next/server";
import { requestLoginOtpAction } from "@/actions/login-actions";

export const dynamic = 'force-dynamic';

/**
 * POST /api/auth/login/otp-request
 * Request OTP for passwordless login
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const result = await requestLoginOtpAction(email);

    if (!result.success) {
      return NextResponse.json(
        { 
          error: result.error || "Failed to send login code",
          requiresVerification: result.requiresVerification
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        requiresOtp: result.requiresOtp
      },
      { status: 200 }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV === "development") console.error("Login OTP request API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
