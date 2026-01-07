import { verifyPasswordResetOtpAction } from "@/actions/password-reset-actions";
import { createApiHandler } from "@/lib/api/api-handler";

/**
 * POST /api/auth/password/verify-otp
 * Verify password reset OTP
 */
export const POST = createApiHandler(
  async ({ email, otp }: { email: string; otp: string }) =>
    verifyPasswordResetOtpAction(email, otp),
  {
    requiredFields: ["email", "otp"],
    missingFieldsError: "Email and OTP are required",
    failureError: "Verification failed",
    logPrefix: "Verify password reset OTP API error",
  }
);
