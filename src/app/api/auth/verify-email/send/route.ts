import { NextRequest, NextResponse } from "next/server";
import { 
  sendEmailVerificationOtpAction
} from "@/actions/email-verification-otp-actions";

/**
 * POST /api/auth/verify-email/send
 * Send email verification OTP
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

    const result = await sendEmailVerificationOtpAction(email);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send verification code" },
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
    if (process.env.NODE_ENV === "development") console.error("Send verification OTP API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
