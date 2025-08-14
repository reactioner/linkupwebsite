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
   * Mock LinkedIn authentication - immediately logs in with test account
   */
  initiateLinkedInAuth: (): Promise<AuthResponse> => {
    // Create mock user data for testing
    const mockUser: User = {
      id: 'test-user-123',
      email: 'test@linkup.com',
      name: 'Alex Johnson',
      linkedinId: 'mock-linkedin-id',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isVerified: true,
      hasCompletedOnboarding: false,
    };

    const mockToken = 'mock-jwt-token-' + Date.now();

    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: mockUser,
          token: mockToken,
        });
      }, 500);
    });
  },

  /**
   * Mock getCurrentUser - returns test user data
   * @returns Promise resolving to user data
   */
  getCurrentUser: async (): Promise<{ data: User }> => {
    const mockUser: User = {
      id: 'test-user-123',
      email: 'test@linkup.com',
      name: 'Alex Johnson',
      linkedinId: 'mock-linkedin-id',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isVerified: true,
      hasCompletedOnboarding: false,
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockUser });
      }, 300);
    });
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