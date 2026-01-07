/**
 * Authentication API Client
 * Helper functions to call authentication API routes
 */

interface ApiResponse<T = unknown> {
  success?: boolean;
  error?: string;
  message?: string;
  data?: T;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
  redirectTo?: string;
}

interface OtpData {
  email: string;
  otp: string;
}

interface ResetPasswordData {
  email: string;
  otp: string;
  newPassword: string;
}

/**
 * Register a new user
 */
export async function registerUser(data: RegisterData): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    return await response.json();
  } catch {
    return {
      success: false,
      error: 'Failed to connect to server'
    };
  }
}

/**
 * Send email verification OTP
 */
export async function sendVerificationOtp(email: string): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/auth/verify-email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    return await response.json();
  } catch {
    return {
      success: false,
      error: 'Failed to send verification code'
    };
  }
}

/**
 * Verify email with OTP
 */
export async function verifyEmailOtp(data: OtpData): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/auth/verify-email/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    return await response.json();
  } catch {
    return {
      success: false,
      error: 'Failed to verify email'
    };
  }
}

/**
 * Login with email and password
 */
export async function loginUser(data: LoginData): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    return await response.json();
  } catch {
    return {
      success: false,
      error: 'Failed to connect to server'
    };
  }
}

/**
 * Request login OTP (passwordless)
 */
export async function requestLoginOtp(email: string): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/auth/login/otp-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    return await response.json();
  } catch {
    return {
      success: false,
      error: 'Failed to send login code'
    };
  }
}

/**
 * Login with OTP
 */
export async function loginWithOtp(data: OtpData & { redirectTo?: string }): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/auth/login/otp-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    return await response.json();
  } catch {
    return {
      success: false,
      error: 'Failed to login'
    };
  }
}

/**
 * Request password reset OTP
 */
export async function requestPasswordReset(email: string): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/auth/password/reset-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    return await response.json();
  } catch {
    return {
      success: false,
      error: 'Failed to send reset code'
    };
  }
}

/**
 * Verify password reset OTP
 */
export async function verifyPasswordResetOtp(data: OtpData): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/auth/password/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    return await response.json();
  } catch {
    return {
      success: false,
      error: 'Failed to verify OTP'
    };
  }
}

/**
 * Reset password with OTP
 */
export async function resetPassword(data: ResetPasswordData): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/auth/password/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    return await response.json();
  } catch {
    return {
      success: false,
      error: 'Failed to reset password'
    };
  }
}
