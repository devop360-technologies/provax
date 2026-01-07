import { api } from "./http-client";
import {
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
  VerifyOtpInput,
  VerifyOtpResponse,
  ResendOtpInput,
  ResendOtpResponse,
  ForgotPasswordInput,
  ForgotPasswordResponse,
  ResetPasswordInput,
  ResetPasswordResponse,
  GetMeResponse,
} from "./types";

// ============================================
// Auth API Endpoints
// ============================================

const AUTH_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  VERIFY_OTP: "/api/auth/verify-otp",
  RESEND_OTP: "/api/auth/resend-otp",
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  RESET_PASSWORD: "/api/auth/reset-password",
  ME: "/api/auth/me",
  LOGOUT: "/api/auth/logout",
} as const;

// ============================================
// Auth API Functions
// ============================================

export const authApi = {
  /**
   * Login user with email and password
   */
  login: async (data: LoginInput): Promise<LoginResponse> => {
    return api.post<LoginResponse, LoginInput>(AUTH_ENDPOINTS.LOGIN, data);
  },

  /**
   * Register a new user
   */
  register: async (data: RegisterInput): Promise<RegisterResponse> => {
    return api.post<RegisterResponse, RegisterInput>(AUTH_ENDPOINTS.REGISTER, data);
  },

  /**
   * Verify email with OTP
   */
  verifyOtp: async (data: VerifyOtpInput): Promise<VerifyOtpResponse> => {
    return api.post<VerifyOtpResponse, VerifyOtpInput>(AUTH_ENDPOINTS.VERIFY_OTP, data);
  },

  /**
   * Resend OTP to email
   */
  resendOtp: async (data: ResendOtpInput): Promise<ResendOtpResponse> => {
    return api.post<ResendOtpResponse, ResendOtpInput>(AUTH_ENDPOINTS.RESEND_OTP, data);
  },

  /**
   * Request password reset email
   */
  forgotPassword: async (data: ForgotPasswordInput): Promise<ForgotPasswordResponse> => {
    return api.post<ForgotPasswordResponse, ForgotPasswordInput>(
      AUTH_ENDPOINTS.FORGOT_PASSWORD,
      data
    );
  },

  /**
   * Reset password with token
   */
  resetPassword: async (data: ResetPasswordInput): Promise<ResetPasswordResponse> => {
    return api.post<ResetPasswordResponse, ResetPasswordInput>(
      AUTH_ENDPOINTS.RESET_PASSWORD,
      data
    );
  },

  /**
   * Get current authenticated user
   */
  getMe: async (): Promise<GetMeResponse> => {
    return api.get<GetMeResponse>(AUTH_ENDPOINTS.ME);
  },

  /**
   * Logout user (optional - for server-side logout)
   */
  logout: async (): Promise<void> => {
    return api.post(AUTH_ENDPOINTS.LOGOUT);
  },
};

export default authApi;
