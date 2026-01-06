import { NextRequest, NextResponse } from "next/server";
import { verifyEmailWithOtpAction } from "@/actions/email-verification-otp-actions";

/**
 * POST /api/auth/verify-email/verify
 * Verify email with OTP code
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const result = await verifyEmailWithOtpAction(email, otp);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Verification failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message
      },
      { status: 200 }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV === "development") console.error("Verify email OTP API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
