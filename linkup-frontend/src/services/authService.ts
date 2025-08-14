/**
 * Authentication service for handling API calls related to user authentication
 * Centralizes all auth-related HTTP requests following cursor.md protocols
 */
import axios from 'axios';
import type { User } from '../store/slices/authSlice';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Create axios instance with base configuration
const authApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add request interceptor to include JWT token
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('linkup_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('linkup_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  /**
   * Initiates LinkedIn OAuth flow
   */
  initiateLinkedInAuth: (): void => {
    window.location.href = `${API_BASE_URL}/auth/linkedin`;
  },

  /**
   * Fetches current authenticated user profile
   * @returns Promise resolving to user data
   */
  getCurrentUser: async (): Promise<{ data: User }> => {
    const response = await authApi.get<User>('/auth/me');
    return { data: response.data };
  },

  /**
   * Logs out the current user
   * @returns Promise resolving when logout is complete
   */
  logout: async (): Promise<void> => {
    await authApi.post('/auth/logout');
  },

  /**
   * Handles the OAuth callback and extracts token from URL
   * @param urlParams - URL search parameters from OAuth callback
   * @returns Token if found in URL parameters
   */
  handleOAuthCallback: (urlParams: URLSearchParams): string | null => {
    return urlParams.get('token');
  },
};