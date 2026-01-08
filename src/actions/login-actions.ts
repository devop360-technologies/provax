"use server";

import { signIn } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma-mock";
import { loginSchema, LoginSchema } from "@/lib/zod-schemas";
import { sendOtpAction, verifyOtpAction, deleteVerifiedOtpAction } from "./otp-actions";
import { appConfig } from "@/config";

interface LoginResult {
  success: boolean;
  error?: string;
  message?: string;
  requiresOtp?: boolean;
  requiresVerification?: boolean;
  redirectUrl?: string;
}

/**
 * Login with email and password
 */
export async function loginAction(
  data: LoginSchema,
  redirectTo?: string
): Promise<LoginResult> {
  try {
    const validationResult = loginSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        error: "Invalid email or password"
      };
    }

    const { email, password } = validationResult.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        password: true,
        emailVerified: true,
        name: true
      }
    });

    if (!user || !user.password) {
      return {
        success: false,
        error: "Invalid email or password"
      };
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return {
        success: false,
        error: "Invalid email or password"
      };
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return {
        success: false,
        error: "Please verify your email before logging in",
        requiresVerification: true
      };
    }

    // Sign in using NextAuth
    const result = await signIn("credentials", {
      redirect: false,
      email: email.toLowerCase(),
      password: password,
      redirectTo: redirectTo || appConfig.auth.afterLogin
    });

    if (result?.error) {
      return {
        success: false,
        error: "Login failed. Please try again."
      };
    }

    return {
      success: true,
      message: "Logged in successfully",
      redirectUrl: result?.url || appConfig.auth.afterLogin
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Login error:", error);
    }
    return {
      success: false,
      error: "An error occurred during login"
    };
  }
}

/**
 * Request OTP for passwordless login
 */
export async function requestLoginOtpAction(email: string): Promise<LoginResult> {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, emailVerified: true }
    });

    if (!user) {
      return {
        success: false,
        error: "No account found with this email address"
      };
    }

    if (!user.emailVerified) {
      return {
        success: false,
        error: "Please verify your email first",
        requiresVerification: true
      };
    }

    // Send OTP
    const result = await sendOtpAction(email, "login");

    if (!result.success) {
      return {
        success: false,
        error: result.error || "Failed to send login code"
      };
    }

    return {
      success: true,
      message: "Login code sent to your email",
      requiresOtp: true
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Request login OTP error:", error);
    }
    return {
      success: false,
      error: "Failed to send login code"
    };
  }
}

/**
 * Login with OTP (passwordless)
 */
export async function loginWithOtpAction(
  email: string,
  otp: string,
  redirectTo?: string
): Promise<LoginResult> {
  try {
    // Verify OTP
    const otpResult = await verifyOtpAction(email, otp, "login");

    if (!otpResult.success) {
      return {
        success: false,
        error: otpResult.error || "Invalid OTP code"
      };
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, email: true }
    });

    if (!user) {
      return {
        success: false,
        error: "User not found"
      };
    }

    // Delete the verified OTP
    await deleteVerifiedOtpAction(email, "login");

    // Create a session (you may need to implement custom session creation)
    // For now, we'll return success and let the frontend handle the redirect
    return {
      success: true,
      message: "Logged in successfully",
      redirectUrl: redirectTo || appConfig.auth.afterLogin
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Login with OTP error:", error);
    }
    return {
      success: false,
      error: "Failed to login with OTP"
    };
  }
}
