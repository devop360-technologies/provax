"use server";

import { prisma } from "@/lib/prisma-mock";
import { verifyOtpAction, sendOtpAction, deleteVerifiedOtpAction } from "./otp-actions";

interface VerificationResult {
  success: boolean;
  error?: string;
  message?: string;
}

/**
 * Send email verification OTP
 */
export async function sendEmailVerificationOtpAction(
  email: string
): Promise<VerificationResult> {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, emailVerified: true }
    });

    if (!user) {
      return {
        success: false,
        error: "User not found"
      };
    }

    if (user.emailVerified) {
      return {
        success: false,
        error: "Email is already verified"
      };
    }

    // Send OTP
    const result = await sendOtpAction(email, "email_verification");
    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV === "development") console.error("Send email verification OTP error:", error);
    return {
      success: false,
      error: "Failed to send verification code"
    };
  }
}

/**
 * Verify email with OTP
 */
export async function verifyEmailWithOtpAction(
  email: string,
  otp: string
): Promise<VerificationResult> {
  try {
    // Verify OTP
    const result = await verifyOtpAction(email, otp, "email_verification");

    if (!result.success) {
      return result;
    }

    // Update user's emailVerified field
    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: new Date()
      }
    });

    // Delete the verified OTP
    await deleteVerifiedOtpAction(email, "email_verification");

    return {
      success: true,
      message: "Email verified successfully"
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV === "development") console.error("Verify email with OTP error:", error);
    return {
      success: false,
      error: "Failed to verify email"
    };
  }
}

/**
 * Check if email is verified
 */
export async function checkEmailVerificationAction(
  email: string
): Promise<{ verified: boolean; exists: boolean }> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { emailVerified: true }
    });

    if (!user) {
      return { verified: false, exists: false };
    }

    return {
      verified: !!user.emailVerified,
      exists: true
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV === "development") console.error("Check email verification error:", error);
    return { verified: false, exists: false };
  }
}
