"use server";

import { hashPassword, verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { sendOtpAction, verifyOtpAction, deleteVerifiedOtpAction } from "./otp-actions";

interface PasswordResetResult {
  success: boolean;
  error?: string;
  message?: string;
}

/**
 * Request password reset - sends OTP to email
 */
export async function requestPasswordResetAction(
  email: string
): Promise<PasswordResetResult> {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    if (!user) {
      return {
        success: false,
        error: "No account found with this email address"
      };
    }

    // Send OTP
    const result = await sendOtpAction(email, "password_reset");
    return result;
  } catch (error) {
    console.error("Request password reset error:", error);
    return {
      success: false,
      error: "Failed to process password reset request"
    };
  }
}

/**
 * Verify OTP for password reset
 */
export async function verifyPasswordResetOtpAction(
  email: string,
  otp: string
): Promise<PasswordResetResult> {
  try {
    const result = await verifyOtpAction(email, otp, "password_reset");
    return result;
  } catch (error) {
    console.error("Verify password reset OTP error:", error);
    return {
      success: false,
      error: "Failed to verify OTP"
    };
  }
}

/**
 * Reset password after OTP verification
 */
export async function resetPasswordAction(
  email: string,
  otp: string,
  newPassword: string
): Promise<PasswordResetResult> {
  try {
    // Validate password strength
    if (newPassword.length < 8) {
      return {
        success: false,
        error: "Password must be at least 8 characters long"
      };
    }

    // Verify OTP is valid and verified
    const otpToken = await prisma.otpToken.findFirst({
      where: {
        email,
        otp,
        type: "password_reset",
        verified: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    if (!otpToken) {
      return {
        success: false,
        error: "Invalid or unverified OTP. Please verify your OTP first."
      };
    }

    // Check if OTP has expired
    if (new Date() > otpToken.expires) {
      await prisma.otpToken.delete({
        where: { id: otpToken.id }
      });

      return {
        success: false,
        error: "OTP has expired. Please request a new code."
      };
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true }
    });

    if (!user) {
      return {
        success: false,
        error: "User not found"
      };
    }

    // Check if new password is same as old password
    if (user.password) {
      const isSamePassword = await verifyPassword(newPassword, user.password);
      if (isSamePassword) {
        return {
          success: false,
          error: "New password cannot be the same as your current password"
        };
      }
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });

    // Delete the used OTP token
    await deleteVerifiedOtpAction(email, "password_reset");

    return {
      success: true,
      message: "Password reset successfully"
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      success: false,
      error: "Failed to reset password"
    };
  }
}
