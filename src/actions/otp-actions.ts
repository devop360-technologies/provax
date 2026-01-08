"use server";

import crypto from "node:crypto";
import { appConfig } from "@/config";
import { prisma } from "@/lib/prisma-mock";
import { sendSmtpEmail } from "@/lib/smtp-mailer";
import { OtpEmail } from "@/components/mails/otp-email";
import { render } from "@react-email/components";

export type OtpType = "email_verification" | "password_reset" | "login";

interface OtpResult {
  success: boolean;
  error?: string;
  message?: string;
}

/**
 * Generate a 6-digit OTP code
 */
function generateOtpCode(): string {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Create and send OTP to user's email
 */
export async function sendOtpAction(
  email: string,
  type: OtpType
): Promise<OtpResult> {
  try {
    // Validate email
    if (!email || !email.includes("@")) {
      return {
        success: false,
        error: "Invalid email address"
      };
    }

    // Check if user exists (except for registration)
    if (type !== "email_verification") {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, name: true }
      });

      if (!user) {
        return {
          success: false,
          error: "No account found with this email address"
        };
      }
    }

    // Delete any existing OTP tokens for this email and type
    await prisma.otpToken.deleteMany({
      where: {
        email,
        type
      }
    });

    // Generate new OTP
    const otp = generateOtpCode();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in database
    await prisma.otpToken.create({
      data: {
        email,
        otp,
        type,
        expires,
        verified: false
      }
    });

    // Get user name for email personalization
    const user = await prisma.user.findUnique({
      where: { email },
      select: { name: true }
    });

    // Determine email subject and content based on type
    let subject = "";
    let message = "";

    switch (type) {
      case "email_verification":
        subject = "Verify Your Email Address";
        message = "Use this code to verify your email address";
        break;
      case "password_reset":
        subject = "Reset Your Password";
        message = "Use this code to reset your password";
        break;
      case "login":
        subject = "Your Login Code";
        message = "Use this code to log in to your account";
        break;
    }

    // Render the email template
    const html = await render(OtpEmail({
      otp,
      name: user?.name || "there",
      message,
      expiryMinutes: 10
    }));

    // Send the email via SMTP
    const emailResult = await sendSmtpEmail({
      to: email,
      subject: `${subject} - ${appConfig.appName}`,
      html
    });

    if (!emailResult.success) {
      return {
        success: false,
        error: emailResult.error || "Failed to send OTP email"
      };
    }

    return {
      success: true,
      message: "OTP sent successfully to your email"
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Send OTP error:", error);
    }
    return {
      success: false,
      error: "Failed to send OTP. Please try again."
    };
  }
}

/**
 * Verify OTP code
 */
export async function verifyOtpAction(
  email: string,
  otp: string,
  type: OtpType
): Promise<OtpResult> {
  try {
    // Find the OTP token
    const otpToken = await prisma.otpToken.findFirst({
      where: {
        email,
        otp,
        type,
        verified: false
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    if (!otpToken) {
      return {
        success: false,
        error: "Invalid or expired OTP code"
      };
    }

    // Check if OTP has expired
    if (new Date() > otpToken.expires) {
      // Delete expired OTP
      await prisma.otpToken.delete({
        where: { id: otpToken.id }
      });

      return {
        success: false,
        error: "OTP has expired. Please request a new code."
      };
    }

    // Mark OTP as verified
    await prisma.otpToken.update({
      where: { id: otpToken.id },
      data: { verified: true }
    });

    // If email verification, update user's emailVerified field
    if (type === "email_verification") {
      await prisma.user.update({
        where: { email },
        data: { emailVerified: new Date() }
      });
    }

    return {
      success: true,
      message: "OTP verified successfully"
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Verify OTP error:", error);
    }
    return {
      success: false,
      error: "Failed to verify OTP. Please try again."
    };
  }
}

/**
 * Delete verified OTP token after use
 */
export async function deleteVerifiedOtpAction(
  email: string,
  type: OtpType
): Promise<void> {
  try {
    await prisma.otpToken.deleteMany({
      where: {
        email,
        type,
        verified: true
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Delete verified OTP error:", error);
    }
  }
}

/**
 * Clean up expired OTP tokens (should be run periodically)
 */
export async function cleanupExpiredOtpsAction(): Promise<void> {
  try {
    await prisma.otpToken.deleteMany({
      where: {
        expires: {
          lt: new Date()
        }
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Cleanup expired OTPs error:", error);
    }
  }
}
