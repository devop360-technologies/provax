import { NextRequest, NextResponse } from "next/server";
import { authRegisterAction, resendVerificationOtpAction } from "@/actions/register-actions";

/**
 * POST /api/auth/register
 * Register a new user and send email verification OTP
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const result = await authRegisterAction({ name, email, password, confirmPassword: password });

    if (result.status === "error") {
      return NextResponse.json(
        { error: result.message || "Registration failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        requiresVerification: result.requiresVerification
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
