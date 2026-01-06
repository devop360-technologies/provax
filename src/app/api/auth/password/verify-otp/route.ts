import { NextRequest, NextResponse } from "next/server";
import { verifyPasswordResetOtpAction } from "@/actions/password-reset-actions";

/**
 * POST /api/auth/password/verify-otp
 * Verify password reset OTP
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

    const result = await verifyPasswordResetOtpAction(email, otp);

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
    if (process.env.NODE_ENV === "development") console.error("Verify password reset OTP API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
