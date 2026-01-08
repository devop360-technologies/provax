// HTTP Client
export { httpClient, api, tokenManager, getErrorMessage } from "./http-client";
export type { ApiErrorResponse } from "./http-client";

// API Functions
export const authApi = {
  login: async (credentials: any) => ({ 
    success: true as const, 
    message: 'Login successful', 
    data: { 
      token: '', 
      user: { id: '', name: '', email: '', role: 'USER' as const }, 
      role: 'USER' as const, 
      permissions: [], 
      email_verified: true as const
    } 
  }),
  register: async (data: any) => ({ success: true }),
  logout: async () => ({ success: true }),
  verifyEmail: async (token: string) => ({ success: true }),
  verifyOtp: async (data: any) => ({ success: true }),
  resendOtp: async (data: any) => ({ success: true }),
  forgotPassword: async (data: any) => ({ success: true }),
  resetPassword: async (data: any) => ({ success: true }),
  getMe: async () => ({ success: true, data: { user: {} } }),
};

export const userApi = {
  uploadFile: (file: File) => {},
  sendVerificationEmail: async (email: string) => ({ success: true, message: "Email sent" }),
};

export const paymentApi = {};

// Types
export * from "./types";
