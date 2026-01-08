"use server";

import crypto from "node:crypto";

import { appConfig } from "@/config";
import { prisma } from "@/lib/prisma-mock";
import { renderEmail, sendEmail } from "@/lib/resend";

import { EmailVerification } from "@/components/mails/email-verification";

export async function generateVerificationToken(email: string): Promise<string> {
  // Generate a secure random token
  const token = crypto.randomBytes(32).toString("hex");

  // Set expiration to 24 hours from now
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Delete any existing verification tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { identifier: email }
  });

  // Create new verification token
  await prisma.verificationToken.create({
    data: { identifier: email, token, expires }
  });

  return token;
}

export async function sendVerificationEmail(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if user exists and is not already verified
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        emailVerified: true
      }
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

    // Generate new token to send user a new verification email
    const token = await generateVerificationToken(email);

    if (!token) {
      return {
        success: false,
        error: "Failed to generate verification token"
      };
    }

    // Format the verification url
    const verificationUrl = `${appConfig.domainUrl}/verify-email?token=${token}`;

    // Render the email template
    const html = await renderEmail(EmailVerification, {
      verificationUrl,
      name: user.name || "there"
    });

    // Send the email using resend
    const result = await sendEmail({
      html,
      to: email,
      subject: `Verify your email address - ${appConfig.appName}`
    });

    if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }

    return { success: true };
  } catch (error) {
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV === "development") console.error("Send verification email error:", error);
    return {
      success: false,
      error: "Failed to send verification email"
    };
  }
}
