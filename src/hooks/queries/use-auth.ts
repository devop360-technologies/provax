"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi, tokenManager } from "@/lib/api";
import type {
  LoginInput,
  LoginResponse,
  LoginSuccessData,
  RegisterInput,
  VerifyOtpInput,
  ResendOtpInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "@/lib/api/types";

// ============================================
// Query Keys
// ============================================

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

// ============================================
// Get Current User Query
// ============================================

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async () => {
      const response = await authApi.getMe();
      return response.data;
    },
    enabled: tokenManager.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}

// ============================================
// Login Mutation
// ============================================

interface UseLoginOptions {
  onSuccess?: (data: LoginSuccessData) => void;
  onUnverified?: (email: string) => void;
  onError?: (error: Error) => void;
}

export function useLogin(options?: UseLoginOptions) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: (response: LoginResponse, variables) => {
      if (response.success && "data" in response && response.data) {
        const data = response.data;
        // Store token
        tokenManager.setToken(data.token);
        // Update user in cache
        queryClient.setQueryData(authKeys.user(), data.user);
        // Call success callback
        options?.onSuccess?.(data);
        // Redirect to dashboard
        router.push("/dashboard");
      } else if ("email_verified" in response && !response.email_verified) {
        // Email not verified
        options?.onUnverified?.(variables.email);
      }
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

// ============================================
// Register Mutation
// ============================================

interface UseRegisterOptions {
  onSuccess?: (email: string) => void;
  onError?: (error: Error) => void;
}

export function useRegister(options?: UseRegisterOptions) {
  return useMutation({
    mutationFn: (data: RegisterInput) => authApi.register(data) as any,
    onSuccess: (response, variables) => {
      if ((response as any).success) {
        options?.onSuccess?.(variables.email);
      }
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

// ============================================
// Verify OTP Mutation
// ============================================

interface UseVerifyOtpOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useVerifyOtp(options?: UseVerifyOtpOptions) {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: VerifyOtpInput) => authApi.verifyOtp(data) as any,
    onSuccess: (response) => {
      if ((response as any).success) {
        options?.onSuccess?.();
        router.push("/login");
      }
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

// ============================================
// Resend OTP Mutation
// ============================================

interface UseResendOtpOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useResendOtp(options?: UseResendOtpOptions) {
  return useMutation({
    mutationFn: (data: ResendOtpInput) => authApi.resendOtp(data) as any,
    onSuccess: (response) => {
      if ((response as any).success) {
        options?.onSuccess?.();
      }
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

// ============================================
// Forgot Password Mutation
// ============================================

interface UseForgotPasswordOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useForgotPassword(options?: UseForgotPasswordOptions) {
  return useMutation({
    mutationFn: (data: ForgotPasswordInput) => authApi.forgotPassword(data) as any,
    onSuccess: (response) => {
      if ((response as any).success) {
        options?.onSuccess?.();
      }
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

// ============================================
// Reset Password Mutation
// ============================================

interface UseResetPasswordOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useResetPassword(options?: UseResetPasswordOptions) {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordInput) => authApi.resetPassword(data) as any,
    onSuccess: (response) => {
      if ((response as any).success) {
        options?.onSuccess?.();
        router.push("/login");
      }
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

// ============================================
// Logout
// ============================================

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Optional: call server logout endpoint
      try {
        await authApi.logout();
      } catch {
        // Ignore errors - we'll clear local state anyway
      }
    },
    onSettled: () => {
      // Clear token
      tokenManager.removeToken();
      // Clear all queries
      queryClient.clear();
      // Redirect to login
      router.push("/login");
    },
  });
}

// ============================================
// Auth State Helper
// ============================================

export function useAuth() {
  const { data: user, isLoading, error } = useCurrentUser();
  const logout = useLogout();

  return {
    user,
    isLoading,
    isAuthenticated: !!user && tokenManager.isAuthenticated(),
    error,
    logout: logout.mutate,
  };
}
