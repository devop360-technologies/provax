import { NextRequest, NextResponse } from "next/server";
import { 
  requestPasswordResetAction,
  verifyPasswordResetOtpAction,
  resetPasswordAction 
} from "@/actions/password-reset-actions";

/**
 * POST /api/auth/password/reset-request
 * Request password reset OTP
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

    const result = await requestPasswordResetAction(email);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send reset code" },
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
    if (process.env.NODE_ENV === "development") console.error("Password reset request API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
