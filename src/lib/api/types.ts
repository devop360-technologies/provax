// ============================================
// Base API Response Types
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// ============================================
// User Types
// ============================================

export type UserRole = "ADMIN" | "USER" | "PROVIDER" | "CLIENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// ============================================
// Auth Types
// ============================================

// Login
export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginSuccessData {
  user: User;
  token: string;
  role: UserRole;
  permissions: string[];
  email_verified: true;
}

export interface LoginUnverifiedResponse {
  success: false;
  message: string;
  email_verified: false;
}

export type LoginResponse = 
  | ApiResponse<LoginSuccessData>
  | LoginUnverifiedResponse;

// Register
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface RegisterData {
  user: User;
  message: string;
}

export type RegisterResponse = ApiResponse<RegisterData>;

// Verify Email / OTP
export interface VerifyOtpInput {
  email: string;
  otp: string;
}

export interface ResendOtpInput {
  email: string;
}

export type VerifyOtpResponse = ApiResponse<{ verified: boolean }>;
export type ResendOtpResponse = ApiResponse<{ sent: boolean }>;

// Password Reset
export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
  confirmPassword: string;
}

export type ForgotPasswordResponse = ApiResponse<{ sent: boolean }>;
export type ResetPasswordResponse = ApiResponse<{ reset: boolean }>;

// Get Current User
export interface GetMeResponse {
  success: boolean;
  data: User;
}
