/**
 * Authentication slice for managing user authentication state
 * Handles LinkedIn OAuth flow and JWT token management
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

export interface User {
  id: string;
  email: string;
  name: string;
  linkedinId: string;
  profilePicture?: string;
  isVerified: boolean;
  hasCompletedOnboarding: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('linkup_token'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Async thunk to fetch current user profile
 */
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

/**
 * Async thunk to handle mock LinkedIn login
 */
export const mockLinkedInLogin = createAsyncThunk(
  'auth/mockLinkedInLogin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.initiateLinkedInAuth();
      localStorage.setItem('linkup_token', response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

/**
 * Async thunk to handle logout
 */
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      localStorage.removeItem('linkup_token');
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('linkup_token', action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
    resetAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('linkup_token');
    },
    completeOnboarding: (state) => {
      if (state.user) {
        state.user.hasCompletedOnboarding = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // mockLinkedInLogin
      .addCase(mockLinkedInLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(mockLinkedInLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(mockLinkedInLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // getCurrentUser
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('linkup_token');
      })
      // logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setToken, clearError, resetAuth, completeOnboarding } = authSlice.actions;
export default authSlice.reducer;