import { requestPasswordResetAction } from "@/actions/password-reset-actions";
import { createApiHandler } from "@/lib/api/api-handler";

/**
 * POST /api/auth/password/reset-request
 * Request password reset OTP
 */
export const POST = createApiHandler(
  async ({ email }: { email: string }) => requestPasswordResetAction(email),
  {
    requiredFields: ["email"],
    missingFieldsError: "Email is required",
    failureError: "Failed to send reset code",
    logPrefix: "Password reset request API error",
  }
);
