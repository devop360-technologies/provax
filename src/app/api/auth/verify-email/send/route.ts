import { sendEmailVerificationOtpAction } from "@/actions/email-verification-otp-actions";
import { createApiHandler } from "@/lib/api/api-handler";

/**
 * POST /api/auth/verify-email/send
 * Send email verification OTP
 */
export const POST = createApiHandler(
  async ({ email }: { email: string }) => sendEmailVerificationOtpAction(email),
  {
    requiredFields: ["email"],
    missingFieldsError: "Email is required",
    failureError: "Failed to send verification code",
    logPrefix: "Send verification OTP API error",
  }
);
