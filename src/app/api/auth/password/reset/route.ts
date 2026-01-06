import { NextRequest, NextResponse } from "next/server";
import { resetPasswordAction } from "@/actions/password-reset-actions";

/**
 * POST /api/auth/password/reset
 * Reset password with verified OTP
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp, newPassword } = body;

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { error: "Email, OTP, and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    const result = await resetPasswordAction(email, otp, newPassword);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Password reset failed" },
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
    if (process.env.NODE_ENV === "development") console.error("Reset password API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
