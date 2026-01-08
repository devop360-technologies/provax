import { resetPasswordAction } from "@/actions/password-reset-actions";
import { createApiHandler } from "@/lib/api/api-handler";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST /api/auth/password/reset
 * Reset password with verified OTP
 */
export const POST = createApiHandler(
  async ({ email, otp, newPassword }: { email: string; otp: string; newPassword: string }) =>
    resetPasswordAction(email, otp, newPassword),
  {
    requiredFields: ["email", "otp", "newPassword"],
    missingFieldsError: "Email, OTP, and new password are required",
    failureError: "Password reset failed",
    logPrefix: "Reset password API error",
    validate: (body) => {
      if (typeof body.newPassword === "string" && body.newPassword.length < 8) {
        return { valid: false, error: "Password must be at least 8 characters long" };
      }
      return { valid: true };
    },
  }
);
