import { verifyEmailWithOtpAction } from "@/actions/email-verification-otp-actions";
import { createApiHandler } from "@/lib/api/api-handler";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST /api/auth/verify-email/verify
 * Verify email with OTP code
 */
export const POST = createApiHandler(
  async ({ email, otp }: { email: string; otp: string }) =>
    verifyEmailWithOtpAction(email, otp),
  {
    requiredFields: ["email", "otp"],
    missingFieldsError: "Email and OTP are required",
    failureError: "Verification failed",
    logPrefix: "Verify email OTP API error",
  }
);
