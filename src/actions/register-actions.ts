"use server";

import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/zod-schemas";
import { sendOtpAction } from "./otp-actions";

interface RegisterResult {
  status: "success" | "error";
  message?: string;
  errors?: any;
  requiresVerification?: boolean;
}

export async function authRegisterAction(data: RegisterSchema): Promise<RegisterResult> {
  try {
    const validationResult = registerSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        status: "error",
        errors: validationResult.error.flatten()
      };
    }

    const { email, password, name } = validationResult.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, emailVerified: true }
    });

    if (existingUser) {
      return { 
        status: "error", 
        message: "User already exists with this email" 
      };
    }

    const hashedPassword = await hashPassword(password);

    // Create user without email verification
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: null // Will be set after OTP verification
      }
    });

    // Send OTP for email verification
    const otpResult = await sendOtpAction(email, "email_verification");

    if (!otpResult.success) {
      // User created but OTP failed - they can resend later
      return {
        status: "success",
        message: "User registered successfully. Please verify your email.",
        requiresVerification: true
      };
    }

    return {
      status: "success",
      message: "Registration successful! Please check your email for verification code.",
      requiresVerification: true
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to register user";
    return { status: "error", message };
  }
}

/**
 * Resend email verification OTP
 */
export async function resendVerificationOtpAction(email: string): Promise<RegisterResult> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, emailVerified: true }
    });

    if (!user) {
      return {
        status: "error",
        message: "User not found"
      };
    }

    if (user.emailVerified) {
      return {
        status: "error",
        message: "Email is already verified"
      };
    }

    const otpResult = await sendOtpAction(email, "email_verification");

    if (!otpResult.success) {
      return {
        status: "error",
        message: otpResult.error || "Failed to send verification code"
      };
    }

    return {
      status: "success",
      message: "Verification code sent to your email"
    };
  } catch (error) {
    console.error("Resend verification OTP error:", error);
    return {
      status: "error",
      message: "Failed to resend verification code"
    };
  }
}
