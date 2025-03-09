import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "../apis/userApi";
import { LoginRequest, User, LoginResponse } from "../apis/user";
import { RootState } from "./store";

// Define the authentication state interface
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token:
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null,
  isAuthenticated:
    typeof window !== "undefined" ? !!localStorage.getItem("authToken") : false,
  loading: false,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await userApi.login(credentials);
      if (!response.success) {
        return rejectWithValue(response.message || "Login failed");
      }
      return response;
    } catch (error: unknown) {
      const errorResponse = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };
      return rejectWithValue(
        errorResponse.response?.data?.message ||
          errorResponse.message ||
          "Login failed"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await userApi.logout();
      return true;
    } catch (error: unknown) {
      const errorResponse = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };
      return rejectWithValue(errorResponse.message || "Logout failed");
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload.data?.user || null;
          state.token = action.payload.data?.token || null;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearError } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
