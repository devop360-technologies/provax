import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// ============================================
// Configuration
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Token storage keys
const TOKEN_KEY = "auth_token";

// ============================================
// Token Management
// ============================================

export const tokenManager = {
  getToken: (): string | null => {
    if (globalThis.window === undefined) return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    if (globalThis.window === undefined) return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    if (globalThis.window === undefined) return;
    localStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!tokenManager.getToken();
  },
};

// ============================================
// Axios Instance
// ============================================

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================
// Request Interceptor
// ============================================

httpClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// Response Interceptor
// ============================================

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401) {
      tokenManager.removeToken();
      // Optionally redirect to login
      if (globalThis.window !== undefined) {
        globalThis.location.href = "/login";
      }
    }

    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message);
    }

    return Promise.reject(error);
  }
);

// ============================================
// HTTP Methods Wrapper
// ============================================

export const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await httpClient.get<T>(url, config);
    return response.data;
  },

  post: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await httpClient.post<T>(url, data, config);
    return response.data;
  },

  put: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await httpClient.put<T>(url, data, config);
    return response.data;
  },

  patch: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await httpClient.patch<T>(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await httpClient.delete<T>(url, config);
    return response.data;
  },
};

// ============================================
// Error Handler Helper
// ============================================

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    return axiosError.response?.data?.message || axiosError.message || "An error occurred";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};

export default httpClient;
